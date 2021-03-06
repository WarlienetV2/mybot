import { LanguageKeys } from '#lib/i18n/languageKeys';
import { SkyraCommand } from '#lib/structures';
import type { GuildMessage } from '#lib/types';
import { announcementCheck } from '#utils/util';
import { ApplyOptions } from '@sapphire/decorators';
import { CommandOptionsRunTypeEnum } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import { PermissionFlagsBits } from 'discord-api-types/v9';

@ApplyOptions<SkyraCommand.Options>({
	description: LanguageKeys.Commands.Announcement.UnsubscribeDescription,
	detailedDescription: LanguageKeys.Commands.Announcement.UnsubscribeExtended,
	requiredClientPermissions: [PermissionFlagsBits.ManageRoles],
	runIn: [CommandOptionsRunTypeEnum.GuildAny]
})
export class UserCommand extends SkyraCommand {
	public async messageRun(message: GuildMessage, args: SkyraCommand.Args) {
		const role = await announcementCheck(message);
		await message.member.roles.remove(role);
		return send(message, args.t(LanguageKeys.Commands.Announcement.UnsubscribeSuccess, { role: role.name }));
	}
}
