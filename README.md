# F4B_health_check

Bienvenue dans le projet **F4B_health_check** ! Ce microservice est conçu pour assurer le **health check** du funnel de conversion. Voici toutes les informations dont vous avez besoin pour lancer et développer ce projet.

---

## Table des matières

- [Description](#description)
- [Architecture-du-projet](#architecture-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
  - [Build](#build)
  - [Développement](#développement)
  - [Déploiement](#déploiement)
    - [Déploiement sur Heroku](#déploiement-sur-heroku)
- [Contribuer](#contribuer)
- [Licence](#licence)
- [Auteur](#auteur)

---

## Description

**F4B_health_check** est un microservice dédié au suivi de la santé (health check) du funnel de conversion. Le projet a été conçu pour être léger, modulaire et facilement déployable en production.

---

## Architecture-du-projet

Le projet est organisé en deux workspaces grâce à Yarn :

- **front** : Contient l'interface utilisateur ou le front-end.
- **back** : Gère le back-end, les services et la logique métier.

Les deux parties sont liées pour offrir une solution complète de monitoring et de gestion du funnel de conversion.

---

## Prérequis

Avant de lancer ce projet, assurez-vous d'avoir installé :

- **Node.js** (version LTS recommandée)
- **Yarn** (gestionnaire de paquets)
- **PM2** (pour la gestion des processus en production)

---

## Installation

1. **Cloner le dépôt :**

   ```bash
   git clone <URL_DU_REPO>
   cd F4B_health_check
Installer les dépendances :

bash
Copier
yarn install
Le projet est divisé en deux dossiers principaux, front et back, chacun contenant son propre code source et ses fichiers de configuration.

La structure du projet ressemble à :

plaintext
Copier
├── Procfile
├── README.md
├── back
│   ├── README.md
│   ├── before-wait.png
│   ├── debug.png
│   ├── dist
│   ├── eslint.config.mjs
│   ├── nest-cli.json
│   ├── package.json
│   ├── public
│   ├── src
│   ├── test
│   ├── tsconfig.build.json
│   ├── tsconfig.json
│   └── yarn.lock
├── desktop.ini
├── ecosystem.config.js
├── front
│   ├── README.md
│   ├── dist
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── public
│   ├── src
│   ├── vite.config.js
│   └── yarn.lock
├── package.json
└── yarn.lock
Utilisation
Build
Pour compiler le projet, utilisez la commande suivante :

bash
Copier
yarn build
Ce script effectue les opérations suivantes :

Lance la compilation du front-end avec yarn workspace front build.
Lance la compilation du back-end avec yarn workspace back build.
Crée le dossier back/public (si nécessaire) et copie le contenu compilé du front-end dans ce dossier.
Développement
Pour lancer le projet en mode développement (avec démarrage simultané du front-end et du back-end), utilisez :

bash
Copier
yarn dev
Ce script utilise concurrently pour exécuter simultanément :

Le serveur back-end en mode développement.
Le serveur front-end en mode développement.
Déploiement
Pour démarrer l'application en production, utilisez PM2 avec la configuration spécifiée dans ecosystem.config.js :

bash
Copier
yarn start
En production, le script démarre le service avec PM2 via pm2-runtime et charge la configuration de l'environnement de production.

Déploiement sur Heroku
Le script heroku-postbuild est configuré pour se lancer automatiquement après l'installation des dépendances sur Heroku :

bash
Copier
yarn heroku-postbuild
Cela permet de préparer l'application pour le déploiement sur la plateforme Heroku.

Contribuer
Vous souhaitez améliorer le projet ou corriger des bugs ? Vos contributions sont les bienvenues ! Suivez ces étapes pour contribuer :

Lancer et tester l'application :

Démarrer l'application avec PM2 :

bash
Copier
pm2 start ecosystem.config.js
Accéder à l'API Swagger du back-end : http://localhost:7410/api

Accéder au front-end F4B button : http://localhost:5173/

Pour arrêter tous les processus (en production ou en développement sur localhost) :

bash
Copier
pm2 stop all
Forker le dépôt.

Créer une branche pour votre fonctionnalité ou correction :

bash
Copier
git checkout -b feature/ma-nouvelle-fonctionnalite
Committer vos modifications :

bash
Copier
git commit -m 'Ajout d'une nouvelle fonctionnalité'
Pousser votre branche :

bash
Copier
git push origin feature/ma-nouvelle-fonctionnalite
Ouvrir une Pull Request.

