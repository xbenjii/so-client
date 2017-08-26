interface MessagePosted {
    event_type: number; // 1
    time_stamp: number;
    content: string;
    id: number;
    user_id: number;
    user_name: string;
    room_id: number;
    room_name: string;
    message_id: number;
}

interface MessageEdited {
    event_type: number; // 2
    time_stamp: number;
    content: string;
    id: number;
    user_id: number;
    user_name: string;
    room_id: number;
    room_name: string;
    message_id: number;
    message_edits: number;
}

interface UserEntered {
    event_type: number; // 3
    time_stamp: number;
    id: number;
    user_id: number;
    target_user_id: number;
    user_name: string;
    room_id: number;
    room_name: string;
}

interface UserLeft {
    event_type: number; // 4
    time_stamp: number;
    id: number;
    user_id: number;
    target_user_id: number;
    user_name: string;
    room_id: number;
    room_name: string;
}

interface RoomNameChanged {
    event_type: number; // 5
    time_stamp: number;
    content: string;
    id: number;
    user_id: number;
    user_name: string;
    room_id: number;
    room_name: string;
}

interface MessageStarred {
    event_type: number; // 6
    time_stamp: number;
    content: string;
    id: number;
    user_id: number;
    user_name: string;
    room_id: number;
    room_name: string;
    message_id: number;
    message_stars?: number;
    message_starred?: boolean;
}

type DebugMessage = any; // 7

interface UserMentioned {
    event_type: number; // 8
    time_stamp: number;
    content: string;
    id: number;
    user_id: number;
    target_user_id: number;
    user_name: string;
    room_id: number;
    room_name: string;
    message_id: number;
    parent_id: number;
}

interface MessageFlagged {
    event_type: number; // 9
}

interface MessageDeleted {
    event_type: number; // 10
    time_stamp: number;
    id: number;
    user_id: number;
    user_name: string;
    room_id: number;
    room_name: string;
    message_id: number;
}

interface FileAdded {
    event_type: number; // 11
}

interface ModeratorFlag {
    event_type: number; // 12
}

interface UserSettingsChanged {
    event_type: number; // 13
}

interface GlobalNotification {
    event_type: number; // 14
}

interface UserKicked {
    event_type: number; // 15
    time_stamp: number;
    content: string;
    id: number;
    user_id: number;
    target_user_id: number;
    user_name: string;
    room_id: number;
    room_name: string;
}

interface UserNotification {
    event_type: number; // 16
}

interface Invitation {
    event_type: number; // 17
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