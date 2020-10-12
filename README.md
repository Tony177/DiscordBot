# Discord bot

## Introduction

Simple discord bot based on [discord.js](https://github.com/discordjs/discord.js)
capable of reproduce audio and track message.  
Change the TOKEN in config.json before running it, you can find it on your
Discord Bot Info page.  
EVERY command need to be preceded with the prefix and needs to have one blank
space after, i.e. !play audio1

## Streaming Audio

"audio1.mp3" and "audio2.mp3" are intended as a generic audio you want to run,
in order to play them you have to use the keyword "play".  
You can list every audio located in the directory
"Music" using the keyword "list".  
You can even play any audio from youtube with the command
"yt" followed by the url.  
You can stop any audio in any moment using the keyword "stop".

## JSON Config Description

Prefix: the prefix is used to trigger every command,
can be composed by multiple characters.  
**Token:** It's the token of your bot found on the bot page of discord.  
**Music:** It's the directory containing all the audio.
