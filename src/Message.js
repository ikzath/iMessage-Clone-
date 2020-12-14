import React, { useState, useEffect } from 'react';
import { Avatar } from "@material-ui/core";
import './Message.css';
import { selectUser } from "./features/userSlice";
import { useSelector} from "react-redux";
import { forwardRef } from 'react';




const  Message = forwardRef(({ id, contents: { timestamp, displayName, message, email, photo, uid },
 }, ref ) => {

    const user = useSelector(selectUser);
    
    return (
        <div 
        ref={ref}
        className={ `message ${user.email === email && "message__sender"}`}>
            <Avatar className='message__photo'src={photo} />
            <p>{message}</p>
            <small>{new Date(timestamp?.toDate()).toLocaleString() }</small>
        </div>
    )
})

export default Message
