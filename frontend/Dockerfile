# Étape 1 : Build Angular
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

# Installer Angular CLI globalement
RUN npm install -g @angular/cli

# Installer les dépendances du projet
RUN npm install --legacy-peer-deps

COPY . .

# Donner les permissions d'exécution à ng (juste au cas où)
RUN chmod +x ./node_modules/.bin/ng

# Compiler l'application Angular (remplace le nom du projet si besoin)
RUN ng build --configuration production --project free-version

# Étape 2 : Serveur Nginx
FROM nginx:alpine

# Supprimer les fichiers HTML par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers Angular compilés
COPY --from=build /app/dist/free-version /usr/share/nginx/html
