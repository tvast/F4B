
## Configurer le Linting et le Formatage :

**ESLint** et **Prettier** sont essentiels pour maintenir un code propre.

### Installe ESLint :
```bash
npm install eslint --save-dev
```

Puis configure-le avec :
```bash
npx eslint --init
```

### Installe Prettier :
```bash
npm install --save-dev prettier
```

Pour une intégration fluide entre ESLint et Prettier, installe également :
```bash
npm install eslint-config-prettier eslint-plugin-prettier --save-dev
```

### Configure WebStorm pour utiliser ces outils :
- Ouvre les préférences de WebStorm et cherche **Code Style**. 
- Sous **JavaScript**, choisis **Prettier** pour formater automatiquement lors de l'enregistrement.
- Active **ESLint** dans les préférences pour qu'il soit utilisé lors du développement.

---

## Bibliothèques et outils recommandés :

### React Router :
Pour la gestion des routes dans ton application :
```bash
npm install react-router-dom
```

### Axios ou Fetch API :
Pour les appels HTTP :
```bash
npm install axios
```

### Redux Toolkit :
Si ton projet nécessite une gestion d'état avancée :
```bash
npm install @reduxjs/toolkit react-redux
```

### Tailwind CSS :
Pour un stylisme rapide et moderne.

Installe Tailwind via npm :
```bash
npm install -D tailwindcss
npx tailwindcss init
```

Configure Tailwind avec WebStorm pour une autocomplétion optimale.
