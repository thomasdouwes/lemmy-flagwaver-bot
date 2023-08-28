# lemmy-flagwaver-bot

A lemmy bot to wave flags

This project uses the [lemmy-bot](https://github.com/SleeplessOne1917/lemmy-bot) library

# How to use
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
