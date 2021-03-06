import { Serializer, SerializerUpdateContext, TriggerIncludes } from '#lib/database';
import { LanguageKeys } from '#lib/i18n/languageKeys';
import { getEmojiString } from '#utils/functions';
import { Awaitable, isObject } from '@sapphire/utilities';

export class UserSerializer extends Serializer<TriggerIncludes> {
	public async parse(args: Serializer.Args, { t }: SerializerUpdateContext) {
		const action = await args.pickResult('string');
		if (!action.success) return this.errorFromArgument(args, action.error);
		if (action.value !== 'react') return this.error(t(LanguageKeys.Serializers.TriggerIncludeInvalidAction));

		const input = await args.pickResult('string');
		if (!input.success) return this.errorFromArgument(args, input.error);

		const output = await args.pickResult('emoji');
		if (!output.success) return this.errorFromArgument(args, output.error);

		return this.ok({ action: action.value as 'react', input: input.value, output: getEmojiString(output.value) });
	}

	public isValid(data: TriggerIncludes, { t }: SerializerUpdateContext): Awaitable<boolean> {
		if (
			isObject(data) &&
			Object.keys(data).length === 3 &&
			data.action === 'react' &&
			typeof data.input === 'string' &&
			typeof data.output === 'string'
		)
			return true;

		throw t(LanguageKeys.Serializers.TriggerIncludeInvalid);
	}

	public equals(left: TriggerIncludes, right: TriggerIncludes): boolean {
		return left.input === right.input;
	}

	public stringify(value: TriggerIncludes) {
		return `[${value.action} | ${value.input} -> ${value.output}]`;
	}
}
