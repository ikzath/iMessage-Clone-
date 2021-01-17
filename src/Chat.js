import React, { useState, useEffect } from 'react';
import { IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import './Chat.css';
import Message from "./Message";
import { selectChatName, selectChatId } from "./features/chatSlice";
import { selectUser } from "./features/userSlice";
import { useSelector} from "react-redux";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from 'react-flip-move';


function Chat() {

    const [input, setInput] = useState('');
    const username = useSelector(selectChatName);
    const chatID = useSelector(selectChatId);
    const [Messages, setMessages] = useState([]);
    const user = useSelector(selectUser);


useEffect(() => {

  if(chatID) {  
    db.collection('chats')
    .doc(chatID)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot( snapshot => {
        setMessages(
            snapshot.docs.map( doc => ({
                id: doc.id,
                data:  doc.data(),
            }))
        )
    })
  }

}, [chatID])

    const sendMessage = e => {
     e.preventDefault();
     
     //  Pushing new messages into db and our local state
     db.collection('chats')
    .doc(chatID)
    .collection('messages')
    .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName
        
    });

     setInput('');
    }

    
    return (
    <div className='chat'>
        
         {/* chat header */}
         <div className='chat__header'>
             <h4>
                 <span className='chat__name'>{username}</span>
             </h4>
                <strong>Enter a chat-room or create your own</strong>
         </div>
        
        {/* chat messages */}
        <div className='chat__messages'>
            <FlipMove>
                {Messages.map( ({ id, data }) => (
                    <Message key={id} contents={data} />
                ))}                
            </FlipMove>

        </div>
        
        {/* chat input  */}
         <div className='chat__input'>
             <form>
                 <input 
                 placeholder='iMessage' 
                 type='text' 
                 value={input}
                 onChange = {e=> setInput(e.target.value)}/>
                 <button onClick={sendMessage} >Send Message</button>
             </form>

            <IconButton className='chat__mic'>
                <MicNoneIcon />
            </IconButton>
        </div>
     </div>
    )
}

export default Chat
