const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');

// pull credentials from .env
const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;

// Instantiate a new client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('OK BRA BREADY TO GO!');
});

// find files that contain .js commands.
const commandFiles = fs
  .readdirSync('./src/commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  } else if (commandName === 'user') {
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  }
});

client.login(token);
