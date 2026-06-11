require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    PermissionsBitField,
    ChannelType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const MOD_ROLE_ID = 1513678991784153229;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once("ready", () => {
    console.log(`${client.user.tag} aktif!`);
});

client.on("messageCreate", async message => {

    console.log("Mesaj geldi:", message.content);

    if (message.author.bot) return;

    if (message.author.bot) return;

    if (message.content === "ping") {
        await message.reply("Pong!");
    }

    if (message.content === "!ticket") {
    try {

        const kanal = await message.guild.channels.create({
            name: `ticket-${message.author.username}`,
            type: ChannelType.GuildText,
permissionOverwrites: [
  {
    id: message.guild.id,
    deny: [PermissionsBitField.Flags.ViewChannel],
  },
  {
    id: message.author.id,
    allow: [
      PermissionsBitField.Flags.ViewChannel,
      PermissionsBitField.Flags.SendMessages,
    ],
  }, 
],
        });

await kanal.send(`${message.author} destek talebi oluşturdu.`);
console.log("Ticket açıldı");
console.log("Ticket komutu çalıştı");

} catch (err) {
    console.error("Ticket hatası:", err);
}
}
});
client.on("guildMemberAdd", async (member) => {
    console.log(member.user.tag + " sunucuya katıldı");

    const rol = member.guild.roles.cache.find(
        r => r.name === "Üye"
    );

    if (!rol) {
        console.log("Üye rolü bulunamadı!");
        return;
    }

    try {
        await member.roles.add(rol);
        console.log("Rol verildi!");
    } catch (err) {
        console.error("Rol verme hatası:", err);
    }
});
client.login(process.env.TOKEN);