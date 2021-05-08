FROM node:15
RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn --pure-lockfile
COPY /src /app/src/
COPY /static /app/static/
COPY /content /app/content/
COPY gatsby-browser.js gatsby-node.js gatsby-config.js gatsby-ssr.js /app/
RUN yarn build
CMD ["yarn", "serve"]
EXPOSE 9000