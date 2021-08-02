import { AudioCommand, RequireQueueNotEmpty } from '#lib/audio';
import { LanguageKeys } from '#lib/i18n/languageKeys';
import type { GuildMessage } from '#lib/types/Discord';
import { Events } from '#lib/types/Enums';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<AudioCommand.Options>({
	description: LanguageKeys.Commands.Music.RemoveDescription,
	extendedHelp: LanguageKeys.Commands.Music.RemoveExtended
})
export class UserMusicCommand extends AudioCommand {
	@RequireQueueNotEmpty()
	public async run(message: GuildMessage, args: AudioCommand.Args) {
		let index = await args.pick('integer', { minimum: 1 });

		// Minus one as user input is 1-based while the code is 0-based:
		--index;

		const { audio } = message.guild;
		const count = await audio.count();
		if (index >= count) {
			this.error(LanguageKeys.Commands.Music.RemoveIndexOutOfBounds, {
				songs: args.t(LanguageKeys.Commands.Music.AddPlaylistSongs, { count })
			});
		}

		// Retrieve information about the song to be removed.
		const entry = await audio.getAt(index);

		// Remove the song from the queue.
		await audio.removeAt(index);
		this.container.client.emit(Events.MusicRemoveNotify, message, entry);
	}
}