FROM node:22-alpine

WORKDIR /app

COPY . .

EXPOSE 5173

RUN  chmod +x setup.sh


CMD ["sh", "setup.sh"]