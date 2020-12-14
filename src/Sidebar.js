import React, { useEffect, useState} from 'react';
import  "./SideBar.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "./SidebarChat.js";
import db, { auth } from "./firebase";
import { selectUser} from "./features/userSlice";
import { useSelector} from "react-redux";


function Sidebar() {

const [chat, setchat] = useState([]);
const [isShown, setIsShown] = useState(false);
 const user = useSelector(selectUser);  
 
    useEffect(() => {
        db.collection("chats").onSnapshot( snapshot => {
            setchat(
                snapshot.docs.map( doc => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        })
        
    }, [])
    
    const addData = () => {
        const chatRoom = prompt('Enter a chatroom name');

        if(chatRoom) {
            db.collection("chats").add({
                chatName: chatRoom
            });
        }
    };


   return (
    <div className='sidebar'>

        <div className='sidebar__header'>
        <Avatar src={user.photo} onClick={() => auth.signOut()} className='sidebar__avatar'  
         onMouseEnter={() => setIsShown(true)} 
         onMouseLeave={() => setIsShown(false)}
            /> 
        {isShown && (
            <strong className='sidebar__hoverMessage'>click to logout</strong>
         )}

        <div className='sidebar__input'>
            <SearchIcon />
            <input placeholder='search' />
        </div>

        <IconButton onClick={addData} variant='outlined' className='sidebar__inputButton'>
            <RateReviewOutlinedIcon  />
        </IconButton> 
        </div>


        <div className='sidebar__chats' >
            {chat.map(( { id, data: { chatName }} ) => (
                <SidebarChat key={id} id={id} chatname={chatName} />
            ))}
        </div>
    </div>

    )
}

export default Sidebar
