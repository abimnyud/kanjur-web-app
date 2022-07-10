FROM node:16-alpine

# wait for database to be ready
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD /wait && npm run build && npm run start