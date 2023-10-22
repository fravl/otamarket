FROM node:18.10-alpine3.15

WORKDIR /frontend
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json package.json

RUN npm i

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "start"]