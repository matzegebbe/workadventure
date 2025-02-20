import { z } from "zod";
import {
    AbsoluteOrRelativeUrl,
    BoolAsString,
    emptyStringToUndefined,
    PositiveIntAsString,
    toBool,
    toNumber,
} from "@workadventure/shared-utils/src/EnvironmentVariables/EnvironmentVariableUtils";

export const EnvironmentVariables = z.object({
    PLAY_URL: z.string().url(),
    MINIMUM_DISTANCE: PositiveIntAsString.optional().transform((val) => toNumber(val, 64)),
    GROUP_RADIUS: PositiveIntAsString.optional().transform((val) => toNumber(val, 48)),
    ADMIN_API_URL: AbsoluteOrRelativeUrl.optional().transform(emptyStringToUndefined),
    ADMIN_API_TOKEN: z.string().optional().transform(emptyStringToUndefined),
    CPU_OVERHEAT_THRESHOLD: PositiveIntAsString.optional().transform((val) => toNumber(val, 80)),
    JITSI_URL: z.string().optional().transform(emptyStringToUndefined),
    JITSI_ISS: z.string().optional().transform(emptyStringToUndefined),
    SECRET_JITSI_KEY: z.string().optional().transform(emptyStringToUndefined),
    BBB_URL: z.string().url().or(z.literal("")).optional().transform(emptyStringToUndefined),
    BBB_SECRET: z.string().optional().transform(emptyStringToUndefined),
    ENABLE_FEATURE_MAP_EDITOR: BoolAsString.optional().transform((val) => toBool(val, false)),
    HTTP_PORT: PositiveIntAsString.optional().transform((val) => toNumber(val, 8080)),
    GRPC_PORT: PositiveIntAsString.optional().transform((val) => toNumber(val, 50051)),
    TURN_STATIC_AUTH_SECRET: z.string().optional().transform(emptyStringToUndefined),
    MAX_PER_GROUP: PositiveIntAsString.optional()
        .or(z.string().max(0))
        .transform((val) => toNumber(val, 4)),
    REDIS_HOST: z.string().optional().transform(emptyStringToUndefined),
    REDIS_PORT: PositiveIntAsString.optional().transform((val) => toNumber(val, 6379)),
    REDIS_PASSWORD: z.string().optional().transform(emptyStringToUndefined),
    STORE_VARIABLES_FOR_LOCAL_MAPS: BoolAsString.optional().transform((val) => toBool(val, false)),
    PROMETHEUS_AUTHORIZATION_TOKEN: z.string().optional().transform(emptyStringToUndefined),
    MAP_STORAGE_URL: z.string().optional().transform(emptyStringToUndefined),
    PUBLIC_MAP_STORAGE_URL: AbsoluteOrRelativeUrl.optional().transform(emptyStringToUndefined),
    EJABBERD_API_URI: AbsoluteOrRelativeUrl.optional().transform((val) => val?.replace(/\/+$/, "")),
    EJABBERD_DOMAIN: z.string().optional().transform(emptyStringToUndefined),
    EJABBERD_USER: z.string().optional().transform(emptyStringToUndefined),
    EJABBERD_PASSWORD: z.string().optional().transform(emptyStringToUndefined),
    PLAYER_VARIABLES_MAX_TTL: z
        .string()
        .optional()
        .transform((val) => toNumber(val, -1))
        .describe(`The maximum time to live of player variables for logged players, expressed in seconds (no limit by default).
Use "-1" for infinity.
Note that anonymous players don't have any TTL limit because their data is stored in local storage, not in Redis database.
`),
    ENABLE_CHAT: BoolAsString.optional().transform((val) => toBool(val, true)),
    ENABLE_CHAT_UPLOAD: BoolAsString.optional().transform((val) => toBool(val, true)),
    ENABLE_TELEMETRY: BoolAsString.optional()
        .transform((val) => toBool(val, true))
        .describe(
            "By default, WorkAdventure will send telemetry usage once a day. This data contains the version of WorkAdventure used and very rough usage (max number of users...). The statistics collected through telemetry can provide developers valuable insights into WorkAdventure versions that are actually used. No personal user data is sent. Please keep this setting to true unless your WorkAdventure installation is 'secret'."
        ),
    SECURITY_EMAIL: z
        .string()
        .email()
        .optional()
        .describe(
            'This email address will be notified if your WorkAdventure version contains a known security flaw. ENABLE_TELEMETRY must be set to "true" for this.'
        ),
    TELEMETRY_URL: z.string().optional().default("https://stats.workadventu.re"),
});

export type EnvironmentVariables = z.infer<typeof EnvironmentVariables>;
