import { FT, T } from '#lib/types';

export const InvalidBool = FT<{ value: string }, string>('serializers:invalidBool');
export const InvalidChannel = FT<{ value: string }, string>('serializers:invalidChannel');
export const InvalidCommand = FT<{ name: string }, string>('serializers:invalidCommand');
export const InvalidEmoji = FT<{ name: string }, string>('serializers:invalidEmoji');
export const InvalidFloat = FT<{ value: string }, string>('serializers:invalidFloat');
export const InvalidGuild = FT<{ name: string }, string>('serializers:invalidGuild');
export const InvalidInt = FT<{ value: string }, string>('serializers:invalidInt');
export const InvalidInvite = FT<{ name: string }, string>('serializers:invalidInvite');
export const InvalidRole = FT<{ value: string }, string>('serializers:invalidRole');
export const InvalidSnowflake = FT<{ name: string }, string>('serializers:invalidSnowflake');
export const InvalidUrl = FT<{ value: string }, string>('serializers:invalidUrl');
export const InvalidUser = FT<{ value: string }, string>('serializers:invalidUser');
export const MinMaxBothExclusive = FT<{ name: string; min: number; max: number }, string>('serializers:minMaxBothExclusive');
export const MinMaxBothInclusive = FT<{ name: string; min: number; max: number }, string>('serializers:minMaxBothInclusive');
export const MinMaxExactlyExclusive = FT<{ name: string; min: number }, string>('serializers:minMaxExactlyExclusive');
export const MinMaxExactlyInclusive = FT<{ name: string; min: number }, string>('serializers:minMaxExactlyInclusive');
export const MinMaxMaxExclusive = FT<{ name: string; max: number }, string>('serializers:minMaxMaxExclusive');
export const MinMaxMaxInclusive = FT<{ name: string; max: number }, string>('serializers:minMaxMaxInclusive');
export const MinMaxMinExclusive = FT<{ name: string; min: number }, string>('serializers:minMaxMinExclusive');
export const MinMaxMinInclusive = FT<{ name: string; min: number }, string>('serializers:minMaxMinInclusive');
export const PermissionNodeDuplicatedCommand = FT<{ command: string }, string>('serializers:permissionNodeDuplicatedCommand');
export const PermissionNodeInvalid = T<string>('serializers:permissionNodeInvalid');
export const PermissionNodeInvalidCommand = FT<{ command: string }, string>('serializers:permissionNodeInvalidCommand');
export const PermissionNodeInvalidTarget = T<string>('serializers:permissionNodeInvalidTarget');
export const PermissionNodeSecurityEveryoneAllows = T<string>('serializers:permissionNodeSecurityEveryoneAllows');
export const PermissionNodeSecurityGuarded = FT<{ command: string }, string>('serializers:permissionNodeSecurityGuarded');
export const PermissionNodeSecurityOwner = T<string>('serializers:permissionNodeSecurityOwner');
export const ReactionRoleInvalid = T<string>('serializers:reactionRoleInvalid');
export const StickyRoleInvalid = T<string>('serializers:stickyRoleInvalid');
export const TriggerAliasInvalid = T<string>('serializers:triggerAliasInvalid');
export const TriggerIncludeInvalid = T<string>('serializers:triggerIncludeInvalid');
export const TriggerIncludeInvalidAction = T<string>('serializers:triggerIncludeInvalidAction');
export const TwitchSubscriptionInvalid = T<string>('serializers:twitchSubscriptionInvalid');
export const TwitchSubscriptionInvalidStreamer = T<string>('serializers:twitchSubscriptionInvalidStreamer');
export const UniqueRoleSetInvalid = T<string>('serializers:uniqueRoleSetInvalid');
export const UnknownChannel = T<string>('serializers:unknownChannel');
export const UnknownRole = T<string>('serializers:unknownRole');
export const UnknownUser = T<string>('serializers:unknownUser');
export const Unsupported = T<string>('serializers:unsupported');

export * as CustomCommands from './CustomCommandSerializer/All';
export * as DisabledCommandChannels from './DisabledCommandChannels/All';
