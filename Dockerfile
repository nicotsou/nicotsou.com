# Production build and serve
FROM node:16
WORKDIR '/app'
COPY package.json yarn.lock .
RUN yarn --pure-lockfile
COPY . .
RUN yarn build
CMD ["yarn", "serve"]
EXPOSE 9000
