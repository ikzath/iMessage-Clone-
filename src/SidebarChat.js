import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import './SidebarChat.css';
import { setChat} from "./features/chatSlice";
import { useSelector, useDispatch } from "react-redux";
import db from "./firebase";



function SidebarChat({ id, chatname }) {


  const dispatch = useDispatch();

  const [messageInfo, setmessageInfo] = useState([]);

  useEffect(() => {

    db.collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot( snap => 
        setmessageInfo(
          snap.docs.map( doc => 
            doc.data()
          )
        )
      )

  }, [id])


   return (

    <div onClick= {()=> {
          dispatch(
            setChat({
              chatID: id,
              chatName: chatname
            })

          )
    }}
    
        className='sidebarChat'>
        <Avatar src={messageInfo[0]?.photo} />
        <div className='sidebarChat__info'>
            <h3>{ chatname }</h3>
            <p>{messageInfo[0]?.message}</p>
            <small>{ new Date(messageInfo[0]?.timestamp?.toDate()).toLocaleString() }</small>
        </div>    
    </div>
    )
  }

export default SidebarChat
