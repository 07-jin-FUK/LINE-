import React, { useEffect, useState } from 'react'
import SignOut from './SignOut'
import { auth, db } from '../firebase'
import { limit, orderBy } from 'firebase/firestore';
import SendMessage from './SendMessage';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { avatarClasses } from '@mui/material';

function Line() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        db.collection("messeges")
            .orderBy("createdAt")
            .limit(500)
            .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
            });
    }, []);
    return (
        <div>
            {/* {console.log(messages)} */}
            <SignOut />
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid, createdAt, fileURL }) => (
                    <div className='rinn'>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? "sent" : "received"}`}>
                            <img id='aikon' src={photoURL} alt="" />
                            {fileURL ? (
                                <img src={fileURL} alt="Uploaded file" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                            ) : (
                                <p>{text}</p>
                            )}
                        </div>
                        <div className={` ${uid === auth.currentUser.uid ? "sent1" : "received1"}`}>
                            <p className='zikan'>{createdAt ? createdAt.toDate().toLocaleString() : 'Unknown'}</p>
                        </div>
                    </div>

                ))}


            </div>
            <SendMessage />

        </div >
    )
}

export default Line
