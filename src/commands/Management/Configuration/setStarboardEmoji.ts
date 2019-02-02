import { CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import { SkyraCommand } from '../../../lib/structures/SkyraCommand';
import { resolveEmoji } from '../../../lib/util/util';

export default class extends SkyraCommand {

	public constructor(client: KlasaClient, store: CommandStore, file: string[], directory: string) {
		super(client, store, file, directory, {
			bucket: 2,
			cooldown: 10,
			description: (language) => language.get('COMMAND_SETSTARBOARDEMOJI_DESCRIPTION'),
			extendedHelp: (language) => language.get('COMMAND_SETSTARBOARDEMOJI_EXTENDED'),
			permissionLevel: 6,
			runIn: ['text'],
			usage: '<Emoji:emoji>'
		});

		this.createCustomResolver('emoji', async(arg, possible, msg) => {
			const resolved = resolveEmoji(arg);
			if (resolved) return resolved;
			throw msg.language.get('RESOLVER_INVALID_EMOJI', possible.name);
		});
	}

	public async run(message: KlasaMessage, [emoji]: [string]) {
		if (message.guild.settings.get('starboard.emoji') === emoji) throw message.language.get('CONFIGURATION_EQUALS');
		await message.guild.settings.update('starboard.emoji', emoji);
		return message.sendLocale('COMMAND_SETSTARBOARDEMOJI_SET', [emoji.includes(':') ? `<${emoji}>` : emoji]);
	}

}
