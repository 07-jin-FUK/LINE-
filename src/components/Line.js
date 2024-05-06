import React, { useEffect, useState } from 'react'
import SignOut from './SignOut'
import { auth, db } from '../firebase'
import { limit, orderBy } from 'firebase/firestore';
import SendMessage from './SendMessage';

function Line() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        db.collection("messeges")
            .orderBy("createdAt")
            .limit(50)
            .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
            });
    }, []);
    return (
        <div>
            {console.log(messages)}
            <SignOut />
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? "sent" : "received"}`}>
                            <img src={photoURL} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>

                ))}


            </div>
            <SendMessage />
        </div>
    )
}

export default Line
