import React, { useState } from 'react'
import { db, auth } from '../firebase';
import firebase from "firebase/compat/app";
import { Input } from '@mui/material';
import SendIcon from "@mui/icons-material/Send";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Storage } from '../firebase'
import audioFile from '../Img/supo.mp3';
// import Camera from './camera'; // Camera コンポーネントをインポート



function SendMessage() {
    const [message, setMessage] = useState("")
    const [file, setFile] = useState(null); // 追加
    // const [isCameraOpen, setIsCameraOpen] = useState(false); // カメラが開かれているかどうかの状態



    function sendMessage(e) {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;


        db.collection("messeges").add({
            text: message,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            fileURL: file ? file.url : null, // ファイルのURLをFirestoreに保存する
        }).then(() => {
            const audio = document.getElementById('pon');
            if (audio) {
                audio.play();
            }
        }).catch((error) => {
            console.error("Error sending message: ", error);
        });


        setMessage("")
        setFile(null); // メッセージが送信された後にファイルをリセットする
    }

    // // カメラからのキャプチャ画像をセットする関数
    // const handleCapture = (imageSrc) => {
    //     setFile({ file: imageSrc, url: imageSrc });
    //     setIsCameraOpen(false); // カメラを閉じる
    // };

    // function handleCameraClick() {
    //     setIsCameraOpen(prevState => !prevState); // カメラの状態をトグル
    // }


    // function handleSendIconClick() {
    //     sendMessage(new Event('click'));
    // }
    // // ファイルが選択されたときのハンドラー
    // function handleFileChange(e) {
    //     if (e.target.files[0]) {
    //         setFile({
    //             file: e.target.files[0],
    //             url: URL.createObjectURL(e.target.files[0]), // ファイルのURLを生成する
    //         });
    //     }
    // }

    function handleSendIconClick() {
        sendMessage();
    }

    function handleFileChange(e) {
        if (e.target.files[0]) {
            setFile({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    }

    function handleUpload() {
        if (file) {
            const storageRef = Storage.ref();
            const fileRef = storageRef.child(file.file.name);
            fileRef.put(file.file).then(() => {
                fileRef.getDownloadURL().then(url => {
                    setFile({
                        ...file,
                        url: url, // ファイルのダウンロードURLをセットする
                    });
                    sendMessage(); // ファイルがアップロードされたらメッセージを送信する
                });
            });
        }
    }



    return (
        <div>
            <form onSubmit={sendMessage}>
                <div class="sendMsg">
                    <audio id="pon">
                        <source src={audioFile} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                    <Input
                        style={{
                            width: "65%",
                            fontSize: "15px",
                            fontWeight: "550",
                            marginLeft: "5px",
                            marginBottom: "-3px",
                        }}
                        placeholder="メッセージを入力してください。"
                        type="text"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message} />
                    {/* ファイルのプレビュー */}
                    {file && file.url && (
                        <div>
                            {file.file.type.startsWith('image/') ? (
                                <img src={file.url} alt="Selected file" style={{ maxWidth: '100%', maxHeight: '500px' }} />
                            ) : (
                                <p>Selected file: {file.file.name}</p>
                            )}
                        </div>
                    )}
                    <SendIcon
                        style={{ color: "#7AC2FF", marginLeft: "20px", cursor: "pointer" }}
                        onClick={handleSendIconClick}
                    />

                    <FilePresentIcon style={{ color: "#7AC2FF", marginLeft: "20px" }} />
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    {/* FileUploadIconをクリックしてファイル選択用のinput要素を開く */}
                    <FileUploadIcon
                        style={{ color: "#7AC2FF", marginLeft: "20px", cursor: "pointer" }}
                        onClick={() => document.getElementById('file-upload').click()}
                    />
                    {/* <FileUploadIcon style={{ color: "#7AC2FF", marginLeft: "20px" }} /> */}
                    {/* カメラアイコン */}
                    <CameraAltIcon
                        style={{ color: "#7AC2FF", marginLeft: "20px", cursor: "pointer" }}
                    // onClick={() => setIsCameraOpen(true)} // カメラアイコンをクリックした際にカメラを開く
                    />
                    {/* カメラコンポーネント */}
                    {/* {isCameraOpen && <Camera />} */}


                    {/* <CameraAltIcon
                        style={{ color: "#7AC2FF", marginLeft: "20px", cursor: "pointer" }}
                        onClick={handleCameraClick} // カメラアイコンをクリックしたときの処理
                    />
                    {isCameraOpen && <Camera onCapture={(imageSrc) => setFile({ file: imageSrc, url: imageSrc })} />} */}
                    {/* <CameraAltIcon
                        style={{ color: "#7AC2FF", marginLeft: "20px", cursor: "pointer" }}

                    /> */}


                </div>
            </form >
        </div >
    );
}

export default SendMessage
