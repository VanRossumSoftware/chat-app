import React from 'react'
import {ChatBubbleLeftRightIcon, PhoneIcon } from "@heroicons/react/24/solid"

const Header = ({chat}) => {
    console.log(chat);
    return (
    <div className="chat-header">
        <div className="flexBetween">
            <ChatBubbleLeftRightIcon className="icon-chat"/>
            <h3 className="header-text">{chat.title}</h3>
        </div>
        <div className="flexBetween">
            <PhoneIcon className='icon-phone'/>
            {chat.description !== "⬅️ ⬅️ ⬅️" ? (<p className='header-text'>{chat.description}</p>) :
             (<p className='header-text'>no chat selected</p>)}
        </div>
    </div>
  )
}

export default Header