import { LanguageKeys } from '#lib/i18n/languageKeys';
import { WeebCommand } from '#lib/structures/commands/WeebCommand';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<WeebCommand.Options>({
	description: LanguageKeys.Commands.Weeb.GreetDescription,
	extendedHelp: LanguageKeys.Commands.Weeb.GreetExtended,
	queryType: 'greet',
	responseName: LanguageKeys.Commands.Weeb.Greet,
	usage: '<user:username>'
})
export default class extends WeebCommand {}
