# 💍 SDA JCE — Companion de Jeu

Application web vanilla (HTML/CSS/JS) d'aide au jeu pour **Le Seigneur des Anneaux : Jeu de Cartes Évolutif** (Fantasy Flight Games).

## Fonctionnalités

- 📋 **7 phases de jeu** en accordéon déroulant
- 🟢 **Fenêtres d'action** clairement identifiées avec leurs moments clés
- 🗡️ **Détail complet** de chaque étape (cliquer pour déplier)
- 💰 **Traqueur de menace** pour 1 à 4 joueurs (persisté dans localStorage)
- 🔄 **Compteur de tours**
- ⚠️ **Alerte élimination** à 50 de menace
- 📱 Responsive mobile

## Structure des fichiers

```
index.html   — Structure HTML
style.css    — Thème LOTR (parchemin/médiéval sombre)
data.js      — Données des phases et étapes
app.js       — Logique (rendu, interactions, état)
netlify.toml — Config déploiement Netlify
```

## Déploiement sur Netlify

1. Push sur GitHub
2. Connecter le repo sur [netlify.com](https://netlify.com)
3. Build command : _(vide)_
4. Publish directory : `.`

Ou déploiement direct : `netlify deploy --prod --dir .`

## Sources

- [RingsDB — Guide des fenêtres d'action](https://www.ringsdb.com/decklist/view/10407/aguidetoactionwindows-1.0)
- [SDA JCE V2 — Règles](https://sdajcev2.wordpress.com/regles-2/)
- [Forum SDA JCE — Fenêtres d'action](https://sdajce.forumactif.org/t912-question-fenetre-d-action-des-joueurs-resolu)
