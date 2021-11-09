import { TStatus } from "../redux/chat-reducer";

const subscribers = {
  "messages-received": [] as TMessagesReceivedSubscriber[],
  "status-changed": [] as TStatusChangedSubscriber[],

};

let channel: WebSocket | null = null;

const closeHandler = () => {
  notifySubscribersAboutStatus("pending");
  setTimeout(createChannel, 3000);
};

const cleanUp = () => {
  channel?.removeEventListener("close", closeHandler);
  channel?.removeEventListener("message", messageHandler);
  channel?.removeEventListener("open", openHandler);
  channel?.removeEventListener("error", errorHandler);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["messages-received"].forEach((s) => s(newMessages));
};

const openHandler = () => {
  notifySubscribersAboutStatus("ready");
}

const errorHandler = () => {
  notifySubscribersAboutStatus("error");
  console.error("error, restart page");
}

const notifySubscribersAboutStatus = (status: TStatus) => {
  subscribers["status-changed"].forEach(s => s(status));
}

const createChannel = () => {
  cleanUp();
  channel?.close();
  channel = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  notifySubscribersAboutStatus("pending");
  channel.addEventListener("close", closeHandler);
  channel.addEventListener("message", messageHandler);
  channel.addEventListener("open", openHandler);
  channel.addEventListener("error", errorHandler);
};

export const chatApi = {
  start() {
    createChannel();
  },
  stop() {
    subscribers["messages-received"] = [];
    subscribers["status-changed"] = [];
    cleanUp();
    channel?.close();
  },
  subscribe(event: TEvents, callback: TMessagesReceivedSubscriber | TStatusChangedSubscriber) {
    //@ts-ignore
    subscribers[event].push(callback);
    return () => {
      //@ts-ignore
      subscribers[event] = subscribers[event].filter((s) => s !== callback);
    };
  },
  sendMessage(message: string) {
    channel?.send(message);
  },
};

// Types
export type TChatMessage = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

type TMessagesReceivedSubscriber = (messages: TChatMessage[]) => void;
type TStatusChangedSubscriber = (status: TStatus) => void;

export type TEvents = "messages-received" | "status-changed";