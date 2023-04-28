import { useState } from 'react'
import MessageFormUI from './MessageFormUI'

function StandardMessageForm({props, activeChat}) {
    //console.log("activeChat", activeChat)
    //console.log("props", props)
    const [message, setMessge] = useState("");
    const [attachment, setAttachment] = useState("");
    const handleChange = (e) => setMessge(e.target.value);

    const handleSubmit = async () => {
        const date = new Date().toISOString().replace("T", " ").replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
        const att = attachment ? [{blob: attachment, file: attachment.name}] : [];
        const form = {
            attachments: att,
            created: date,
            sender_username: props.username,
            text: message,
            activeChatId: activeChat.id
        }
        props.onSubmit(form);
        setMessge("")
        setAttachment("")
    }

    return (
        <MessageFormUI 
            setAttachment = {setAttachment}
            message = {message}
            handleChange = {handleChange}
            handleSubmit = {handleSubmit}
        />
    )
}

export default StandardMessageForm