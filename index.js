// Required module
const Discord = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');
const { prefix, token, music } = require('./config.json');



// Create a new Discord client and use the config
const client = new Discord.Client();

// Login to Discord with your app's token
client.login(token);

// When the client is ready, print on console
// This event will only trigger one time after logging in
client.once('ready', () => {
	console.log('-- Bot Started --');
});

// Ready to log any message and author, ON instead of ONCE to do it always
client.on('message', message => {
	if (!message.author.bot)
		console.log(message.author.username + ': ' + message.content);
});


client.on('message', async message => {
	// Those commands only works in guilds and with the right sintax, exting from the function otherwise
	if (!message.guild || !message.content.includes(prefix)) return;

	//List every mp3 avaible in the directory
	if (message.content == (prefix + 'list')) {
		const list = fs.readdirSync(music);
		let reply = "";
		for (let index = 0; index < list.length; index++) {
			reply += (index + 1) + '. ' + list[index].slice(0, -4) + '\n';
		}
		message.channel.send(reply);
	}

	//Stop last song
	if (message.content == (prefix + 'stop')) {
		message.guild.me.voice.channel.leave();

	}

	// Only try to join the sender's voice channel if they are in one themselves
	if (message.member.voice.channel) {


		if (message.content.includes(prefix + 'play ')) {
			try {
				//Cutting the prefix and the keyword "play" from the initial message
				const argoment = message.content.slice(prefix.length + 5).trim().split(/ +/);
				const command = argoment.shift().toLowerCase();

				//Joining voice channel and setup the dispatcher as MP3 Audio
				message.member.voice.channel.join().then(connection => {
					const dispatcher = connection.play(`${music + command}.mp3`);

					//Console feedback on start and stop
					dispatcher.on('start', () => {
						console.log(command + ' is now playing!');
					});
					dispatcher.on('finish', () => {
						console.log(command + ' has finished playing!');
					});

					// Error Handling
					dispatcher.on('error', console.error);
					process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
				});

			} catch (error) {
				//Catch async function error
				console.error(error);
			}
		} //END PLAY MP3 IF



		if (message.content.includes(prefix + 'yt ')) {
			try {
				//Cutting the prefix, the keyword "yt" and the space from the initial message
				const url = message.content.slice(prefix.length + 3).trim();

				message.member.voice.channel.join().then(connection => {
					//Joining voice channel and setup the dispatcher as Youtube Audio
					const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 15, dlChunkSize: 0 });
					const dispatcher = connection.play(stream);


					//Console feedback on start and stop
					dispatcher.on('start', () => {
						console.log(url + ' is now playing!');
					});
					dispatcher.on('finish', () => {
						console.log(url + ' has finished playing!');
					});

					// Error Handling
					dispatcher.on('error', console.error);
					process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
				});
			} catch (error) {
				//Catch async function error
				console.error(error);
			}

		} //END YOUTUBE IF

	}// END VOICE CHANNEL IF
}); //END CLIENT IF
