FROM debian:bullseye

WORKDIR /app

RUN apt update && apt install npm -y

COPY *.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]