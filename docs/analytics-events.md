# Événements Analytics

Le suivi sert à mesurer l'utilisation des outils et les suites choisies après un résultat. Les helpers sont centralisés dans `lib/analytics.ts`. Ils restent silencieux côté serveur, avant consentement, lorsque GTM est absent ou lorsqu'un appel Analytics échoue.

Un événement est envoyé avec `gtag` lorsqu'il est disponible. À défaut, il est ajouté à `dataLayer` si GTM est configuré. Ce repli évite de doubler un même événement.

## Événements envoyés

| Événement | Rôle | Paramètres | Pages ou composants |
| --- | --- | --- | --- |
| `calculator_result_viewed` | Confirmer qu'un résultat a été consulté après une interaction réelle | `calculator_type`, `result_type`, `location` | Simulateurs rupture, chômage ARE et salaire brut-net |
| `post_simulation_click` | Mesurer la prochaine étape choisie après un résultat | `source_tool`, `target_page`, `link_label`, `location` | `PostSimulationLinks` des trois simulateurs |
| `tool_crosslink_click` | Mesurer un accès à un outil hors bloc post-simulation | `source_page`, `target_tool`, `link_label`, `location` | CTA vers le simulateur de rupture sur les pages éditoriales |
| `simulator_next_step_click` | Mesurer la progression générique dans le simulateur multi-étapes | `calculator_type`, `step`, `location` | Simulateur chômage ARE |
| `template_action_click` | Mesurer une action réelle sur le modèle de lettre | `template_type`, `action`, `location` | Copie, téléchargement PDF et impression du modèle de demande |
| `result_copied` | Mesurer la copie du résumé d'une estimation | `calculator_type`, `location` | Résultat du simulateur de rupture |

Valeurs principales de `calculator_type` : `termination`, `unemployment`, `salary_net`.

Les résultats automatiques rupture et brut-net ne sont pas comptés au simple chargement de la page. L'événement part une fois, après une interaction utilisateur et un court délai de stabilisation. Pour le chômage ARE, il part une fois lorsque l'utilisateur atteint l'étape des résultats.

## Événements à marquer comme événements clés dans GA4

À configurer manuellement dans l'interface d'administration GA4 :

- `calculator_result_viewed`, pour mesurer l'utilisation réelle des simulateurs ;
- `post_simulation_click`, pour mesurer la poursuite du parcours après un calcul ;
- `template_action_click`, si les actions sur le modèle de lettre font partie des objectifs suivis.

Le marquage en événement clé ne se fait pas dans le code du site.

## Confidentialité

Les paramètres Analytics excluent explicitement :

- les salaires saisis ou calculés ;
- les indemnités, allocations ARE et autres montants ;
- l'âge, l'ancienneté et les durées individuelles de chômage ;
- les dates saisies et la situation personnelle détaillée ;
- les noms, emails, téléphones et toute autre donnée directement identifiable ;
- l'URL complète et sa chaîne de requête.

Seuls des noms d'outil, pages source ou cible, libellés visibles, emplacements et étapes génériques sont envoyés.
