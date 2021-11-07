
let subscribers: TSubscriber[] = [];

let channel: WebSocket | null = null;

const closeHandler = () => {
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers.forEach(s => s(newMessages));
};
 
const createChannel = () => {
  channel?.removeEventListener("close", closeHandler);
  channel?.close();
  channel = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  channel.addEventListener("close", closeHandler);
  channel.addEventListener("message", messageHandler);
};


export const chatApi = {
  start() {
    createChannel();
  },
  stop() {
    subscribers = [];
    channel?.removeEventListener("close", closeHandler);
    channel?.removeEventListener("message", messageHandler);
    channel?.close();
  },
  subscribe(callback: TSubscriber) {
    subscribers.push(callback);
    return () => {
        subscribers.filter(s => s !== callback);
    }
  },
  sendMessage(message: string) {
    channel?.send(message);
  }
};

// Types
export type TChatMessage = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

type TSubscriber = (messages: TChatMessage[]) => void;
