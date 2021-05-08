# Production build and serve
FROM node:15
WORKDIR '/app'
COPY package.json yarn.lock .
RUN yarn --pure-lockfile
COPY . .
RUN yarn build
CMD ["yarn", "serve"]
EXPOSE 9000
