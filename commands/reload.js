exports.run = (client, message, args, lastimage) => {
	if(!args || args.size < 1) return message.reply("List the command you want to reload");
	delete require.cache[require.resolve(`./${args[0]}.js`)];
	message.reply(`${args[0]} has been reloaded`);
};
