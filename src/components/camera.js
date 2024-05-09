import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import "../App.css";
// import zIndex from "@mui/material/styles/zIndex";

const videoConstraints = {
    width: 720,
    height: 360,
    facingMode: "user"
};

export const Camera = () => {
    const [isCaptureEnable, setCaptureEnable] = useState(false);
    const webcamRef = useRef(null);
    const [url, setUrl] = useState(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setUrl(imageSrc);

        }
    }, [webcamRef]);

    return (
        <>

            {isCaptureEnable || (
                <button onClick={() => setCaptureEnable(true)}>開始</button>
            )}
            {isCaptureEnable && (
                <>
                    <div>
                        <button onClick={() => setCaptureEnable(false)}>終了</button>
                    </div>
                    <div style={{ zIndex: 5 }}>
                        <Webcam
                            audio={false}
                            width={540}
                            height={360}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}


                        />
                    </div>
                    <button onClick={capture}>キャプチャ</button>
                </>
            )
            }
            {
                url && (
                    <>
                        <div>
                            <button
                                onClick={() => {
                                    setUrl(null)
                                }}
                            >
                                削除
                            </button>
                        </div>
                        <div>
                            <img src={url} alt="Screenshot" />
                        </div>
                    </>
                )
            }
        </>
    );
};

export default Camera;