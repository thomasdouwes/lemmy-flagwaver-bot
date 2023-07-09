# lemmy-flagwaver-bot

A lemmy bot to wave flags

This project uses the [lemmy-bot](https://github.com/SleeplessOne1917/lemmy-bot) library

# How to use
## NOTE
Because the instance the main version of this bot is running on can't be upgraded from 0.17.4 this bot is using an old version of the lemmy-bot library. This older version requires 0.17.4 and will reply to all comments on older versions. If you are using >=0.18.0 then there is an untested 0.18.0 branch.

## docker install
Super janky right now  

enter project dir.

Build generic node runner using Dockerfile  
```
docker build . -t thomas/node-runner
```

Install NPM dependencies:  
```
docker run -it --rm --name=lemmy-flagwaver-bot -v /path/to/lemmy-flagwaver-bot:/app thomas/node-runner npm install
```

copy .env.example to .env  
```
cp .env.example .env
```

change the variables in .env to the ones for your bot user.

The configuration of what communities to use is a little more complex due to a library bug. You need to edit some variables need the top of bot.ts

run:  
```
docker run -d --name=lemmy-flagwaver-bot -v /path/to/lemmy-flagwaver-bot:/app thomas/node-runner
```

I know this is not a good way to use docker.

## manual install
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

The configuration of what communities to use is a little more complex due to a library bug. You need to edit some variables need the top of bot.ts

run:  
```
npm start
```
