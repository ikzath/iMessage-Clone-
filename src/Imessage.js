import React from 'react';
import './Imessage.css';
import SideBar from "./Sidebar";
import Chat from "./Chat.js";

function Imessage() {
    return (
        <div className='iMessage'>
            {/* sidebar */}
            <SideBar />

            {/* chat box */}
            <Chat />

            
        </div>
    )
}

export default Imessage
