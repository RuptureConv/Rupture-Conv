"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { trackTemplateActionClick } from "@/lib/analytics";

type ProfessionalLetterBlockProps = {
  lines: string[];
};

const fileName = "modele-lettre-rupture-conventionnelle.pdf";

function normalizePdfText(value: string) {
  return value
    .replaceAll("’", "'")
    .replaceAll("œ", "oe")
    .replaceAll("Œ", "OE")
    .replaceAll("€", "EUR")
    .replaceAll("…", "...")
    .replaceAll("–", "-")
    .replaceAll("—", "-");
}

function toPdfLiteral(value: string) {
  const winAnsi: Record<string, number> = {
    À: 0xc0,
    Â: 0xc2,
    Ç: 0xc7,
    È: 0xc8,
    É: 0xc9,
    Ê: 0xca,
    Ë: 0xcb,
    Î: 0xce,
    Ï: 0xcf,
    Ô: 0xd4,
    Ù: 0xd9,
    Û: 0xdb,
    Ü: 0xdc,
    à: 0xe0,
    â: 0xe2,
    ç: 0xe7,
    è: 0xe8,
    é: 0xe9,
    ê: 0xea,
    ë: 0xeb,
    î: 0xee,
    ï: 0xef,
    ô: 0xf4,
    ù: 0xf9,
    û: 0xfb,
    ü: 0xfc
  };

  let output = "";
  for (const character of normalizePdfText(value)) {
    const code = winAnsi[character] ?? character.charCodeAt(0);
    if (character === "(" || character === ")" || character === "\\") {
      output += `\\${character}`;
    } else if (code >= 32 && code <= 255) {
      output += String.fromCharCode(code);
    } else {
      output += "?";
    }
  }

  return `(${output})`;
}

