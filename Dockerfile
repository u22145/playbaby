FROM node:lts
WORKDIR /app
ARG env=dev
EXPOSE 3000
COPY . .
RUN npm install; npm run build:${env}
CMD ["npm", "run", "start"]
