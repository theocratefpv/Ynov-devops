# Choisissez la version de Node.js que vous préférez
FROM node:18-alpine

# Définissez le répertoire de travail
WORKDIR /usr/src/app

# Copiez le package.json et le package-lock.json (si disponible)
COPY package*.json ./

# Installez les dépendances du projet
RUN npm install

# Copiez les sources de l'application
COPY . .

# Exposez le port sur lequel l'application s'exécute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "server.js"]