function wrapText(text: string, maxLength: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function textCommand(text: string, x: number, y: number, size = 11, font = "F1") {
  return `BT /${font} ${size} Tf ${x} ${y} Td ${toPdfLiteral(text)} Tj ET`;
}

function createPdf(letterText: string) {
  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 58;
  const commands: string[] = [];
  let y = pageHeight - margin;

  const addLine = (text: string, options?: { x?: number; size?: number; font?: string }) => {
    commands.push(textCommand(text, options?.x ?? margin, y, options?.size, options?.font));
    y -= (options?.size ?? 11) + 5;
  };

  const blocks = letterText.split("\n\n");
  blocks.forEach((block, blockIndex) => {
    const isSender = blockIndex === 0;
    const isRecipient = blockIndex === 1;
    const isSubject = block.startsWith("Objet");
    const x = isRecipient ? 340 : margin;
    const max = isRecipient ? 35 : 78;

    if (blockIndex === 2) {
      y -= 12;
    }

    block.split("\n").forEach((rawLine) => {
      const wrapped = wrapText(rawLine, max);
      wrapped.forEach((line) => {
        addLine(line, {
          x,
          size: isSubject ? 11.5 : 11,
          font: isSubject || isSender || isRecipient ? "F2" : "F1"
        });
      });
    });

    y -= isSubject ? 16 : 12;
  });

  const stream = [
    "q",
    "1 1 1 rg 0 0 595 842 re f",
    "0.88 0.91 0.92 RG 0.7 w 42 42 511 758 re S",
    "Q",
    ...commands
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const bytes = new Uint8Array(pdf.length);
  for (let index = 0; index < pdf.length; index += 1) {
    bytes[index] = pdf.charCodeAt(index) & 0xff;
  }

  return new Blob([bytes], { type: "application/pdf" });
}

export function ProfessionalLetterBlock({ lines }: ProfessionalLetterBlockProps) {
  const [copied, setCopied] = useState(false);
  const letter = useMemo(() => {
    const [sender, recipient, subject, greeting, ...rest] = lines;
    const body = rest.slice(0, -1);
    const signature = rest.at(-1);

    return {
      sender,
      recipient,
      placeAndDate: "[Ville], le [date]",
      subject,
      greeting,
      body,
      signature: signature ?? "[Signature]",
      plainText: [
        sender,
        recipient,
        "[Ville], le [date]",
        subject,
        greeting,
        ...body,
        signature ?? "[Signature]"
      ].join("\n\n")
    };
  }, [lines]);

  const copyLetter = async () => {
    await navigator.clipboard.writeText(letter.plainText);
    trackTemplateActionClick({
      template_type: "termination_request_letter",
      action: "copy",
      location: "letter_toolbar"
    });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const downloadPdf = () => {
    const pdf = createPdf(letter.plainText);
    const url = URL.createObjectURL(pdf);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    trackTemplateActionClick({
      template_type: "termination_request_letter",
      action: "download_pdf",
      location: "letter_toolbar"
    });
  };

  const printLetter = () => {
    trackTemplateActionClick({
      template_type: "termination_request_letter",
      action: "print",
      location: "letter_toolbar"
    });
    document.body.classList.add("print-letter-mode");
    window.setTimeout(() => window.print(), 50);
    window.setTimeout(() => document.body.classList.remove("print-letter-mode"), 800);
  };

  return (
    <div className="space-y-5">
      <div className="letter-toolbar flex flex-col gap-3 rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] p-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-[#102A4C]">
          Document prêt à adapter, copier, imprimer ou exporter.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={copyLetter}
            aria-label="Copier le modèle de lettre"
            className="min-h-10 rounded-full border border-[#D7E6E8] bg-white px-4 text-sm font-bold text-[#061B3A] transition hover:border-[#22AFA3] hover:text-[#168F86]"
          >
            Copier le modèle
          </button>
          <button
            type="button"
            onClick={downloadPdf}
            aria-label="Télécharger le modèle en PDF"
            className="min-h-10 rounded-full border border-[#D7E6E8] bg-white px-4 text-sm font-bold text-[#061B3A] transition hover:border-[#22AFA3] hover:text-[#168F86]"
          >
            Télécharger en PDF
          </button>
          <button
            type="button"
            onClick={printLetter}
            aria-label="Imprimer le modèle de lettre"
            className="min-h-10 rounded-full bg-[#22AFA3] px-4 text-sm font-bold text-white transition hover:bg-[#168F86]"
          >
            Imprimer
          </button>
        </div>
      </div>

      <div
        aria-live="polite"
        className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#061B3A] px-4 py-2 text-sm font-bold text-white shadow-lg transition ${
          copied ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        Modèle copié
      </div>

      <div className="letter-print-root rounded-[1.25rem] border border-[#DEE9EB] bg-[#F8F7F2] p-3 shadow-[0_18px_55px_rgba(6,27,58,0.10)] sm:p-5">
        <div className="mx-auto max-w-[760px] bg-white px-5 py-8 text-[15px] leading-8 text-[#102A4C] shadow-sm sm:px-10 sm:py-12 md:px-14">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="whitespace-pre-line font-semibold text-[#061B3A]">
              {letter.sender}
            </div>
            <div className="whitespace-pre-line font-semibold text-[#061B3A] sm:text-right">
              {letter.recipient}
            </div>
          </div>

          <p className="mt-10 text-right font-medium text-[#102A4C]">
            {letter.placeAndDate}
          </p>

          <div className="mt-9 rounded-xl border border-[#E5EEF0] bg-[#F7FBFA] px-4 py-3 font-extrabold text-[#061B3A]">
            {letter.subject}
          </div>

          <p className="mt-9 font-semibold text-[#061B3A]">{letter.greeting}</p>

          <div className="mt-6 space-y-5">
            {letter.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 flex justify-end">
            <div className="min-w-44 border-t border-[#C9D8DB] pt-5 text-right font-semibold text-[#061B3A]">
              {letter.signature}
            </div>
          </div>
        </div>
      </div>

      <aside className="letter-conversion-cta rounded-2xl border border-[#D7EDEA] bg-[#EAF8F6] p-5">
        <h3 className="text-xl font-extrabold text-[#061B3A]">
          Avant d’envoyer votre demande, estimez votre indemnité indicative
        </h3>
        <p className="mt-3 text-sm leading-7 text-[#5B6B7C]">
          Le simulateur RuptureConv vous permet d’obtenir une estimation rapide
          pour préparer votre négociation.
        </p>
        <Link
          href="/#simulateur"
          className="mt-4 inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-bold text-white transition hover:bg-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
        >
          Calculer mon indemnité
        </Link>
      </aside>
    </div>
  );
}
