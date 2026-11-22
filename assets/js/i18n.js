/* Aboud Beroual – portfolio. Translations.

   HOW THIS WORKS
   - English lives in index.html. It is what search engines and visitors
     without JavaScript read.
   - French lives here, in I18N.fr, grouped by page section. An element with
     data-i18n="alchemy.summary" gets I18N.fr.alchemy.summary as its HTML.
     data-i18n-attrs="alt:hero.photoAlt" does the same for an attribute.
   - I18N.en only holds the few strings that site.js creates itself
     (button labels in the widgets). Their French twins are in fr.ui / fr.toy.

   RULES
   - Change an English string in index.html -> change its French twin here.
   - Add a data-i18n key in index.html -> add the same key here.
   - Write &nbsp; for a non-breaking space (before % $ : « », inside numbers).
   - French number style: 2&nbsp;100 pi, 8,8&nbsp;%, 14&nbsp;$.
   - Product names, code names and tech terms stay as they are
     (React, Manifest V3, PID, Monte Carlo, ReviewHub...).
   - Never add a number or a claim that is not in the English page.
*/
window.I18N = {

  /* ---------------- English: script-made strings only ---------------- */
  en: {
    ui: {
      viewer: 'Image viewer',
      prev: 'Previous',
      next: 'Next',
      close: 'Close',
      of: '{n} of {total}',
      enlarge: 'Enlarge photo: {title}',
      steps: 'Build steps',
      stepStatus: 'Step {n} of {total}: {title}'
    },
    toy: {
      thrust: 'Thrust spread',
      tilt: 'Tilt spread',
      trigger: 'Burn starts at',
      run: 'Run {n} trials',
      landed: 'Landed',
      crashed: 'Crashed',
      status: 'Toy result: {landed} of {n} landed, {crashed} crashed.',
      canvas: 'Altitude against time for each simulated trial, showing the last 27 metres of the fall.',
      burnAt: 'burn starts, {h}',
      legendLanded: 'landed',
      legendCrashed: 'crashed'
    },
    vtol: {
      landingCta: 'Landing page'
    }
  },

  /* ---------------- Français ---------------- */
  fr: {

    /* <head>: titre de l'onglet, description, cartes de partage */
    meta: {
      title: 'Aboud Beroual – logiciels et matériel de vol',
      description: 'Aboud Beroual étudie le génie aérospatial à l’Université Concordia, à Montréal, et conçoit des logiciels et du matériel de vol&nbsp;: un moteur d’optimisation des récompenses, une extension Chrome, une fusée de haute puissance certifiée et un simulateur d’atterrissage.',
      ogDescription: 'Étudiant en génie aérospatial à l’Université Concordia, à Montréal. Des projets de logiciel et de matériel de vol, avec les photos de fabrication et des démonstrations fonctionnelles.',
      ogImageAlt: 'Une fusée de haute puissance jaune et noire quitte la rampe de lancement sur une colonne de fumée blanche.',
      twDescription: 'Étudiant en génie aérospatial à l’Université Concordia, à Montréal. Des projets de logiciel et de matériel de vol.'
    },

    /* En-tête */
    nav: {
      skip: 'Aller aux projets',
      home: 'Aboud Beroual, retour en haut de la page',
      experience: 'Expérience',
      about: 'À propos',
      contact: 'Contact'
    },

    /* Sommaire : le rail de gauche (grands écrans) et le menu « Sommaire » (petits écrans).
       Les autres libellés du sommaire réutilisent les titres des projets (more.*.title). */
    rail: {
      label: 'Sur cette page',
      contents: 'Sommaire',
      lander: 'Atterrissage vertical de fusée',
      vt: 'Contrôleur VT-1',
      article: 'Le paradoxe de la transition énergétique'
    },

    /* Titres des trois groupes de projets */
    groups: {
      hardware: 'Matériel',
      software: 'Logiciel',
      research: 'Recherche'
    },

    /* Libellés d'interface (boutons, visionneuse) */
    ui: {
      language: 'Langue',
      theme: 'Thème',
      themeSystem: 'Suivre le thème du système',
      themeLight: 'Thème clair',
      themeDark: 'Thème sombre',
      viewer: 'Visionneuse d’images',
      prev: 'Précédent',
      next: 'Suivant',
      close: 'Fermer',
      of: '{n} de {total}',
      enlarge: 'Agrandir la photo&nbsp;: {title}',
      steps: 'Étapes de fabrication',
      stepStatus: 'Étape {n} de {total}&nbsp;: {title}'
    },

    /* Haut de page */
    hero: {
      line: '<span>Étudiant en génie aérospatial.</span> <span>Je conçois des logiciels et du matériel de vol.</span>',
      sub: 'Université Concordia, Montréal. Promotion 2028.',
      resume: 'CV (PDF, en anglais)',
      now: 'En ce moment',
      now2org: 'Agence spatiale canadienne',
      now2: 'Stagiaire en intégration de programme',
      now3: 'Structures et liaison charge utile, division Solid Rocketry',
      photoAlt: 'Une fusée jaune et noire à quelques mètres au-dessus de la rampe de lancement, suivie d’une colonne de fumée blanche au-dessus d’un champ.',
      photoCap: 'Averell 1 pendant son vol de certification.'
    },

    /* Libellés communs aux projets */
    projects: {
      how: 'Comment c’est construit',
      what: 'Ce que ça fait',
      details: 'Détails',
      source: 'Code source sur GitHub'
    },

    alchemy: {
      status: 'Prélancement',
      role: 'Cofondateur<br>Fintech canadienne',
      summary: 'Aiguillage automatique des récompenses de cartes de crédit. Au moment de payer, Alchemy choisit la meilleure carte parmi celles que vous avez déjà. L’extension de navigateur arrive en premier.',
      cta: 'Page de présentation d’Alchemy',
      private: 'Le dépôt de code est privé.',
      figuresLabel: 'Chiffres vérifiés sur les données',
      n1: '41',
      n1l: 'cartes canadiennes modélisées, dont 39 vérifiées',
      n2: '1&nbsp;085',
      n2l: 'règles regex ordonnées dans le dictionnaire de marchands',
      n3: '844',
      n3l: 'marques sur la liste de couverture',
      n4: '13',
      n4l: 'profils de dépenses appuyés sur des sources',
      tiersH: 'Niveau de confiance des 1&nbsp;085 règles',
      tiersAlt: 'Niveaux de confiance des règles&nbsp;: 24 vérifiées par deux sources, 78 issues de la communauté, 451 tirées de relevés, 532 de départ.',
      t1: 'vérifiées par deux sources',
      t2: 'issues de la communauté',
      t3: 'tirées de relevés',
      t4: 'de départ',
      sim: '<b>Résultat de simulation.</b> Sur 13 profils de ménages, l’aiguillage a rapporté de 14&nbsp;$ à 136&nbsp;$ de plus par année que la meilleure carte unique de chaque portefeuille (médiane de 8,8&nbsp;%, mesurée par rapport à une référence établie a posteriori) et de 73&nbsp;$ à 778&nbsp;$ de plus par année que l’habitude de payer avec une carte par défaut. Ce sont des chiffres simulés. Alchemy n’a pas encore d’utilisateurs réels.',
      b1: 'Un optimiseur en Python pur, un simulateur autovérifiant et un analyseur rétroactif de relevés, avec 17 tests unitaires et un validateur de données exécutés dans GitHub Actions.',
      b2: 'Un dictionnaire de marchands fait de règles regex ordonnées, qui associe les descripteurs bruts des relevés à un code de catégorie de marchand (MCC) et à une catégorie. L’ordre fait la priorité&nbsp;: Uber Eats est reconnu avant les courses Uber.',
      b3: 'Des outils d’anonymisation et de regroupement des descripteurs, appliqués à environ 930 lignes de relevés anonymisées.',
      b4: 'Une extension Manifest V3 en TypeScript avec un coffre local pour les cartes, et un test Vitest qui prouve qu’aucun numéro de carte ne quitte le coffre.',
      chartAlt: 'Diagramme à barres horizontales de 13 profils de dépenses. Pour chacun, une barre foncée montre les récompenses supplémentaires par année obtenues par l’aiguillage par rapport à la meilleure carte unique du portefeuille, de 14&nbsp;$ à 136&nbsp;$, et une barre pâle montre la même chose par rapport à l’usage constant de la carte par défaut, de 73&nbsp;$ à 778&nbsp;$.',
      chartCap: 'Sortie du simulateur pour les 13 profils de dépenses (graphique en anglais)&nbsp;: récompenses supplémentaires par année grâce à l’aiguillage, par rapport à la meilleure carte unique du portefeuille et par rapport à l’usage constant de la carte par défaut. Des chiffres simulés, pas des utilisateurs réels.',
      opsH: 'Le modèle d’exploitation des agents',
      ops1: 'Agents d’IA planifiés',
      ops1a: 'Chaque nuit&nbsp;: maintenance des données, dictionnaire de marchands, passe de reprise',
      ops1b: 'Chaque semaine&nbsp;: orchestrateur',
      ops2: 'Changements de données',
      ops3: 'Vérifications d’intégration continue',
      ops3a: 'Validateur et 17 tests unitaires',
      ops4: 'Commit',
      ops4a: 'Seulement si les vérifications réussissent',
      ops5: 'Changements de code',
      ops6: 'Pull request',
      ops7: 'Approbation des fondateurs',
      opsCap: 'Les agents planifiés proposent les changements. Les données ne sont enregistrées que si les vérifications d’intégration continue réussissent; le code arrive sous forme de pull request que les fondateurs approuvent.',
      b5: 'J’ai conçu le modèle d’exploitation des agents&nbsp;: des agents d’IA planifiés tournent chaque nuit (maintenance des données, dictionnaire de marchands, passe de reprise), sous un orchestrateur hebdomadaire. Les commits de données passent par les vérifications d’intégration continue; le code arrive sous forme de pull requests que les fondateurs approuvent.',
      tools: 'Python, TypeScript, Manifest V3, Vitest, GitHub Actions, agents d’IA planifiés'
    },

    lectern: {
      status: 'En ligne',
      role: 'Extension Chrome<br>Projet personnel',
      summary: 'Une extension Chrome pour prendre des notes sur des cours diffusés sur YouTube. Elle est offerte dans le Chrome Web Store et fonctionne entièrement sur votre ordinateur&nbsp;: aucun serveur, aucun compte.',
      cta: 'Ajouter à Chrome',
      shotsLabel: 'Captures d’écran de Lectern, à faire défiler de côté',
      s1alt: 'Le panneau latéral de Lectern à côté d’une vidéo de cours, avec un résumé et une liste de notes horodatées.',
      s1t: 'Notes',
      s1: 'Appuyez sur Entrée et la note porte l’horodatage de la vidéo. Un clic sur l’horodatage y ramène.',
      s2alt: 'La vue des dossiers de Lectern&nbsp;: quatre vidéos de cours dans l’ordre d’étude, chacune avec sa progression de visionnement.',
      s2t: 'Dossiers',
      s2: 'Regroupez les vidéos comme un cours regroupe ses séances.',
      s3alt: 'La vue Ask de Lectern, avec une question sur la vidéo et une réponse qui cite des horodatages.',
      s3t: 'Questions',
      s3: 'Interrogez la vidéo avec votre propre clé d’API; les réponses citent des horodatages.',
      s4alt: 'L’onglet de transcription de Lectern, avec la recherche d’un mot et les lignes correspondantes surlignées.',
      s4t: 'Transcription',
      s4: 'Cherchez dans la transcription captée et sautez à l’endroit où une phrase a été dite.',
      s5alt: 'Des notes de cours prises dans Lectern, ouvertes dans une page Notion, avec les sections Summary et Questions.',
      s5t: 'Synchronisation',
      s5: 'Les notes se synchronisent avec Notion et Obsidian, et s’exportent en Markdown, Word et PDF.',
      b1: 'Chaque note porte l’horodatage de la vidéo. Un clic sur l’horodatage y ramène.',
      b2: 'Capte la transcription et permet d’y faire des recherches.',
      b3: 'Les dossiers servent de cours.',
      b4: 'Posez une question à la vidéo avec votre propre clé Claude ou OpenAI. Les réponses citent des horodatages cliquables.',
      b5: 'Synchronisation avec Notion et Obsidian; exportation en Markdown, Word et PDF.',
      b6: 'Chrome Manifest V3 en JavaScript pur, avec des tests de bout en bout Playwright.',
      tools: 'Chrome MV3, JavaScript pur, Playwright, synchronisation Notion et Obsidian'
    },

    /* Averell 1, fusée de niveau 1 */
    l1: {
      status: 'A volé',
      role: 'Projet personnel de certification<br>Octobre 2026',
      title: 'Averell 1, fusée de haute puissance de niveau 1',
      summary: 'J’ai conçu, construit et fait voler une fusée de certification de niveau 1. Elle a atteint 2&nbsp;100&nbsp;pi avec un moteur H135 le 18 octobre 2026 et est revenue intacte.',
      buildH: 'La fabrication, de la table de pièces au champ de récupération',
      s1alt: 'Des pièces de fusée sur un établi&nbsp;: un tube de corps blanc, une ogive rouge en PETG, trois ailerons noirs en contreplaqué et une cloison en contreplaqué.',
      s1t: 'Pièces',
      s1: 'Tout est étalé avant l’assemblage&nbsp;: tube de corps, ogive imprimée en PETG, ailerons et cloison en contreplaqué découpés au laser.',
      s2alt: 'Des ailerons noirs en contreplaqué insérés autour d’un tube moteur, tenus par un bloc d’ailerons rouge imprimé en 3D.',
      s2t: 'Bloc d’ailerons',
      s2: 'Ailerons en contreplaqué et tube moteur montés sur le bloc d’ailerons imprimé en 3D.',
      s3alt: 'La fusée assemblée, debout dans un atelier, corps blanc et ogive rouge.',
      s3t: 'Assemblée',
      s3: 'La cellule assemblée, debout dans l’atelier, avant la peinture.',
      s4alt: 'La fusée dans une cabine de peinture, peinte en jaune avec une section d’ailerons noire.',
      s4t: 'Peinte',
      s4: 'Jaune et noir, dans la cabine de peinture.',
      s7alt: 'Aboud à genoux dans un champ moissonné, à côté de la fusée jaune et noire, avec des rampes de lancement et d’autres participants en arrière-plan.',
      s7t: 'Sur le terrain',
      s7: 'Avec Averell 1 au lancement Ciel d’Octobre.',
      s5alt: 'La fusée quitte la rampe au-dessus d’un nuage de fumée blanche.',
      s5t: 'Lancement',
      s5: 'Départ de la rampe avec un moteur H135, le 18 octobre 2026.',
      s6alt: 'La fusée couchée dans l’herbe, son parachute orange à côté.',
      s6t: 'Récupérée',
      s6: 'Retrouvée dans l’herbe, parachute attaché. Intacte.',
      videoLabel: 'Accéléré de l’impression 3D du bloc d’ailerons rouge, 52 secondes, sans son.',
      videoFallback: 'Télécharger l’accéléré (MP4, 6,9&nbsp;Mo)',
      videoCap: 'Impression du bloc d’ailerons. Accéléré de 52 secondes, sans son.',
      profileAlt: 'Graphique OpenRocket intitulé Averell 1 L1 Flight Profile, qui trace l’altitude, la vitesse verticale et l’accélération verticale en fonction du temps.',
      profileCap: 'Le profil de vol OpenRocket qui a servi à planifier le vol.',
      how: 'Conception et certification',
      b1: 'Vol simulé dans OpenRocket, stabilité ajustée pour une journée de lancement venteuse.',
      b2: 'Ailerons, cloison et dispositif de retenue du moteur conçus dans SolidWorks, ogive dans Onshape. Ogive et dispositif de retenue imprimés en PETG, ailerons et cloison découpés au laser dans du contreplaqué, puis cellule assemblée à l’époxy.',
      b3: 'Certification de niveau 1 en fusées de haute puissance, obtenue après la réussite des examens de Transports Canada et de l’Association canadienne de fuséonautique (ACF). Membre de l’ACF et du CQF.',
      tools: 'OpenRocket, SolidWorks, Onshape, impression 3D en PETG, découpe laser, assemblage à l’époxy'
    },

    /* Simulateur d'atterrissage vertical (projet VTOL) */
    vtol: {
      status: 'En conception',
      role: 'Projet personnel<br>Simulateur Python et micrologiciel de banc d’essai ESP32',
      title: 'Simulateur d’atterrissage vertical de fusée',
      summary: 'Un simulateur 2D pour faire atterrir sous poussée une petite fusée à propergol solide. Un moteur à propergol solide ne peut pas moduler sa poussée&nbsp;: presque tout dépend donc du moment où commence la poussée d’atterrissage.',
      landingCta: 'Page de présentation',
      fig1alt: 'Figure Matplotlib à trois graphiques superposés en fonction du temps&nbsp;: inclinaison et angle du cardan, altitude et vitesse, avec les deux poussées des moteurs en zones ombrées.',
      fig1cap: 'Un vol simulé, tel que le produit le simulateur Python&nbsp;: inclinaison et angle du cardan, altitude et vitesse. Les zones ombrées sont les deux poussées des moteurs.',
      fig2alt: 'Figure Matplotlib intitulée «&nbsp;0/100 success&nbsp;»&nbsp;: la vitesse à l’impact selon la poussée du moteur d’atterrissage pour 100 cas simulés, tous au-dessus de la ligne pointillée de la limite, et l’apogée selon la poussée du moteur d’ascension.',
      fig2cap: 'Le premier balayage Monte Carlo&nbsp;: 100 cas simulés, aucun sous la limite de vitesse à l’impact (la ligne pointillée).',
      toyH: 'Essayez le problème de l’atterrissage',
      toyFlag: '<b>Modèle jouet.</b> Une illustration simplifiée en JavaScript, pas le simulateur Python du projet. Ses chiffres ne sont pas des résultats du projet.',
      toyNoJs: 'Avec JavaScript activé, ce panneau exécute un petit jouet Monte Carlo&nbsp;: une masse ponctuelle lâchée de 40&nbsp;m, avec une poussée de durée fixe qui commence à l’altitude de votre choix.',
      toyHowH: 'Comment fonctionne le jouet',
      toyHow: 'Une masse ponctuelle tombe de 40&nbsp;m (le graphique montre les 27 derniers mètres). À l’altitude de déclenchement, un moteur s’allume pour une durée fixe de 1,14&nbsp;s, sans pouvoir moduler sa poussée. Chaque essai tire au hasard une erreur de poussée et une inclinaison fixe, sans contrôle d’attitude. Un essai compte comme un atterrissage s’il touche le sol à moins de 2&nbsp;m/s à la verticale et de 1&nbsp;m/s de côté. Mettez les deux dispersions à zéro et le déclencheur fixe réussit à tout coup; ajoutez de la dispersion et il ne fonctionne plus. Ces chiffres viennent uniquement de ce jouet. Le seul résultat du projet à ce jour est le premier balayage décrit plus bas&nbsp;: 0 sur 100.',
      b1: 'Python avec NumPy et Matplotlib, à un pas de 1&nbsp;ms.',
      b2: 'Une boucle d’attitude PID à 200&nbsp;Hz, avec le retard et les limites de vitesse des servos.',
      b3: 'Des séries Monte Carlo sur ±15&nbsp;% de poussée et ±5° d’inclinaison, avec un déclencheur de poussée d’atterrissage et une suite pytest.',
      b4: 'Un micrologiciel de banc d’essai pour ESP32, en C++ avec PlatformIO.',
      b5: 'Le premier balayage Monte Carlo a réussi 0 atterrissage sur 100 avec le déclencheur naïf. Je l’ajuste en ce moment.',
      tools: 'Python, NumPy, Matplotlib, pytest, C++, PlatformIO, ESP32'
    },

    /* Jouet d'atterrissage (libellés créés par site.js) */
    toy: {
      thrust: 'Dispersion de la poussée',
      tilt: 'Dispersion de l’inclinaison',
      trigger: 'Allumage à',
      run: 'Lancer {n} essais',
      landed: 'Posées',
      crashed: 'Écrasées',
      status: 'Résultat du jouet&nbsp;: {landed} sur {n} posées, {crashed} écrasées.',
      canvas: 'Altitude en fonction du temps pour chaque essai simulé, sur les 27 derniers mètres de la chute.',
      burnAt: 'allumage, {h}',
      legendLanded: 'posée',
      legendCrashed: 'écrasée'
    },

    /* Projets de l'index compact (sous les projets vedettes de chaque groupe) */
    more: {
      inProgress: 'En cours',
      aft: {
        title: 'Section arrière Mach 3',
        ctx: 'Space Concordia, division Solid Rocketry, équipe structures et liaison charge utile',
        when: 'Mai 2026 – aujourd’hui',
        sum: 'Je conçois le rétreint en fibre de carbone d’une fusée à deux étages qui vise Mach 3.',
        i1alt: 'Modèle Siemens NX d’une longue ogive effilée, avec un épaulement cylindrique.',
        i2alt: 'Modèle Siemens NX du rétreint, un court anneau conique vu depuis son grand diamètre.',
        cap: 'Ogive et rétreint dans Siemens NX.',
        b1: 'J’ai modélisé le rétreint dans Siemens NX comme une pièce entièrement paramétrique, pilotée par des expressions nommées, ainsi que l’ogive et sa pointe, et j’ai produit les dessins de fabrication.',
        b4: 'Je suis l’agent de liaison de l’équipe structures pour la charge utile.',
        b5: 'Prochaine étape&nbsp;: l’analyse par éléments finis (FEA) des structures dans Siemens NX.',
        videoLabel: 'Coupe d’une section de tube pour la fusée de compétition à la scie à eau, 12&nbsp;secondes, sans son.',
        videoFallback: 'Télécharger la vidéo (MP4, 0,5&nbsp;Mo)',
        videoCap: 'Coupe d’une section de tube pour la fusée de compétition, à l’atelier. 12&nbsp;secondes, sans son.',
        tools: 'Siemens NX, modélisation paramétrique, dessins de fabrication, fibre de carbone'
      },
      rh: {
        ctx: 'Agence spatiale canadienne, stagiaire en intégration de programme',
        when: 'Janv. – déc. 2026, à temps partiel depuis septembre',
        status: 'Déploiement à l’étude',
        sum: 'Une application complète (full-stack) pour rédiger et commenter des écarts de revue (RID, Review Item Discrepancies) dans des livrables PDF et Word.',
        b1: 'Point de départ&nbsp;: un sondage auprès d’une dizaine d’ingénieurs réviseurs.',
        b2: 'React et TypeScript côté client; Node et Express avec SQLite côté serveur.',
        b3: 'Déployée comme serveur d’équipe multiutilisateur et offerte en exécutable Windows.',
        b4: 'Démonstrations aux réviseurs, aux TI et à la direction, et rédaction de la proposition d’hébergement. Une analyse de rentabilisation pour un déploiement dans tout le programme d’exploration lunaire est entre les mains de la direction générale.',
        b5: 'Aussi, de l’automatisation interne&nbsp;: un extracteur de documents sans interface graphique (Selenium et pandas) qui exporte vers Excel et SharePoint, empaqueté avec PyInstaller, et des flux de gestion de la configuration dans Power Automate.',
        note: 'Aucune capture d’écran&nbsp;: l’outil est interne à l’Agence.',
        tools: 'React, TypeScript, Node, Express, SQLite, Selenium, pandas, Power Automate'
      },
      vt: {
        title: 'VT-1, contrôleur de base d’entraînement intelligente',
        ctx: 'Projet personnel, matériel et web',
        when: 'Oct. 2026 – aujourd’hui',
        sum: 'Un contrôleur à écran unique pour les bases d’entraînement intelligentes Bluetooth&nbsp;: on choisit ERG, résistance ou pente, on tourne la molette, on pédale. Il existe en version portative à ESP32-S3 avec un cadran de puissance rond, et en application web que vous pouvez essayer dès maintenant.',
        cta: 'Ouvrir l’application web VT-1',
        i1alt: 'Rendu du VT-1&nbsp;: un boîtier en biseau avec un cadran de puissance rond, un sélecteur de mode, un bouton et une grande molette.',
        i2alt: 'Vue CAO de la coque imprimée, de dessus, avec les ouvertures pour l’écran, la molette et les commandes.',
        i3alt: 'Vue CAO de la coque, de dessous, avec quatre bossages de coin pour les inserts.',
        i4alt: 'Le dessus imprimé du boîtier, percé pour le cadran, la molette, le sélecteur, les voyants et le bouton de maintien.',
        i5alt: 'L’intérieur de la coque imprimée&nbsp;: l’écran rond en place derrière son ouverture.',
        i6alt: 'Les pièces étalées&nbsp;: boîtier et couvercle imprimés, molette et collerettes bleues, câble plat, encodeur et autres composants électroniques.',
        cap: 'Rendu conceptuel et CAO, puis le boîtier imprimé, l’essai d’ajustement de l’écran et les pièces.',
        videoLabel: 'Le cadran de puissance rond en marche sur le banc, 7&nbsp;secondes, sans son.',
        videoFallback: 'Télécharger la vidéo (MP4, 1,7&nbsp;Mo)',
        videoCap: 'Le cadran rond en marche sur le banc. 7&nbsp;secondes, sans son.',
        b1: 'J’ai d’abord validé la chaîne de commande avec un prototype dans le navigateur, qui a piloté une base Elite Tuo pendant un essai de 30 minutes&nbsp;: maintien de la puissance, réponse à l’échelon, mise à l’échelle de la résistance et reconnexion.',
        b5: 'J’ai construit l’application web avec Vite, TypeScript et Web Bluetooth. Elle fonctionne dans Chrome et Edge sur ordinateur et dans Chrome sur Android, avec un mode démo pour ceux qui n’ont pas de base d’entraînement. Les encodeurs et décodeurs FTMS sont regroupés dans un module commun doté de tests unitaires.',
        b2: 'Un boîtier en biseau de 150&nbsp;×&nbsp;92&nbsp;mm, incliné à 11° pour la lecture, avec vérifications de dégagement, inserts filetés posés à chaud et éprouvette d’ajustement, puis imprimé&nbsp;: coque, couvercle inférieur, collerette d’écran, molette et collerettes de voyants.',
        b6: 'Matériel&nbsp;: ESP32-S3, écran rond de 1,28&nbsp;po, encodeur rotatif, bouton de maintien lumineux et trois voyants d’état. La nomenclature de l’électronique revient à environ 140&nbsp;$&nbsp;CA.',
        b4: 'Prochaine étape&nbsp;: l’essai du micrologiciel sur banc.',
        b7: 'Une fois Cadence offert dans l’App Store, VT-1 s’y connectera pour que les séances personnalisées de Cadence puissent se faire avec VT-1.',
        app1alt: 'L’application web VT-1 sur un téléphone, en mode ERG&nbsp;: un cadran rond avec une cible de 150&nbsp;watts, la puissance, la cadence et le temps en direct, et des boutons moins et plus.',
        app2alt: 'L’application web VT-1 sur un téléphone, en mode pente, réglée à 4&nbsp;% de pente.',
        appCap: 'L’application web en mode démo sur un téléphone&nbsp;: ERG avec une cible de 150&nbsp;W, puis pente à +4&nbsp;%.',
        tools: 'ESP32-S3, Arduino, Bluetooth FTMS, Web Bluetooth, TypeScript, Vite, impression 3D, SolidWorks'
      },
      cad: {
        ctx: 'Entraîneur par IA pour athlètes d’endurance',
        when: '2025 – aujourd’hui',
        sum: 'Cadence est un entraîneur par IA pour les athlètes d’endurance&nbsp;: une application web qui se connecte à Strava et génère des séances d’entraînement, et une application iOS maintenant en développement.',
        cta: 'Visiter cadencetrain.ca',
        c1t: 'Aujourd’hui',
        c1: 'Un résumé quotidien avec des scores pour le sommeil, le corps et l’entraînement.',
        c1alt: 'L’écran Aujourd’hui de Cadence&nbsp;: une carte de jour de repos, le bilan du matin, le résumé quotidien et trois anneaux de score pour le sommeil, le corps et l’entraînement.',
        c2t: 'Bilan',
        c2: 'Un bilan de 20 secondes sur la forme, le sommeil, la fatigue, les courbatures et le stress adapte la séance.',
        c2alt: 'La fiche du bilan quotidien&nbsp;: un choix de forme, d’épuisé à frais, et des échelles à points pour le sommeil, la fatigue, les courbatures, le stress et la motivation.',
        c3t: 'Semaine',
        c3: 'Les séances de la semaine placées dans un calendrier.',
        c3alt: 'L’onglet Plan en vue semaine&nbsp;: séances de course, de natation, de vélo et de mobilité placées sur une grille de calendrier.',
        c4t: 'Mois',
        c4: 'La vue mensuelle du bloc d’entraînement vers la course.',
        c4alt: 'L’onglet Plan en vue mois, avec des icônes de séance sur chaque jour de novembre 2026.',
        c5t: 'Entraîneur',
        c5: 'On demande un plan à l’entraîneur; il en propose un à réviser avant de l’appliquer.',
        c5alt: 'La conversation avec l’entraîneur&nbsp;: une demande de plan d’endurance prudent et un plan d’une semaine proposé, avec les séances jour par jour.',
        c6t: 'Profil',
        c6: 'Objectif de course, jours d’entraînement, moments préférés et applications connectées.',
        c6alt: 'L’onglet Profil&nbsp;: l’objectif de course, les jours d’entraînement choisis, le moment d’entraînement préféré et l’intégration Apple Santé.',
        tourLabel: 'Une visite de 15 secondes de l’application iOS Cadence&nbsp;: Aujourd’hui, bilan, plans de la semaine et du mois, l’entraîneur qui propose puis applique un plan, et le profil. Sans son.',
        tourFallback: 'Télécharger la visite (MP4, 0,8&nbsp;Mo)',
        tourCap: 'Une visite de 15 secondes de l’application iOS. Sans son.',
        shotsLabel: 'Captures d’écran de Cadence, défiler horizontalement',
        shotsNote: 'Écrans du simulateur iOS, avec les données d’exemple intégrées à l’application.',
        b1: 'La V0 était une application web Flask avec l’authentification OAuth et l’API de Strava, des séances d’entraînement générées par OpenAI et une vue horaire et calendrier.',
        b3: 'Je codéveloppe maintenant l’application iOS de Cadence&nbsp;: un entraîneur par IA qui prépare des plans d’entraînement en fonction du calendrier de l’athlète et lit les données WHOOP ou Apple Santé. Une fois offerte dans l’App Store, ses séances personnalisées pourront se faire sur une base d’entraînement intelligente grâce à VT-1.',
        b2: 'Pour la recherche produit, un pipeline Python et GPT-5 avec découpage map-reduce a transformé 47 transcriptions de balados et de cours en rapports individuels et en méta-analyses couvrant plusieurs épisodes.',
        tools: 'Python, Flask, API Strava, API OpenAI, Swift (iOS)'
      },
      h2: {
        title: 'L’hydrogène pour les aéroports d’aviation générale',
        ctx: 'Stagiaire de recherche (BRPC du CRSNG), Aircraft Systems Lab, Concordia',
        when: 'Mai – août 2025',
        sum: 'Un tableau de bord d’indicateurs sur l’électricité et l’hydrogène pour les 20 principaux aéroports d’aviation générale des États-Unis.',
        b1: 'Des indicateurs par région du Electricity Market Module (EMM), selon trois scénarios de l’Energy Information Administration des États-Unis&nbsp;: référence, pétrole et gaz élevés, pétrole et gaz faibles.',
        b2: 'Une analyse de sensibilité Monte Carlo pour une analyse du cycle de vie.',
        f1alt: 'Carte des États-Unis contigus, divisée en régions du marché de l’électricité de l’EIA, avec 20 points qui marquent les principaux aéroports d’aviation générale.',
        f1cap: 'Les 20 aéroports et les régions électriques qui les alimentent (figure en anglais).',
        f2alt: 'Graphique linéaire de l’intensité médiane en CO₂ du réseau, en g/kWh, de 2024 à 2050, pour trois scénarios de l’EIA. Les trois courbes partent d’environ 290 et descendent; en 2050, le scénario de référence finit à 79, pétrole et gaz faibles à 42, pétrole et gaz élevés à 95.',
        f2cap: 'Intensité médiane en CO₂ du réseau dans les 13 régions qui desservent 19 des aéroports, selon trois scénarios de l’EIA, d’après les données du tableau de bord&nbsp;: environ 290&nbsp;g/kWh en 2024; en 2050, 79 (référence), 42 (pétrole et gaz faibles) et 95 (pétrole et gaz élevés).',
        figNote: 'Figures retracées avec Matplotlib à partir des données et des fonctions du tableau de bord.'
      },
      us: {
        title: 'Données d’entraînement pour la classification des vues cardiaques',
        ctx: 'Chercheur, Healthcare for Extreme and Rural Environments (HERE)',
        when: 'Avr. 2026 – aujourd’hui',
        sum: 'Des données d’entraînement, des procédures et de la CAO pour une IA qui classe les vues d’échographie cardiaque.',
        link: 'À propos de HERE',
        i1alt: 'Début d’un guide web intitulé «&nbsp;Echocardiography, from the wave to the diagnosis&nbsp;», avec une vue schématique à quatre cavités et une liste de huit sections.',
        i2alt: 'Section du guide sur la structure du cœur&nbsp;: un schéma des quatre cavités et un schéma de la circulation du sang dans le cœur et les poumons.',
        i3alt: 'Aide-mémoire avec deux vues parasternales grand axe schématiques, en diastole et en systole, chacune avec cinq points numérotés à vérifier.',
        cap: 'Du matériel de formation que j’ai créé (en anglais)&nbsp;: une introduction à l’échocardiographie et un aide-mémoire pour distinguer la systole de la diastole en vue parasternale grand axe. Tous les schémas sont des dessins; aucun n’est une image de patient.',
        b1: 'Plus de 3&nbsp;000 échographies cardiaques étiquetées par vue standard, et rédaction des guides d’étiquetage qu’utilisent les nouveaux chercheurs.',
        b2: 'Rédaction d’une procédure d’essai pour la pression de contact de la sonde. Les mesures n’ont pas encore été prises.',
        b3: 'Effecteur terminal modélisé dans SolidWorks.',
        tools: 'SolidWorks, étiquetage de données, procédures d’essai'
      },
      pat: {
        title: 'Classification de brevets',
        ctx: 'Petit script',
        sum: 'Un script Python qui classe des fiches de brevets selon la définition d’une catégorie, à l’aide de l’API d’OpenAI.'
      }
    },

    research: {
      meta: 'EconomicSense Undergraduate Journal, deuxième édition, pages 32 à 36. Directeur de recherche&nbsp;: Hani Sarkis, Ph.&nbsp;D., professeur. Présenté au deuxième ESJ Research Summit.',
      q: '<span class="quiet">Question de recherche&nbsp;:</span> comment le développement stratégique des technologies de rupture peut-il faire croître l’énergie propre assez vite pour que l’électrification réduise vraiment les émissions&nbsp;?',
      talkAlt: 'Aboud parle au micro pendant la période de questions, devant un écran qui affiche la diapositive titre de la présentation.',
      talkCap: 'Période de questions au deuxième ESJ Research Summit.',
      thesis: 'L’électrification réduit les émissions là où l’énergie est consommée, mais elle fait grimper la demande d’électricité, ce qui met les réseaux sous pression et augmente les émissions en amont. L’offre d’énergie propre ne croît pas assez vite pour combler l’écart.',
      argument: 'L’article soutient que l’IA et l’informatique quantique peuvent accélérer l’innovation et réduire les coûts, mais seulement dans le cadre d’une stratégie industrielle axée sur des missions, qui aligne l’investissement public, la réglementation et l’innovation privée.',
      cta: 'Lire l’article (PDF, 1,1&nbsp;Mo, en anglais)',
      figsH: 'Trois chiffres d’où part l’article',
      f1n: '76&nbsp;%',
      f1: 'de l’approvisionnement total en énergie primaire du Canada provient encore des combustibles fossiles.',
      f2n: '82&nbsp;%',
      f2: 'de la production d’électricité est non émettrice.',
      f3n: '5&nbsp;%',
      f3: 'de la production d’électricité vient du charbon, et pourtant',
      f4n: '61&nbsp;%',
      f4: 'des gaz à effet de serre liés à l’électricité en proviennent.',
      source: 'Source&nbsp;: Ressources naturelles Canada (2023), cité dans l’article.'
    },

    /* Expérience, formation, distinctions */
    exp: {
      h: 'Expérience',
      w1when: 'Janv. – déc. 2026',
      w1org: 'Agence spatiale canadienne',
      w1url: 'https://www.asc-csa.gc.ca/fra/',
      w1role: 'Stagiaire en intégration de programme',
      w1note: 'Création de ReviewHub et d’outils d’automatisation internes. À temps partiel depuis septembre.',
      w2when: 'Avr. 2025 – mai 2026',
      w2role: 'Associé en investissement',
      w2note: 'Programme national de formation en capital de risque, avec un taux d’admission de moins de 15&nbsp;%. Plus de 50 entreprises en démarrage évaluées.',
      w3when: 'Mai – août 2025',
      w3role: 'Stagiaire de recherche, BRPC du CRSNG',
      w3note: 'Tableau de bord sur l’hydrogène en aviation et analyse de sensibilité d’une analyse du cycle de vie.',
      w4when: 'Mai 2023 – janv. 2025',
      w4role: 'Stagiaire en gestion de projet',
      w4note: 'Gestion de trois ingénieurs en apprentissage automatique sur un logiciel de diagnostic. 80&nbsp;000&nbsp;$ en crédits et en financement.',
      w5when: 'Sept. 2022 – déc. 2023',
      w5role: 'Analyste de recherche',
      w5note: 'Commande prédictive par IA pour le CVC, avec l’ÉTS. Financement à six chiffres.',
      eduH: 'Formation',
      csa1alt: 'Aboud, portant son insigne, devant un mur où l’on peut lire «&nbsp;Bienvenue&nbsp;» et «&nbsp;Welcome&nbsp;» à l’Agence spatiale canadienne.',
      csa2alt: 'Aboud, les bras croisés et portant son insigne, devant un panneau lumineux qui montre la Lune au-dessus de la Terre, entre deux drapeaux.',
      csaCap: 'À l’Agence spatiale canadienne, 2026.',
      nus1alt: 'Aboud assis devant une grande enseigne «&nbsp;NUS, The best campus life&nbsp;», à l’Université nationale de Singapour.',
      nus2alt: 'Le Marina Bay Sands et le front de mer de Singapour, la nuit.',
      nus3alt: 'Égoportrait d’Aboud, casquette de cycliste sur la tête, pendant une sortie à vélo le long de Marina Bay; son vélo est à gauche.',
      nusCap: 'Session d’échange à NUS, août – déc. 2025.',
      e1when: 'Promotion 2028',
      e1: 'Baccalauréat en génie aérospatial (B.&nbsp;Ing.)',
      e1org: 'Université Concordia',
      e1note: 'Moyenne de 3,7&nbsp;/&nbsp;4,3, liste d’honneur du doyen.',
      e2when: 'Août – déc. 2025',
      e2: 'Échange',
      e2org: 'Université nationale de Singapour',
      e2note: 'Avec des travaux de simulation d’orbites dans FreeFlyer.',
      e3: 'Diplôme en sciences prémédicales',
      e3note: 'Moyenne de 4,06&nbsp;/&nbsp;4,3.',
      recH: 'Distinctions',
      r1: 'Concours de consultation de l’ECA de Concordia',
      r1p: '1<sup>re</sup> place',
      r2p: '2<sup>e</sup> place',
      r3p: '3<sup>e</sup> place',
      r4p: 'Parmi les 32 meilleurs sur 800',
      r5: 'Concours d’essais de l’Association nucléaire canadienne',
      r5p: 'Lauréat, 2025'
    },

    about: {
      h: 'À propos',
      p1: 'J’étudie le génie aérospatial à l’Université Concordia, à Montréal, et j’obtiendrai mon diplôme en 2028. Presque tout ce que je fais est soit un logiciel qu’on peut installer, soit du matériel qui doit réussir un essai.',
      p2: 'Avant le génie, j’ai obtenu un diplôme en sciences prémédicales à l’Université de Moncton. Je travaille en français et en anglais.',
      p3: 'Loin du bureau, j’ai atteint le sommet du Kilimandjaro, terminé deux Ironman 70.3 et parcouru Taïwan à vélo. Je suis la formation théorique en vue d’une licence de pilote privé.',
      nextH: 'Prochain défi&nbsp;: 24&nbsp;km sur un lac gelé',
      next: 'Le 20 février 2027, je cours 24&nbsp;km sur le lac Saint-Jean gelé aux Courses CRYO avec l’équipe Atlas. La course amasse des fonds pour Sur la pointe des pieds, une fondation qui emmène gratuitement des jeunes de 14 à 39 ans atteints de cancer en expédition d’aventure thérapeutique. Notre objectif est de 1&nbsp;500&nbsp;$, et 100&nbsp;% des dons vont à la fondation.',
      nextTeam: 'Appuyer l’équipe Atlas',
      nextMine: 'Ma page de collecte',
      photoAlt: 'Aboud court sur le tapis rouge de l’arrivée d’un Ironman 70.3.',
      photoCap: 'Ironman 70.3 Langkawi, l’arrivée de la course à pied.'
    },

    contact: {
      h: 'Contact',
      place: 'Montréal (Québec)',
      updated: 'Dernière mise à jour&nbsp;: <time datetime="2026-11">nov. 2026</time>'
    }
  }
};
