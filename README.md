# Stock Yasuo
Your personal stock fund manager and advisor, powered by AI

URL: http://www.penta-code.com/tools/stockyasuo/

![stock yasuo](http://i.imgur.com/wIq6hmh.png)

# Prerequisites
PM2: `npm i pm2 -g`

# Development Setup
```
npm install
npm start
```

## Production Build
`npm run prod`

## MongoDB Server
Follow installation here: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04
then
```
sudo systemctl start mongodb
```

## Docker
`cd docker`
`docker-compose up -d`