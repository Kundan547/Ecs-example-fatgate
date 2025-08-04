# Use Node.js Alpine
FROM node:18-alpine

WORKDIR /app

# Copy package.json only
COPY package.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
