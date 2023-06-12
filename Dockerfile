FROM node:18-alpine3.16
WORKDIR /app
COPY src/ ./src
COPY public/ ./public
COPY index.html ./index.html
COPY package.json ./package.json
COPY vite.config.js ./vite.config.js
RUN npm install
CMD ["npm", "run", "docker"]
EXPOSE 3000