const download = require('image-downloader')
const Jimp = require("jimp")
const Discord = require("discord.js")
exports.run = (client, message, args, lastimage) => {

			message.channel.send("Inverting...")
			download.image({
				url: lastimage,
				dest: 'images'
			}).then(({
				filename,
				image
			}) => {
				console.log('File saved to', filename)

				//Modify Image
				Jimp.read(filename, function modify(err,please){
					if(err) throw err;
					please.resize(Jimp.AUTO, 500)
					.invert()
					.write(filename); //save
				});

				function waitaBit(){
					//var embed = new Discord.MessageEmbed().attachFiles(filename).setDescription("Inverted bois");
					//message.channel.send({embed})
					message.channel.send({files: [filename]});
				}
				setTimeout(waitaBit, 1500)

			}).catch((err) => {
				throw err;
			})
}
