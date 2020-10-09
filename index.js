// Required module
const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token, music } = require('./config.json');
const list=fs.readdirSync(music);

// Create a new Discord client and use the config
const client = new Discord.Client();



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
		// Those commands only works in guilds and with the right sintax, exting from the function otherwise
		if (!message.guild || !message.content.includes(prefix)) return;

		//List every mp3 avaible
		if(message.content == (prefix + 'list'))
		{
			let reply = "";

			for (let index = 0; index < list.length; index++) {
				reply += (index+1) + '. ' + list[index].slice(0,-4) + '\n';
			}

			message.channel.send(reply);
		}

		//Stop last song
		if(message.content == (prefix + 'stop'))
			(await connection).disconnect();
		
		 // Only try to join the sender's voice channel if they are in one themselves
		 if (message.member.voice.channel && message.content.includes(prefix + 'play')) {
		try{
				
			//Cutting the prefix and the keyword "play" from the initial message
			const argoment = message.content.slice(prefix.length+4).trim().split(/ +/);
			const command = argoment.shift().toLowerCase();

			//Joining voice channel and waiting for the command 
			const connection=message.member.voice.channel.join();
			const dispatcher = (await connection).play(`${music + command}.mp3`);

			//Console feedback on start and stop
			dispatcher.on('start', () => {
			console.log(command + ' is now playing!');
			});
			dispatcher.on('finish', () => {
			console.log(command +' has finished playing!');
			});

			// Error Handling
			dispatcher.on('error', console.error);

		} catch(error){
				//Catch async function
			console.error(error);
			}} 
	});

