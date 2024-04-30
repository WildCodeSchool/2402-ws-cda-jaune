FROM node:lts-alpine
RUN mkdir /app/
WORKDIR /app/

COPY *.json ./
RUN npm i
COPY next.config.js ./
COPY public/ ./
COPY src/ src/

CMD npm run dev