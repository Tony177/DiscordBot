// Required module
const Discord = require("discord.js");
const fs = require("fs");
const ytdl = require("ytdl-core");
const { prefix, token, music } = require("./config.json");


// Create a new Discord client and use the config
const client = new Discord.Client();

// Login to Discord with your app's token
client.login(token);

// When the client is ready, print on console
// This event will only trigger one time after logging in
client.once("ready", () => {
	console.log("-- Bot Started --");
});

// Ready to log any message and author, ON instead of ONCE to do it always
client.on('message', message => {
	if (!message.author.bot)
		console.log(message.author.username + ': ' + message.content);
});

client.on("message", async (message) => {
	// Those commands only works in guilds and with the right sintax, exting from the function otherwise
	if (!message.guild || !message.content.startsWith(prefix)) return 0;

	if (message.content == prefix + "list") {
		const list = fs.readdirSync(music);
		let reply = "";
		for (let index = 0; index < list.length; index++) {
			reply += index + 1 + ". " + list[index].slice(0, -4) + "\n";
		}
		message.channel.send(reply);
	}

	const command = message.content.slice(prefix.length).trim().split(/(\s+)/);
	try {
		switch (command[0]) {
			case "play":
				//Cutting the prefix and the keyword "play" from the initial message
				const argoment = command[2].toLowerCase();

				//Joining voice channel and setup the dispatcher as MP3 Audio
				message.member.voice.channel.join().then((connection) => {
					const dispatcher = connection.play(`${music + argoment}.mp3`);
					feedback(dispatcher, argoment);
				});
				break;

			case "yt":
				message.member.voice.channel.join().then((connection) => {
					//Joining voice channel and setup the dispatcher as Youtube Audio
					const stream = ytdl(command[2], {
						filter: "audioonly",
						quality: "highestaudio",
						highWaterMark: 1 << 15,
						dlChunkSize: 0,
					});
					const dispatcher = connection.play(stream);
					feedback(dispatcher, command[2]);
				});
				break;

			case "stop":
				message.guild.me.voice.channel.leave();
				break;

			default:
				message.channel.send(`${command[0]} non corrisponde a nessun comando!`);
				break;
		}
	} catch (error) {
		//Catch async function error
		console.error(error);
	}

});

function feedback(dis, mus) {
	//Console feedback on start and stop
	dis.on("start", () => {
		console.log(`${mus} is now playing!`);
	});
	dis.on("finish", () => {
		console.log(`${mus} has finished playing!`);
	});

	// Error Handling
	dis.on("error", console.error);
	process.on("unhandledRejection", (error) => console.error("Uncaught Promise Rejection", error)
	);
}