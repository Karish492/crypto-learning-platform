FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
