# lemmy-flagwaver-bot

A lemmy bot to wave flags

This project uses the [lemmy-bot](https://github.com/SleeplessOne1917/lemmy-bot) library

This repo is push mirrored to github from [forgejo.douwes.co.uk/thomas/lemmy-flagwaver-bot](https://forgejo.douwes.co.uk/thomas/lemmy-flagwaver-bot)

# How to use
## docker install
make base directory for bot:  
```
mkdir lemmy-flagwaver-bot
cd lemmy-flagwaver-bot
``` 

Clone repo:  
```
git clone https://forgejo.douwes.co.uk/thomas/lemmy-flagwaver-bot.git
```

copy docker-compose.yml and .env to directory:  
```
cp lemmy-flagwaver-bot/docker-compose.yml .
cp lemmy-flagwaver-bot/.env.example .env
```  

change the variables in .env to the ones for your bot user.  

Build docker image:  
```
docker build lemmy-flagwaver-bot -t thomas/lemmy-flagwaver-bot
```

Make data directory:  
```
mkdir data
```

Run:  
```
docker-compose up -d
```

The configuration of what communities to use is a little more complex, You need to edit the federation section in bot.ts

## manual install (not working right now)
enter project dir.

install NPM dependencies:
```
npm install
```

copy .env.example to .env  
```
cp .env.example .env
```

change the variables in .env to the ones for your bot user.

The configuration of what communities to use is a little more complex, You need to edit the federation section in bot.ts

run:  
```
npm start
```
