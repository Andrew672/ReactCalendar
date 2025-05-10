FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production

CMD ["npm", "start"]
