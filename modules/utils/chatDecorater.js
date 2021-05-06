module.exports = {
    spoiler: text => `||${text.toString()}||`,
    quote: text => `\`${text.toString()}\``,
    strong: text => `**${text.toString()}**`,
    underline: text => `__${text.toString()}__`,
    codeblock: (text, lang = '') => `\`\`\`${lang}\n${text}\n\`\`\``,
}
