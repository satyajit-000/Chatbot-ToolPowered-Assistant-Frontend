// src/common/utils/chatroomMapper.ts

import type { BackendChatRoom } from '../interfaces/backend.type';
import type { ChatRoom } from '../interfaces/chatroom.type';

/**
 * Map single backend chatroom to frontend ChatRoom
 */
export const mapChatRoom = (room: BackendChatRoom): ChatRoom => {
    return {
        id: room.id,
        title: room.title || 'Untitled',
        createdAt: new Date(room.created_at),
        messageCount: room.message_count,
    };
};

/**
 * Map chatroom list response
 */
export const mapChatRoomList = (rooms: BackendChatRoom[]): ChatRoom[] => {
    return rooms.map(mapChatRoom);
};
