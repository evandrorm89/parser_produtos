FROM node:18

ARG BUILD_ENV=production

WORKDIR /app

COPY package*.json ./

RUN if [ "$BUILD_ENV" = "development" ]; then npm install; else npm install --production; fi

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
