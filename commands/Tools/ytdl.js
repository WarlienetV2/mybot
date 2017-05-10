const fs = require("fs-extra-promise");
const { sep } = require("path");

/* eslint-disable no-useless-escape, no-throw-literal */
exports.run = async (client, msg, [input]) => {
  const cfg = client.constants.config;
  const res = await client.wrappers.requestJSON(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(input)}&key=${cfg.GoogleAPIKey}`);
  const result = res.items[0];
  if (!result) throw client.constants.httpResponses(404);
  const url = result.id.kind === "youtube#channel" ? `https://youtube.com/channel/${result.id.channelId}` : `https://youtu.be/${result.id.videoId}`;
  const dir = `${client.clientBaseDir}downloads${sep}`;

  const info = await client.ytdl.getInfo(url);
  const filename = `${info.title.replace(/[^a-zA-Z0-9\[\]()\-\. ]/g, "").replace(/[ ]{2}/g, " ")}`;
  const files = await fs.readdirAsync(dir).catch(() => fs.ensureDirAsync(dir));
  if (files.includes(`${filename}.mp3`)) throw "This song was already downloaded.";
  await msg.send(`Downloading \`${filename}\``);
  await client.ytdl.download(url, "webm", dir, `${filename}.webm`);
  await msg.send("🗄 | Downloaded.");
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
  spam: false,
  mode: 1,
};

exports.help = {
  name: "ytdl",
  description: "Search something throught YouTube.",
  usage: "<query:str>",
  usageDelim: "",
  extendedHelp: [
    "Let's search some videos :p",
    "",
    "Usage:",
    "&youtube <query>",
    "",
    " ❯ Query: Search videos with keywords.",
    "",
    "Examples:",
    "&youtube Arc North - Never Gonna",
  ].join("\n"),
};
