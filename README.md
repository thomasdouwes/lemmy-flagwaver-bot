# lemmy-flagwaver-bot

A lemmy bot to wave flags

This project uses the [lemmy-bot](https://github.com/SleeplessOne1917/lemmy-bot) library

# How to use
##NOTE
There is a bug in the bot library used that seems to appear in lemmy version 0.17.2 and maybe 0.17.3. Make sure the instance you are using is running 0.17.4 or newer or the bot will reply in every community
 
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
