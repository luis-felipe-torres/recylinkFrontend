# Usar la imagen oficial de Node.js como base
FROM node:16

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm ci

# Copiar el resto del código fuente de la aplicación al directorio de trabajo
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
