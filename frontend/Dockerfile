FROM node:18.19.0-alpine

WORKDIR /app

# Copiamos los archivos y dependencias
COPY package*.json ./
RUN npm install

COPY . .

# Exponemos el puerto usado por `ng serve`
EXPOSE 4200

# Iniciamos la app Angular en modo dev
CMD ["npm", "run", "start:docker"]


