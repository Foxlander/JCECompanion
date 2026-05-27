// ============================================================
//  DONNÉES — Phases & fenêtres d'action du SDA JCE
// ============================================================

const PHASES = [
  {
    id: "resource",
    number: 1,
    name: "Phase de Ressource",
    icon: "💰",
    color: "#b45309",
    colorLight: "#fef3c7",
    colorDark: "#78350f",
    summary: "Les héros génèrent des ressources et les joueurs piochent des cartes.",
    steps: [
      {
        id: "res-1",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Chaque joueur peut déclencher des Actions (cartes jouées depuis la main, effets de capacités). C'est la première fenêtre du tour.",
        tags: ["Action libre"]
      },
      {
        id: "res-2",
        type: "step",
        label: "1. Gain de ressources",
        detail: "Chaque joueur place 1 marqueur de ressource sur chacun de ses héros en jeu. Les cartes avec des effets « Au début de la phase de ressource » se déclenchent ici.",
        tags: ["Obligatoire"]
      },
      {
        id: "res-3",
        type: "step",
        label: "2. Pioche de cartes",
        detail: "Chaque joueur pioche 1 carte depuis le dessus de son deck. Si un joueur n'a plus de cartes à piocher, il est éliminé.",
        tags: ["Obligatoire"]
      },
      {
        id: "res-4",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Actions et effets déclenchés uniquement après la pioche. Typiquement : effets « Ressource » ou « Action de ressource » qui nécessitent d'avoir pioché.",
        tags: ["Action libre", "Actions Ressource"]
      }
    ]
  },

  {
    id: "planning",
    number: 2,
    name: "Phase d'Organisation",
    icon: "📋",
    color: "#2563eb",
    colorLight: "#eff6ff",
    colorDark: "#1d4ed8",
    summary: "Les joueurs jouent des Alliés et des Attachements depuis leur main.",
    steps: [
      {
        id: "plan-1",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Fenêtre d'action avant que le premier joueur commence à jouer ses cartes.",
        tags: ["Action libre"]
      },
      {
        id: "plan-2",
        type: "step",
        label: "1. Le premier joueur joue ses cartes",
        detail: "Le premier joueur peut jouer autant d'Alliés et d'Attachements qu'il le souhaite depuis sa main (en payant leur coût en ressources). Les Événements ne peuvent PAS être joués ici (sauf si une capacité le permet).",
        tags: ["Obligatoire", "Premier Joueur"]
      },
      {
        id: "plan-3",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Après que le premier joueur a fini de jouer ses cartes, tous les joueurs peuvent prendre des actions. Moment classique pour jouer des Événements ou déclencher des effets.",
        tags: ["Action libre", "Tous les joueurs"]
      },
      {
        id: "plan-4",
        type: "step",
        label: "2. Les joueurs suivants jouent leurs cartes",
        detail: "Dans le sens des aiguilles d'une montre, chaque autre joueur joue ses Alliés et Attachements à son tour. Après chaque joueur, une fenêtre d'action s'ouvre pour tous.",
        tags: ["Obligatoire", "Sens horaire"]
      },
      {
        id: "plan-5",
        type: "action",
        label: "🟢 Fenêtre d'Action (finale)",
        detail: "Dernière fenêtre d'action avant la phase de quête. Moment pour préparer ses personnages, jouer des alliés de dernière minute ou des effets d'urgence.",
        tags: ["Action libre"]
      }
    ]
  },

  {
    id: "quest",
    number: 3,
    name: "Phase de Quête",
    icon: "⚔️",
    color: "#7c3aed",
    colorLight: "#f5f3ff",
    colorDark: "#5b21b6",
    summary: "Les joueurs engagent des personnages en quête et affrontent les cartes de rencontre.",
    steps: [
      {
        id: "quest-1",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Fenêtre d'action avant l'engagement en quête. Moment idéal pour jouer Sneak Attack + Gandalf, ou tout effet qui ajoute des personnages/augmente la Volonté.",
        tags: ["Action libre", "⭐ Sneak Attack"]
      },
      {
        id: "quest-2",
        type: "step",
        label: "1. Engagement en quête",
        detail: "En commençant par le premier joueur (sens horaire), chaque joueur incline face cachée les personnages qu'il souhaite envoyer en quête. Un personnage incliné ne peut pas être envoyé en quête. On révèle tous les personnages en même temps.",
        tags: ["Obligatoire", "Simultané"]
      },
      {
        id: "quest-3",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Après l'engagement mais AVANT la révélation des cartes de rencontre. Dernier moment pour redresser des personnages, générer des ressources ou modifier la Volonté totale.",
        tags: ["Action libre", "⭐ Redressement", "Crucial"]
      },
      {
        id: "quest-4",
        type: "step",
        label: "2. Mise en jeu des cartes de rencontre (Staging)",
        detail: "On révèle 1 carte de rencontre par joueur depuis le deck de rencontre. Les Traîtrises : effet immédiat puis défaussées. Les Ennemis et Lieux : placés dans la zone de mise en scène (Staging Area). Chaque ennemi révélé peut déclencher un effet « Quand révélé ».",
        tags: ["Obligatoire", "1 carte / joueur"]
      },
      {
        id: "quest-5",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Après la révélation des cartes, AVANT la résolution. Permet d'ajuster la Volonté totale et de réagir aux menaces révélées (réduction de menace, boost de Volonté, etc.).",
        tags: ["Action libre", "⭐ Crucial après révélation"]
      },
      {
        id: "quest-6",
        type: "step",
        label: "3. Résolution de la quête",
        detail: "Comparer : Volonté totale des personnages engagés VS Menace totale de la zone de mise en scène.\n• Volonté > Menace → Excédent = Progrès placés sur la quête active (ou le lieu actif d'abord).\n• Menace > Volonté → Excédent = Augmentation de menace de chaque joueur (de cette valeur).\n• Égalité → Rien ne se passe.",
        tags: ["Obligatoire", "Calcul"]
      },
      {
        id: "quest-7",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Après la résolution de la quête. Effets déclenchés « Après la résolution de la quête ». Dernier moment avant le voyage.",
        tags: ["Action libre"]
      }
    ]
  },

  {
    id: "travel",
    number: 4,
    name: "Phase de Voyage",
    icon: "🗺️",
    color: "#059669",
    colorLight: "#ecfdf5",
    colorDark: "#047857",
    summary: "Les joueurs peuvent voyager vers un Lieu de la zone de mise en scène.",
    steps: [
      {
        id: "trav-1",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Fenêtre d'action avant le choix du voyage.",
        tags: ["Action libre"]
      },
      {
        id: "trav-2",
        type: "step",
        label: "1. Choix du lieu (optionnel)",
        detail: "Si aucun Lieu n'est actuellement actif, le premier joueur (avec l'accord du groupe) peut choisir de voyager vers un Lieu de la zone de mise en scène. Ce lieu devient le « Lieu Actif ».\n\n• Le lieu peut imposer un coût de voyage (marqueurs de ressource, points de menace, etc.).\n• S'il n'y a aucun lieu disponible ou si on ne veut pas voyager → on passe.",
        tags: ["Optionnel", "Décision du groupe"]
      },
      {
        id: "trav-3",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Après le voyage (ou si aucun voyage n'a eu lieu). Effets de réduction du coût de voyage, capacités déclenchées lors du voyage.",
        tags: ["Action libre", "Coût de voyage"]
      }
    ]
  },

  {
    id: "encounter",
    number: 5,
    name: "Phase de Rencontre",
    icon: "👹",
    color: "#dc2626",
    colorLight: "#fef2f2",
    colorDark: "#b91c1c",
    summary: "Les joueurs peuvent s'engager volontairement avec des ennemis, puis les vérifications d'engagement se déroulent.",
    steps: [
      {
        id: "enc-1",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Fenêtre d'action avant les engagements optionnels.",
        tags: ["Action libre"]
      },
      {
        id: "enc-2",
        type: "step",
        label: "1. Engagements optionnels",
        detail: "En commençant par le premier joueur (sens horaire), chaque joueur peut choisir de s'engager volontairement avec autant d'ennemis qu'il le souhaite dans la zone de mise en scène. Les ennemis engagés sont placés devant le joueur concerné.",
        tags: ["Optionnel", "Décision individuelle"]
      },
      {
        id: "enc-3",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Entre les engagements optionnels et les vérifications forcées. Utile pour jouer des effets qui préviennent l'engagement ou modifient les niveaux d'engagement.",
        tags: ["Action libre", "Prévention"]
      },
      {
        id: "enc-4",
        type: "step",
        label: "2. Vérifications d'engagement (forcées)",
        detail: "Pour chaque ennemi encore dans la zone de mise en scène, comparer son Niveau d'Engagement avec la Menace du joueur actif.\n\n• Si Menace du joueur ≥ Niveau d'engagement de l'ennemi → l'ennemi s'engage avec ce joueur.\n\nLe premier joueur résout d'abord ses vérifications, puis chaque joueur dans le sens horaire.",
        tags: ["Obligatoire", "Menace vs Engagement"]
      },
      {
        id: "enc-5",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Après les vérifications d'engagement, AVANT le combat. Dernière chance pour soigner, redresser ou préparer avant les combats. Moment important pour les effets de Tir à l'arc (Archery).",
        tags: ["Action libre", "⭐ Soins pré-combat", "Crucial"]
      }
    ]
  },

  {
    id: "combat",
    number: 6,
    name: "Phase de Combat",
    icon: "🗡️",
    color: "#9f1239",
    colorLight: "#fff1f2",
    colorDark: "#881337",
    summary: "Les ennemis attaquent en premier, puis les joueurs contre-attaquent.",
    steps: [
      {
        id: "cmb-1",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Fenêtre d'action avant la distribution des cartes Ombre.",
        tags: ["Action libre"]
      },
      {
        id: "cmb-2",
        type: "step",
        label: "1. Distribution des cartes Ombre",
        detail: "On distribue 1 carte Ombre (face cachée) à chaque ennemi engagé avec au moins un joueur. Les cartes Ombre modifient potentiellement l'attaque ennemie.",
        tags: ["Obligatoire", "1 carte / ennemi"]
      },
      {
        id: "cmb-3",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Après la distribution des Ombres, AVANT les attaques ennemies. Moment pour jouer Feinte, Forêt d'Épieux, ou tout effet qui annule/modifie les attaques ennemies.",
        tags: ["Action libre", "⭐ Feinte / Forêt d'Épieux", "Crucial"]
      },
      {
        id: "cmb-4",
        type: "substep",
        label: "— ATTAQUES ENNEMIES (pour chaque ennemi) —",
        detail: "En commençant par le premier joueur, on résout toutes les attaques des ennemis engagés. Pour chaque ennemi (dans l'ordre choisi par le joueur) :",
        tags: ["Sous-séquence"]
      },
      {
        id: "cmb-5",
        type: "step",
        label: "2a. Déclarer le défenseur",
        detail: "Le joueur attaqué incline 1 personnage (Héros ou Allié) pour défendre. Il peut aussi choisir de ne pas déclarer de défenseur → les dégâts non bloqués sont répartis sur ses héros (1 dégât / héros).",
        tags: ["Obligatoire", "1 défenseur / attaque"]
      },
      {
        id: "cmb-6",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Après la déclaration du défenseur. Permet de redresser le défenseur (ex : Lithe du Silbel), d'ajouter des défenseurs supplémentaires, ou de modifier la Défense.",
        tags: ["Action libre", "⭐ Redressement défenseur"]
      },
      {
        id: "cmb-7",
        type: "step",
        label: "2b. Révéler l'effet Ombre",
        detail: "On retourne la carte Ombre de cet ennemi. L'effet Ombre s'applique si la condition est remplie. Certains effets Ombre : +Attaque, engagement supplémentaire, défaussement de carte...",
        tags: ["Obligatoire", "Effet aléatoire"]
      },
      {
        id: "cmb-8",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Après la révélation de l'effet Ombre. Permet de réagir à l'effet (soins, annulation, redressement d'urgence).",
        tags: ["Action libre", "Réaction Ombre"]
      },
      {
        id: "cmb-9",
        type: "step",
        label: "2c. Calcul & attribution des dégâts",
        detail: "Dégâts = Attaque de l'ennemi − Défense du défenseur (min 0).\n\n• Les dégâts sont placés sur le défenseur.\n• Si dégâts ≥ PV du défenseur → défenseur éliminé (défaussé).\n• Sans défenseur → dégâts distribués sur les héros (1 par héros).",
        tags: ["Obligatoire", "Calcul"]
      },
      {
        id: "cmb-10",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Après les dégâts de cette attaque. Effets déclenchés « après que le défenseur subit des dégâts ». Rares mais existent.",
        tags: ["Action libre"]
      },
      {
        id: "cmb-11",
        type: "substep",
        label: "— (Fin de la boucle attaques ennemies) —",
        detail: "Répéter 2a → 2b → 2c pour chaque ennemi restant.",
        tags: ["Boucle"]
      },
      {
        id: "cmb-12",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Après TOUTES les attaques ennemies, AVANT les attaques des joueurs. Fenêtre importante pour soigner, redresser des personnages pour attaquer.",
        tags: ["Action libre", "⭐ Entre attaque/défense", "Crucial"]
      },
      {
        id: "cmb-13",
        type: "substep",
        label: "— ATTAQUES DES JOUEURS (pour chaque ennemi) —",
        detail: "En commençant par le premier joueur, chaque joueur peut attaquer les ennemis engagés. Un même ennemi peut recevoir plusieurs attaques. Pour chaque attaque :",
        tags: ["Sous-séquence"]
      },
      {
        id: "cmb-14",
        type: "step",
        label: "3a. Déclarer les attaquants",
        detail: "Le joueur incline 1 ou plusieurs personnages pour attaquer ensemble. Un personnage déjà incliné ne peut PAS attaquer. Les personnages avec Attaque à distance (Ranged) peuvent attaquer chez d'autres joueurs.",
        tags: ["Obligatoire", "Plusieurs attaquants OK"]
      },
      {
        id: "cmb-15",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Après la déclaration des attaquants. Moment pour ajouter des attaquants supplémentaires, booster l'Attaque, ou utiliser des capacités d'Attaque à distance.",
        tags: ["Action libre", "⭐ Boost Attaque"]
      },
      {
        id: "cmb-16",
        type: "step",
        label: "3b. Calcul & attribution des dégâts",
        detail: "Dégâts = Attaque totale des attaquants − Défense de l'ennemi (min 0).\n\n• Les dégâts sont placés sur l'ennemi ciblé.\n• Si dégâts ≥ PV de l'ennemi → ennemi éliminé (défaussé, effet de victoire s'applique).",
        tags: ["Obligatoire", "Calcul"]
      },
      {
        id: "cmb-17",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Après les dégâts infligés à l'ennemi. Effets déclenchés par l'élimination d'un ennemi.",
        tags: ["Action libre"]
      },
      {
        id: "cmb-18",
        type: "substep",
        label: "— (Fin de la boucle attaques joueurs) —",
        detail: "Répéter 3a → 3b pour chaque attaque souhaitée.",
        tags: ["Boucle"]
      }
    ]
  },

  {
    id: "refresh",
    number: 7,
    name: "Phase de Restauration",
    icon: "🌅",
    color: "#ea580c",
    colorLight: "#fff7ed",
    colorDark: "#c2410c",
    summary: "Toutes les cartes sont redressées et la menace augmente. Le jeton de premier joueur passe.",
    steps: [
      {
        id: "ref-1",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "Fenêtre d'action avant le redressement des cartes.",
        tags: ["Action libre"]
      },
      {
        id: "ref-2",
        type: "step",
        label: "1. Redresser toutes les cartes",
        detail: "Tous les joueurs redressent (remettent droites) toutes leurs cartes inclinées : héros, alliés, attachements, lieux actifs.",
        tags: ["Obligatoire"]
      },
      {
        id: "ref-3",
        type: "step",
        label: "2. Augmentation de menace",
        detail: "Chaque joueur augmente son compteur de Menace de 1.\n\n⚠️ Si la menace d'un joueur atteint ou dépasse 50 → il est éliminé !",
        tags: ["Obligatoire", "⚠️ Élimination à 50"]
      },
      {
        id: "ref-4",
        type: "action",
        label: "🟢 Fenêtre d'Action",
        detail: "APRÈS l'augmentation de menace. Fenêtre cruciale pour jouer des effets de réduction de menace (ex : Gandalf, Conseil de Fondcombe, etc.). Toutes les capacités « Action de restauration » se jouent ici.",
        tags: ["Action libre", "⭐ Réduction Menace", "Crucial"]
      },
      {
        id: "ref-5",
        type: "step",
        label: "3. Passage du jeton Premier Joueur",
        detail: "Le jeton de Premier Joueur est passé au joueur suivant dans le sens des aiguilles d'une montre. Le nouveau premier joueur commence le prochain tour.",
        tags: ["Obligatoire", "Sens horaire"]
      }
    ]
  }
];
