const {
EmbedParser,
ComponentParser,
FileParser
} = require("../../../handler/parsers.js")
module.exports = async d => {
    const {code} = d.command;
    const inside = d.unpack();
    const err = d.inside(inside);
    if (err) return d.error(err);
    embeds = await EmbedParser(embeds)
    components = await ComponentParser(components, d.client)
    files = await FileParser(files)
    let [channelId, content = "", embeds = "", components = "", files = "", allowedMentions = "", returnId = "no"] = inside.splits;

    const channel = await d.util.getChannel(d, channelId);
    if (!channel) return d.aoiError.fnError(d, "channel", {inside});

    message = await d.util.errorParser(message, d);

    const msg = await d.aoiError.makeMessageError(d.client, channel, message, message.options, d);


    const result = (returnId === "yes" ? msg?.id : "") || "";

    return {
        code: d.util.setCode({function: d.func, code, inside, result})
    }
}
