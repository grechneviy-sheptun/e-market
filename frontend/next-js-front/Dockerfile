FROM node:18.19.1-alpine

WORKDIR /frontedApp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
