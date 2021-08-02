import { LanguageKeys } from '#lib/i18n/languageKeys';
import type { GuildMessage } from '#lib/types/Discord';
import { createFunctionInhibitor } from '#utils/decorators';
import { isDJ } from '#utils/functions';
import { sendLocalized } from '@sapphire/plugin-i18next';

export function RequireMusicPlaying(): MethodDecorator {
	return createFunctionInhibitor(
		(message: GuildMessage) => message.guild.audio.playing,
		(message: GuildMessage) => sendLocalized(message, LanguageKeys.Preconditions.MusicNotPlaying)
	);
}

export function RequireMusicPaused(): MethodDecorator {
	return createFunctionInhibitor(
		(message: GuildMessage) => message.guild.audio.paused,
		(message: GuildMessage) => sendLocalized(message, LanguageKeys.Preconditions.MusicPaused)
	);
}

export function RequireSongPresent(): MethodDecorator {
	return createFunctionInhibitor(
		(message: GuildMessage) => message.guild.audio.getCurrentTrack().then((value) => value !== null),
		(message: GuildMessage) => sendLocalized(message, LanguageKeys.Preconditions.MusicNothingPlaying)
	);
}

export function RequireDj(): MethodDecorator {
	return createFunctionInhibitor(
		(message: GuildMessage) => isDJ(message.member),
		(message: GuildMessage) => sendLocalized(message, LanguageKeys.Preconditions.MusicDjMember)
	);
}

export function RequireQueueNotEmpty(): MethodDecorator {
	return createFunctionInhibitor(
		(message: GuildMessage) => message.guild.audio.canStart(),
		(message: GuildMessage) => sendLocalized(message, LanguageKeys.Preconditions.MusicQueueEmpty)
	);
}

export function RequireUserInVoiceChannel(): MethodDecorator {
	return createFunctionInhibitor(
		(message: GuildMessage) => message.member.voice.channel !== null,
		(message: GuildMessage) => sendLocalized(message, LanguageKeys.Preconditions.MusicUserVoiceChannel)
	);
}

export function RequireSkyraInVoiceChannel(): MethodDecorator {
	return createFunctionInhibitor(
		(message: GuildMessage) => message.guild.audio.voiceChannelId !== null,
		(message: GuildMessage) => sendLocalized(message, LanguageKeys.Preconditions.MusicBotVoiceChannel)
	);
}

export function RequireSameVoiceChannel(): MethodDecorator {
	return createFunctionInhibitor(
		(message: GuildMessage) => message.member.voice.channelId === message.guild.audio.voiceChannelId,
		(message: GuildMessage) => sendLocalized(message, LanguageKeys.Preconditions.MusicBothVoiceChannel)
	);
}