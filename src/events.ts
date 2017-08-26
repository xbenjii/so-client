/**
 * The base event, all events should contain these properties
 */
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
    event_type: 1;
    content: string;
    user_id: number;
    user_name: string;
    message_id: number;
}

/**
 * 2
 */
interface MessageEdited extends BaseEvent {
    event_type: 2;
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
    event_type: 3;
    user_id: number;
    target_user_id: number;
    user_name: string;
}

/**
 * 4
 */
interface UserLeft extends BaseEvent {
    event_type: 4;
    user_id: number;
    target_user_id: number;
    user_name: string;
}

/**
 * 5
 */
interface RoomNameChanged extends BaseEvent {
    event_type: 5;
    content: string;
    user_id: number;
    user_name: string;
}

/**
 * 6
 */
interface MessageStarred extends BaseEvent {
    event_type: 6;
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
    event_type: 7;
    [key: string]: any;
}

/**
 * 8
 */
interface UserMentioned extends BaseEvent {
    event_type: 8;
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
    event_type: 9;
    content: string;
    message_id: string;
    message_flags: number;
}

/**
 * 10
 */
interface MessageDeleted extends BaseEvent {
    event_type: 10;
    user_id: number;
    user_name: string;
    message_id: number;
}

/**
 * 11
 * TODO
 */
interface FileAdded extends BaseEvent {
    event_type: 11;
    [key: string]: any;
}

/**
 * 12
 * TODO
 */
interface ModeratorFlag extends BaseEvent {
    event_type: 12;
    [key: string]: any;
}

/**
 * 13
 * TOOD
 */
interface UserSettingsChanged extends BaseEvent {
    event_type: 13;
    [key: string]: any;
}

/**
 * 14
 * TODO
 */
interface GlobalNotification extends BaseEvent {
    event_type: 14;
    [key: string]: any;
}

/**
 * 15
 */
interface UserKicked extends BaseEvent {
    event_type: 15;
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
    event_type: 16;
    [key: string]: any;
}

/**
 * 17
 * TODO
 */
interface Invitation extends BaseEvent {
    event_type: 17;
    [key: string]: any;
}

/**
 * 18
 * TODO
 */
interface MessageReply extends BaseEvent {
    event_type: 18;
    [key: string]: any;
}

/**
 * 19
 */
interface MessageMovedOut extends BaseEvent {
    event_type: 19;
    content: string;
    user_id: number;
    user_name: string;
    moved: boolean;
}

/**
 * 20
 */
interface MessageMovedIn extends BaseEvent {
    event_type: 20;
    content: string;
    user_id: number;
    user_name: string;
    moved: boolean;
}

type Event = 
    MessagePosted |
    MessageEdited |
    UserEntered |
    UserLeft |
    RoomNameChanged |
    MessageStarred |
    DebugMessage |
    UserMentioned |
    MessageFlagged |
    MessageDeleted |
    FileAdded |
    ModeratorFlag |
    UserSettingsChanged |
    GlobalNotification |
    UserKicked |
    UserNotification |
    Invitation |
    MessageReply |
    MessageMovedOut |
    MessageMovedIn;

export function getEvent(event: Event): Event {
    if(!isEvent(event)) {
        return assertNever(event);
    }
    return event;
}

function isEvent(event: Event): event is Event {
    return event.event_type !== undefined;
}

function assertNever(x: any): any {
    throw new Error("Unexpected event: " + x);
}