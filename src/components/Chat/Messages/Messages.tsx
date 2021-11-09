import styles from "./Messages.module.css";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message/Message";
import { TChatMessageWithId } from "../../../redux/chat-reducer";

const Messages: React.FC<TProps> = ({ messages }) => {
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);

  const anchorRef = useRef<HTMLDivElement>(null);

  console.log("messages");

  useEffect(() => {
    if (isAutoScrollActive) {
      anchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight
    ) {
      !isAutoScrollActive && setIsAutoScrollActive(true);
    } else {
      isAutoScrollActive && setIsAutoScrollActive(false);
    }
  };

  return (
    <div className={styles.messages} onScroll={scrollHandler}>
      {messages?.map((m) => (
        <Message key={m.id} message={m} />
      ))}
      <div className={styles.anchor} ref={anchorRef}></div>
    </div>
  );
};

export default React.memo(Messages);

// Types

type TProps = {
  messages: TChatMessageWithId[] | null;
};
