import { LanguageKeys } from '#lib/i18n/languageKeys';
import type { GuildTextBasedChannelTypes, TextBasedChannelTypes, VoiceBasedChannelTypes } from '@sapphire/discord.js-utilities';
import { UserError } from '@sapphire/framework';
import { isNullish, Nullish } from '@sapphire/utilities';
import type { Message, ThreadChannel } from 'discord.js';

/**
 * Asserts a text-based channel is not a thread channel.
 * @param channel The channel to assert.
 * @returns The thread channel.
 */
export function assertNonThread<T extends TextBasedChannelTypes>(channel: T): Exclude<T, ThreadChannel> {
	if (channel.isThread()) {
		throw new UserError({ identifier: LanguageKeys.Assertions.ExpectedNonThreadChannel, context: { channel: channel.toString() } });
	}

	return channel as Exclude<T, ThreadChannel>;
}

export function getListeners(channel: VoiceBasedChannelTypes | Nullish): string[] {
	if (isNullish(channel)) return [];

	const members: string[] = [];
	for (const [id, member] of channel.members.entries()) {
		if (member.user.bot || member.voice.deaf) continue;
		members.push(id);
	}

	return members;
}

export function getListenerCount(channel: VoiceBasedChannelTypes | Nullish): number {
	if (isNullish(channel)) return 0;

	let count = 0;
	for (const member of channel.members.values()) {
		if (!member.user.bot && !member.voice.deaf) ++count;
	}

	return count;
}

export interface SnipedMessage {
	message: Message;
	timeout: NodeJS.Timeout;
}

const snipedMessages = new WeakMap<GuildTextBasedChannelTypes, SnipedMessage>();
export function getSnipedMessage(channel: GuildTextBasedChannelTypes): Message | null {
	const current = snipedMessages.get(channel);
	return current?.message ?? null;
}

export function setSnipedMessage(channel: GuildTextBasedChannelTypes, value: Message | null) {
	const previous = snipedMessages.get(channel);
	if (typeof previous !== 'undefined') clearTimeout(previous.timeout);

	if (value === null) {
		snipedMessages.delete(channel);
	} else {
		const next: SnipedMessage = {
			message: value,
			timeout: setTimeout(() => snipedMessages.delete(channel), 15000).unref()
		};
		snipedMessages.set(channel, next);
	}
}
