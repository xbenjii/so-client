interface BaseEvent {
    event_type: number;
    time_stamp: number;
    id: number;
    room_id: number;
    room_name: string;
}

/**
 * 1
 */
interface MessagePosted extends BaseEvent {
    content: string;
    user_id: number;
    user_name: string;
    message_id: number;
}

/**
 * 2
 */
interface MessageEdited extends BaseEvent {
    content: string;
    user_id: number;
    user_name: string;
    message_id: number;
    message_edits: number;
}

/**
 * 3
 */
interface UserEntered extends BaseEvent {
    user_id: number;
    target_user_id: number;
    user_name: string;
}

/**
 * 4
 */
interface UserLeft extends BaseEvent {
    user_id: number;
    target_user_id: number;
    user_name: string;
}

/**
 * 5
 */
interface RoomNameChanged extends BaseEvent {
    content: string;
    user_id: number;
    user_name: string;
}

/**
 * 6
 */
interface MessageStarred extends BaseEvent {
    content: string;
    user_id: number;
    user_name: string;
    message_id: number;
    message_stars?: number;
    message_starred?: boolean;
}

/**
 * 7
 * TODO
 */
interface DebugMessage extends BaseEvent {
    [key: string]: any;
}

/**
 * 8
 */
interface UserMentioned extends BaseEvent {
    content: string;
    user_id: number;
    target_user_id: number;
    user_name: string;
    message_id: number;
    parent_id: number;
}

/**
 * 9
 */
interface MessageFlagged extends BaseEvent {
    content: string;
    message_id: string;
    message_flags: number;
}

/**
 * 10
 */
interface MessageDeleted extends BaseEvent {
    user_id: number;
    user_name: string;
    message_id: number;
}

/**
 * 11
 * TODO
 */
interface FileAdded extends BaseEvent {
    [key: string]: any;
}

/**
 * 12
 * TODO
 */
interface ModeratorFlag extends BaseEvent {
    [key: string]: any;
}

/**
 * 13
 * TOOD
 */
interface UserSettingsChanged extends BaseEvent {
    [key: string]: any;
}

/**
 * 14
 * TODO
 */
interface GlobalNotification extends BaseEvent {
    [key: string]: any;
}

/**
 * 15
 */
interface UserKicked extends BaseEvent {
    content: string;
    user_id: number;
    target_user_id: number;
    user_name: string;
}

/**
 * 16
 * TODO
 */
interface UserNotification extends BaseEvent {
    [key: string]: any;
}

/**
 * 17
 * TODO
 */
interface Invitation extends BaseEvent {
    [key: string]: any;
}

/**
 * 18
 * TODO
 */
interface MessageReply extends BaseEvent {
    [key: string]: any;
}

/**
 * 19
 */
interface MessageMovedOut extends BaseEvent {
    content: string;
    user_id: number;
    user_name: string;
    moved: boolean;
}

/**
 * 20
 */
interface MessageMovedIn extends BaseEvent {
    content: string;
    user_id: number;
    user_name: string;
    moved: boolean;
}

type Default = any;


// Thanks awal, https://github.com/awalgarg/sochatbot/blob/master/sechatapi/eventmaps.json
const EVENT_MAP = {
    "1": "MessagePosted",
    "2": "MessageEdited",
    "3": "UserEntered",
    "4": "UserLeft",
    "5": "RoomNameChanged",
    "6": "MessageStarred",
    "7": "DebugMessage",
    "8": "UserMentioned",
    "9": "MessageFlagged",
    "10": "MessageDeleted",
    "11": "FileAdded",
    "12": "ModeratorFlag",
    "13": "UserSettingsChanged",
    "14": "GlobalNotification",
    "15": "AccessLevelChanged", // Fired on a kick
    "16": "UserNotification",
    "17": "Invitation",
    "18": "MessageReply",
    "19": "MessageMovedOut",
    "20": "MessageMovedIn",
    "21": "TimeBreak",
    "22": "FeedTicker",
    "29": "UserSuspended",
    "30": "UserMerged",
    "34": "UserNameOrAvatarChanged"    
};