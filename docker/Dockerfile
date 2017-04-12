FROM node:7.8.0

RUN mkdir /src

RUN npm install nodemon gulp -g

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

WORKDIR /src

RUN yarn install

EXPOSE 3000

CMD yarn start