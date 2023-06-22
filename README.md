# FnucReact - Composant front-end de l'application FNUC

![Logo Fnuc](public/fnuc_favicon.ico)

FnucReact est un site web où les utilisateurs peuvent commander des livres en grande quantité.

## L'équipe

- Linz Pierre - SCRUM MASTER
- Lesueur Bastien - DEVELOPER
- Calvez Erwan - ARCHITECTE
- Lapassas Quentin - PRODUCT OWNER
- GUIQUERRO Nathaniel - QUALITY TRACKER

## Gestion de projet

Nous suivons la méthodologie Agile SCRUM pour la gestion de notre projet. SCRUM est une approche itérative et collaborative qui nous permet de nous adapter aux exigences changeantes et de fournir de la valeur dans des cycles de développement plus courts. Cette approche favorise la communication et les retours fréquents au sein de l'équipe et avec les parties prenantes, ce qui nous permet de mieux répondre aux besoins des utilisateurs.

### Réunions quotidiennes

Chaque jour, notre équipe tient une réunion quotidienne, également appelée "Daily Meeting". Ces réunions sont généralement courtes et se déroulent soit à distance si les membres de l'équipe travaillent à distance ou debout autour d'un café. Lors de ces réunions, chaque membre partage ce qu'il a accompli depuis la dernière réunion, ce qu'il prévoit de faire ensuite et s'il rencontre des obstacles ou des problèmes.

### Sprints

Nous organisons notre travail en sprints, des itérations de développement de courte durée. Nos sprints ont une durée d'une semaine, ce qui nous permet de livrer des fonctionnalités de manière itérative et fréquente. Avant le début de chaque sprint, nous organisons une réunion de planification pour définir les objectifs et les priorités pour cette période. Nous identifions les fonctionnalités à développer et les tâches associées, en les ajoutant à notre backlog. (Sur le papier en tout cas, dans les faits le premier sprint planning a été fait pendant le premier sprint, et le second comportait tout le reste).

### Utilisation de GitHub

Nous utilisons GitHub pour gérer notre projet. Nous créons des tickets pour chaque fonctionnalité, amélioration ou bug à résoudre, et nous les ajoutons à notre tableau de bord GitHub. Cela nous permet de suivre l'état des tâches, de les attribuer aux membres de l'équipe et de collaborer efficacement. Nous utilisons également les fonctionnalités de branche et de pull request de GitHub pour permettre une revue de code par les pairs avant de fusionner les modifications dans la branche principale.

### Revue de code par les pairs

Pour maintenir la qualité du code, nous pratiquons la revue de code par les pairs. Avant de fusionner une branche de fonctionnalité ou de correction de bug, un autre membre de l'équipe effectue une revue approfondie du code. Cela nous permet de détecter les erreurs, d'identifier les améliorations potentielles et de garantir une cohérence dans notre codebase.

Nous effectuons également des tests fonctionnels en lançant l'application en local pour vérifier que les nouvelles fonctionnalités fonctionnent correctement et n'entraînent pas de régressions.

## Comment démarrer le projet

### Développement local

Pour démarrer le projet en local, suivez ces étapes :

1. Exécutez `npm install` pour installer les dépendances nécessaires.
2. Exécutez `npm run dev` pour démarrer le serveur de développement.
3. Ouvrez votre navigateur et accédez à `localhost:3000` pour utiliser l'application.

### Production

Nous n'avons pas de déploiement en production pour FnucReact pour le moment. Le service d'hébergement gratuit GitHub Pages ne prend pas en charge l'hébergement de routeurs, uniquement les applications monopages. Et ne n'étions pas résolut à prendre une solution payante.

## Dépôt GitHub

Vous pouvez trouver le code source de FnucReact sur GitHub dans le dépôt suivant : [FnucReact GitHub Repository](https://github.com/Bastien56580/FnucReact)

## Technologies utilisées

FnucReact est construit en utilisant les technologies suivantes :

- React : Une bibliothèque JavaScript populaire pour la création d'interfaces utilisateur. React utilise un modèle de composants réutilisables, ce qui facilite la construction d'interfaces modulaires et évolutives.

- JavaScript : Le langage de programmation principal utilisé pour le développement. JavaScript est un langage polyvalent qui nous permet de créer des fonctionnalités dynamiques et interactives.

- Axios : Une bibliothèque JavaScript utilisée pour effectuer des requêtes HTTP. Axios simplifie la communication avec les serveurs en fournissant une API simple et intuitive pour l'envoi et la réception de données.

- Plotly : Une bibliothèque JavaScript de création de graphiques interactifs et de visualisations. Plotly offre une large gamme de types de graphiques et de fonctionnalités d'interaction, ce qui nous permet de visualiser les données de manière convaincante.

- react-hot-toast : Une bibliothèque légère de notifications toast pour React. Elle facilite l'affichage de notifications élégantes et réactives à l'utilisateur, ce qui améliore l'expérience utilisateur.

- Bootstrap 5 : Un framework CSS pour la création de sites web adaptatifs. Bootstrap offre une collection de composants et d'utilitaires prêts à l'emploi, ce qui accélère le processus de développement et garantit une interface cohérente et réactive.

- Mock en JSON (fait main) : Utilisé pour les données simulées. Nous utilisons des fichiers JSON pour simuler des données et tester nos fonctionnalités sans dépendre d'un backend complet.

## Fonctionnalité clés

- Authentification, admin ou user.
- Page d'acceuil avec recherche par topic (rayon)
- Recherche via mot clé
- Profile de l'utilisateur
- Détail d'un ouvrage et formulaire de commande
- Page de paramètre
  - changement de back (mongo, sql)
  - activation/désactivations des mocks
- Menu d'adminisatration
  - Liste clients
    - Ajout / Suppression / Edition
  - Liste livres
    - Ajout / Suppression / Edition
  - Indexation
