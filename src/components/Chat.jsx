import React, { useContext } from "react";
import { Camera } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { More } from "@mui/icons-material";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
    const { data } = useContext(ChatContext);

    return (
        <div className="chat">
            <div className="chatInfo">
                {<span>{data.user?.displayName}</span>}
                <div className="chatIcons">
                    <Camera />
                    <Add />
                    <More />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;