import { useUser } from "@/Hooks";
import { baseURL } from "@/Utils/Api";
import { useListState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import * as Colyseus from "colyseus.js";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { IMessage } from "./types";
import useFetch from "@/Hooks/Fetch";
import { Button, TextInput } from "@mantine/core";
import styles from "./chat.module.scss";
import classNames from "classnames";
import moment from "moment";

export default function () {

    const messageListRef = useRef<HTMLDivElement>();

    const user = useUser();
    const [client] = useState(new Colyseus.Client(baseURL().replace("http://", "ws://").replace("https://", "wss://")));
    const [room, setRoom] = useState<Colyseus.Room | null>(null);

    const [messages, messageHandlers] = useListState<IMessage>([]);
    const [msg, setMsg] = useState("");

    const [connectedCount, setConnectedCount] = useState(0);

    useFetch<IMessage[]>({
        endpoint: "/chat",
        onComplete(data) {
            data.map(m => messageHandlers.append(m));
        },
    });

    const handleSendMessage = () => {
        if (!msg) return;
        room?.send("message", { userId: user.userId, message: msg });
        setMsg("");
    }

    const handleListenMessages = () => {
        room?.onMessage("*", (type, message) => {
            switch (type) {
                case ("status:connected"):
                    return setConnectedCount(message);
                case ("chat:message"):
                    return messageHandlers.append(message);
            }
        });
    }

    const handleConnect = async () => {
        try {
            const joinedRoom = await client.joinOrCreate("chat", { token: user.token });
            setRoom(joinedRoom);
        } catch (error: any) {
            notifications.show({ color: "red", title: "Can't connect to server.", message: error });
        }
    }

    useEffect(() => {
        if (!client || !user.token) return;
        handleConnect();
    }, [client, user]);

    useEffect(() => {
        if (room) handleListenMessages();
    }, [room]);

    useEffect(() => {
        if (!messageListRef?.current) return;
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [messages]);

    if (!user.token) {
        return window.location.href = "/";
    }

    return (room &&
        <div className={styles.chat}>
            <div className={styles.chatBox}>
                <div className={styles.connectedUsers}>
                    Connected users: {connectedCount}
                </div>
                <div
                    ref={messageListRef as MutableRefObject<HTMLDivElement>}
                    style={{ height: "calc(100% - 2.5rem - 5rem)" }}
                    className={styles.messageList}
                >
                    {messages.length === 0 ?
                        <div className="mx-auto text-black/50">
                            No messages.
                        </div> :
                        messages.map((message) => (
                            <div
                                key={message.messageId}
                                className={classNames(styles.message, { [styles.mine]: message.username === user.username })}
                            >
                                <div className={styles.username}>
                                    {message.username}
                                </div>
                                <div className={styles.msg}>
                                    {message.message}
                                </div>
                                <div className={styles.time}>
                                    {moment(message.createdAt).fromNow()}
                                </div>
                            </div>
                        ))}
                </div>
                <div className={styles.typeArea}>
                    <TextInput
                        className="flex-auto h-full"
                        placeholder="Write your message here."
                        value={msg}
                        onChange={(event) => setMsg(event.target.value)}
                        onKeyDown={(event) => event.key === "Enter" && handleSendMessage()}
                    />
                    <Button
                        disabled={!msg}
                        className="h-full"
                        onClick={handleSendMessage}
                    >
                        Send
                    </Button>
                </div>
            </div>
        </div>
    )
}