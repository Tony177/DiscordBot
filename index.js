// Required module
const Discord = require('discord.js');
const fs = require('fs');
const ffmpeg = require("ffmpeg");

// Create a new Discord client and use the config
const client = new Discord.Client();
const { prefix, token } = require('./config.json');


// Login to Discord with your app's token
client.login(token);

// When the client is ready, print "Ready!" on console
// This event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// Ready to log any message and author, ON instead of ONCE to do it always
client.on('message', message => {
	console.log((message.author.username).concat(':  ',message.content));

});


	client.on('message', async message => {
		// Voice only works in guilds, ignoring the message otherwise
		if (!message.guild)	return;
	  
		if (message.content === '!play') {
		  // Only try to join the sender's voice channel if they are in one themselves
		  if (message.member.voice.channel) {
			try{
				const connection=message.member.voice.channel.join();
				const dispatcher = (await connection).play('audio.mp3');

						//Console feedback on start and stop
				dispatcher.on('start', () => {
				console.log('audio.mp3 is now playing!');

				});
				if(message.content === '!stop')
					(await connection).disconnect();
					
				dispatcher.on('finish', () => {
				console.log('audio.mp3 finished playing!');

				});
				// Error Handling
				dispatcher.on('error', console.error);

		  	} catch(error){
				  //Catch async function
				console.error(error);
			  }} 
		  else {
			message.reply('You need to join a voice channel first!');
				}
		}
	});