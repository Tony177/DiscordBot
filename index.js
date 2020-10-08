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
	console.log(message.author.username + ': ' + message.content);
});


	client.on('message', async message => {
		// Voice only works in guilds and with the right sintax, exting from the function otherwise
		if (!message.guild || !message.content.includes(prefix + 'play')) return;

		//Cutting the prefix and the keyword "play" from the initial message
		const argoment = message.content.slice(prefix.length+4).trim().split(/ +/);
		const command = argoment.shift().toLowerCase();
		console.log(command+'\n');
		 {
		  // Only try to join the sender's voice channel if they are in one themselves
		  if (message.member.voice.channel) {
			try{
				//Joining voice channel and waiting for the command 
				const connection=message.member.voice.channel.join();
				const dispatcher = (await connection).play(command + '.mp3');

						//Console feedback on start and stop
				dispatcher.on('start', () => {
				console.log(command + ' is now playing!');

				});
				if(message.content === '${prefix}stop')
					(await connection).disconnect();
					
				dispatcher.on('finish', () => {
				console.log(command +' has finished playing!');

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