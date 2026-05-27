// ============================================================
//  MARVEL-DATA.JS — Phases & étapes Marvel Champions JCE
// ============================================================

const PHASES = [
  {
    id: "player",
    number: 1,
    name: "Phase des Joueurs",
    icon: "🦸",
    color: "#2563eb",
    summary: "Chaque joueur effectue son tour complet dans l'ordre du 1er Joueur.",
    steps: [
      {
        id: "pl-1",
        type: "substep",
        label: "— TOUR DE CHAQUE JOUEUR (dans l'ordre) —",
        detail: ""
      },
      {
        id: "pl-2",
        type: "action",
        label: "⚡ Actions disponibles",
        detail: "Durant son tour, un joueur peut effectuer les actions suivantes dans n'importe quel ordre, autant de fois qu'il le souhaite (sauf Changer de forme, limité à 1 fois) :",
        tags: ["Libre", "Dans n'importe quel ordre"]
      },
      {
        id: "pl-3",
        type: "step",
        label: "1. Changer de forme",
        detail: "Le joueur passe de sa forme Héros à sa forme Alter-Ego, ou inversement.\n\n⚠️ Limité à 1 fois par tour.\n\n• Forme Héros → peut Attaquer et Contrecarrer\n• Forme Alter-Ego → peut Récupérer (soins)",
        tags: ["1 fois / tour", "Héros ↔ Alter-Ego"]
      },
      {
        id: "pl-4",
        type: "step",
        label: "2. Jouer une carte",
        detail: "Le joueur peut jouer autant de cartes qu'il le souhaite depuis sa main, en payant leur coût en ressources :\n\n• **Allié** : entre en jeu sous le contrôle du joueur\n• **Amélioration** : s'attache à un personnage ou au joueur\n• **Soutien** : entre en jeu, effet permanent ou répété\n• **Événement** : effet unique, puis défaussé",
        tags: ["Ressources requises", "Allié · Amélioration · Soutien · Événement"]
      },
      {
        id: "pl-5",
        type: "step",
        label: "3. Utiliser un pouvoir de base (Identité)",
        detail: "Selon sa forme, le joueur peut utiliser le pouvoir de base de sa carte Identité :\n\n• Forme **Héros** :\n  — ATQ de base : incline le héros, inflige des dégâts à un ennemi\n  — CTR de base : incline le héros, retire de la menace d'une manigance\n• Forme **Alter-Ego** :\n  — REC de base : incline le héros, récupère des PV (soins)",
        tags: ["Incline le héros", "ATQ / CTR / REC"]
      },
      {
        id: "pl-6",
        type: "step",
        label: "4. Activer un allié",
        detail: "Le joueur peut activer un allié en jeu pour qu'il attaque un ennemi ou contrecarre une manigance. L'allié s'incline.\n\n⚠️ Un allié ne peut effectuer qu'une seule action par tour (attaquer OU contrecarrer).\n\nSi l'allié subit des dégâts en retour (contre-attaque du méchant) et que ses PV tombent à 0, il est défaussé.",
        tags: ["Incline l'allié", "ATQ ou CTR uniquement"]
      },
      {
        id: "pl-7",
        type: "step",
        label: "5. Déclencher une capacité Action",
        detail: "Le joueur peut déclencher toute capacité marquée « Action » sur :\n• Une carte qu'il contrôle (héros, allié, amélioration, soutien)\n• Une carte de rencontre en jeu (sbire, manigance secondaire...)\n• Un événement joué depuis sa main",
        tags: ["Capacité «Action»", "Toute carte en jeu"]
      },
      {
        id: "pl-8",
        type: "step",
        label: "6. Demander l'aide d'un autre joueur",
        detail: "Le joueur actif peut demander à un autre joueur de déclencher une capacité Action sur une de ses cartes. L'autre joueur doit accepter.\n\nUtile pour combiner des effets entre joueurs (assistance, soins, boost d'attaque...).",
        tags: ["Coopération", "Accord requis"]
      },
      {
        id: "pl-9",
        type: "substep",
        label: "— FIN DU TOUR DU JOUEUR —",
        detail: ""
      },
      {
        id: "pl-10",
        type: "step",
        label: "7. Fin de la Phase des Joueurs (tous ensemble)",
        detail: "Une fois que tous les joueurs ont terminé leur tour :\n\n1. Chaque joueur défausse autant de cartes qu'il le souhaite depuis sa main\n2. Chaque joueur pioche jusqu'à sa limite de main (simultanément)\n   — Si le deck est vide, mélanger la défausse pour former un nouveau deck\n3. Chaque joueur redresse toutes ses cartes inclinées (héros, alliés, améliorations...)",
        tags: ["Obligatoire", "Défausse → Pioche → Redresse"]
      }
    ]
  },

  {
    id: "villain",
    number: 2,
    name: "Phase du Méchant",
    icon: "💀",
    color: "#dc2626",
    summary: "Le méchant place de la menace, attaque les héros et révèle des cartes Rencontre.",
    steps: [
      {
        id: "vil-1",
        type: "step",
        label: "1. Placement de menace",
        detail: "On place des jetons Menace sur la Manigance principale :\n\n• Valeur de base : 1 jeton par joueur\n• Modificateur : +1 par icône Accélération présente sur les manigances secondaires en jeu\n\n⚠️ Si le total de menace sur la Manigance principale atteint sa limite → elle avance (étape suivante ou partie perdue selon le scénario) !",
        tags: ["Obligatoire", "1 / joueur + Accélération", "⚠️ Limite = défaite"]
      },
      {
        id: "vil-2",
        type: "action",
        label: "⚡ Fenêtre d'action",
        detail: "Les joueurs peuvent déclencher des capacités « Action » avant que le méchant s'active.",
        tags: ["Avant l'activation"]
      },
      {
        id: "vil-3",
        type: "substep",
        label: "— ACTIVATION DU MÉCHANT (1 fois par joueur) —",
        detail: ""
      },
      {
        id: "vil-4",
        type: "step",
        label: "2a. Activation selon la forme du joueur",
        detail: "Le méchant s'active une fois pour chaque joueur, dans l'ordre du tour :\n\n• Joueur en forme **Alter-Ego** → Le méchant (et ses sbires engagés) **Manigancent** : placent des jetons Menace sur une manigance\n• Joueur en forme **Héros** → Le méchant (et ses sbires engagés) **Attaquent** le joueur : infligent des dégâts\n\n💡 Être en Alter-Ego évite les dégâts directs mais accumule de la menace.",
        tags: ["1 activation / joueur", "Alter-Ego → Menace · Héros → Dégâts"]
      },
      {
        id: "vil-5",
        type: "step",
        label: "2b. Défense contre une attaque",
        detail: "Si le méchant attaque (joueur en forme Héros), le joueur peut se défendre :\n\n• Incline son héros ou un allié pour défendre : les dégâts sont réduits par la valeur de DEF du défenseur\n• Ne pas se défendre : les dégâts passent directement sur les PV du héros\n\n⚠️ Si les PV du héros tombent à 0, ce joueur est éliminé !",
        tags: ["Optionnel", "Incline le défenseur", "⚠️ 0 PV = élimination"]
      },
      {
        id: "vil-6",
        type: "step",
        label: "2c. Activation des Sbires engagés",
        detail: "Chaque sbire engagé avec un joueur s'active également, dans l'ordre du tour :\n\n• Même logique que le méchant : Attaque si Héros, Manigance si Alter-Ego\n• Les sbires non engagés (dans la zone commune) ne s'activent pas ici",
        tags: ["Sbires engagés uniquement", "Même règle que le méchant"]
      },
      {
        id: "vil-7",
        type: "action",
        label: "⚡ Fenêtre d'action",
        detail: "Les joueurs peuvent déclencher des capacités « Action » après les activations, avant la distribution des cartes Rencontre.",
        tags: ["Après activations"]
      },
      {
        id: "vil-8",
        type: "step",
        label: "3. Distribution des cartes Rencontre",
        detail: "On distribue 1 carte Rencontre face cachée à chaque joueur depuis le deck de Rencontre.\n\nSi le deck de Rencontre est épuisé, mélanger la défausse Rencontre pour former un nouveau deck.",
        tags: ["Obligatoire", "1 carte / joueur", "Face cachée"]
      },
      {
        id: "vil-9",
        type: "step",
        label: "4. Révélation des cartes Rencontre",
        detail: "Dans l'ordre du tour, chaque joueur retourne et résout sa carte Rencontre :\n\n• **Traîtrise** : effet immédiat, puis défaussée\n• **Sbire** : entre en jeu engagé avec le joueur (ou dans la zone commune si Garde)\n• **Manigance secondaire** : entre en jeu avec ses jetons Menace initiaux\n• **Attachement** : s'attache au méchant ou à un sbire désigné\n\n⚠️ Certaines cartes indiquent « Surge » : révéler immédiatement une carte supplémentaire !",
        tags: ["Dans l'ordre du tour", "⚠️ Surge = +1 carte"]
      },
      {
        id: "vil-10",
        type: "action",
        label: "⚡ Fenêtre d'action",
        detail: "Les joueurs peuvent déclencher des capacités « Action » après la révélation des cartes Rencontre.",
        tags: ["Après révélation"]
      },
      {
        id: "vil-11",
        type: "step",
        label: "5. Fin du round — Passage du 1er Joueur",
        detail: "Le pion 1er Joueur passe au joueur suivant dans le sens des aiguilles d'une montre.\n\nVérifier les conditions de victoire et de défaite :\n✅ Victoire : le Méchant est vaincu (PV = 0 sur sa dernière phase)\n❌ Défaite : la Manigance principale a atteint sa limite de menace, ou tous les joueurs sont éliminés",
        tags: ["Obligatoire", "✅ Victoire / ❌ Défaite"]
      }
    ]
  }
];
