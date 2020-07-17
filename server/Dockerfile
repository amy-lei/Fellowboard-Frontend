FROM node
WORKDIR /app
COPY package-lock.json /app
COPY package.json /app
RUN npm install
COPY . .
CMD ["node", "server.js"]