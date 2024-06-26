FROM node:20
WORKDIR /app
COPY . .
EXPOSE 3000
RUN npm install
CMD ["node", "index.js"]