exports.run = async (client, msg, [input]) => {
  let number;
  let num;
  let query;

  if (input) {
    if (!isNaN(parseInt(input))) num = input;
    else if (typeof input === "string") query = input;
    else return msg.send("Invalid input.");
  }

  try {
    const xkcdInfo = await client.wrappers.requestJSON("http://xkcd.com/info.0.json");
    if (num) {
      if (num <= xkcdInfo.num) number = num;
      else return msg.send(`Dear ${msg.author}, there are only ${xkcdInfo.num} comics.`);
    } else if (query) {
      const searchQuery = await client.wrappers.requestJSON(`https://relevantxkcd.appspot.com/process?action=xkcd&query=${query}`);
      number = searchQuery.split(" ")[2].replace("\n", "");
    } else { number = Math.floor(Math.random() * (xkcdInfo.num - 1)) + 1; }

    const xkcdComic = await client.wrappers.requestJSON(`http://xkcd.com/${number}/info.0.json`);

    const embed = new client.methods.Embed()
      .setColor(msg.color)
      .setImage(xkcdComic.img)
      .setFooter(`XKCD | ${xkcdComic.num}`)
      .setDescription(xkcdComic.alt)
      .setTimestamp();
    await msg.sendEmbed(embed);
    // FOR WHEN I GET AN HOST
    // msg.channel.sendFile(xkcdComic.img, undefined, xkcdComic.alt);
  } catch (e) {
    return msg.send(`Not found: XKCD | ${number}`);
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  spam: false,
  mode: 1,
  cooldown: 10,
};

exports.help = {
  name: "xkcd",
  description: "Read comics from XKCD",
  usage: "[number:int|query:str]",
  usageDelim: "",
  extendedHelp: [
    "Should I wash the dishes? Or should I throw the dishes throught the window?",
    "",
    "Usage:",
    "&rng <text1>, <text2>, ...",
    "",
    "Examples:",
    "&rng Should Wash the dishes, Throw the dishes throught the window",
    "❯❯ \" Throw the dishes throught the window \" (random)",
  ].join("\n"),
};
