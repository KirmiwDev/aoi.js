module.exports = async (d) => {
	const data = d.util.openFunc(d);
	if (data.err) return d.error(data.err);

	const [varname, guildId = d.guild?.id, table = d.client.db.tables[0]] =
		data.inside.splits;

	if (!d.client.variableManager.cache.has(varname.addBrackets()))
		return d.aoiError.fnError(
			d,
			"custom",
			{},
			`Variable ${varname.addBrackets()} Doesn't Exist!`,
		);

	const guild = d.util.getGuild(d, guildId);
	if (!guild) return d.aoiError.fnError(d, "guild", { inside: data.inside });

	const all = await d.client.db.all(table, varname.addBrackets(), 3, [
		1,
		guildId,
	]);

	await Promise.all(all.forEach((x) => d.client.db.delete(table, x.key)));

	return {
		code: d.util.setCode(data),
	};
};
