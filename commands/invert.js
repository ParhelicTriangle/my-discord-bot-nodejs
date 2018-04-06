const download = require('image-downloader')
const Jimp = require("jimp")
exports.run = (client, message, args) => {

var lastimage = ""
	//Save Uploaded Images to Drive
	var images = message.attachments.array();
	for (var i = 0; i <images.length; i++){
		console.log(images[i].url)
		lastimage = images[i].url;
	}
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
					var embed = new Discord.RichEmbed().attachFile(filename).setDescription("Inverted bois")
					message.channel.send({
						embed
					})
				}
				setTimeout(waitaBit, 1500)

			}).catch((err) => {
				throw err
			})
}
