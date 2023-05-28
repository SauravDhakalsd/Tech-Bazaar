import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Alert, Button, Spinner } from "react-bootstrap";

import PredictionResult from "../PredictionResult/PredictionResult";
import styles from "./ImageScan.module.css";
import { useImageScan } from "./useImageScan";

function FormUpload() {
    const { file, prediction, description, error, isLoading, onScan } =
        useImageScan();
    const webcamRef = useRef(null);

    const [capturedImage, setCapturedImage] = useState(null);
    const [showWebcam, setShowWebcam] = useState(false);
    const [frontCamera, setFrontCamera] = useState(true);

    const handleStart = useCallback(() => {
        setShowWebcam(true);
    }, []);

    const handleCapture = useCallback((acceptedFiles) => {
        const [single] = acceptedFiles;
        setCapturedImage(single);
    }, []);

    const toggleCamera = useCallback(() => {
        setFrontCamera(!frontCamera);
    }, []);

    const videoConstraints = {
        facingMode: frontCamera ? "user" : "environment",
    };

    const cancelWebCam = useCallback(() => {
        setShowWebcam(false);
    })

    return (
        <>
            {capturedImage ? (
                <div className={styles.container}>
                    <section className={styles.wrapper}>
                        <div >
                            <Button className={styles.buttonagain}
                                onClick={() => {
                                    setCapturedImage(false);
                                    console.log("Prediction ", prediction)
                                }}
                            >
                                Scan Again
                            </Button>
                        </div>

                        <figure>
                            <img src={capturedImage} alt="Captured Image" className={styles.image} />
                        </figure>

                        {isLoading && (
                            <Spinner
                                animation="border"
                                className="d-flex justify-content-center align-items-center mx-auto mt-3"
                            />
                        )}

                        {error && (
                            <Alert variant="danger">
                                Fail to scan image, scan again.
                            </Alert>
                        )}
                    </section>

                    {prediction.probability && (
                        <PredictionResult
                            prediction={prediction}
                            description={description}
                        />
                    )}
                </div>
            ) : (
                <div className={styles.uploadContainer}>
                    {/* <input data-testid="upload-image" /> */}
                    <h2>Scan Image</h2>
                    {!showWebcam && (
                        <Button
                            onClick={handleStart}
                            className={styles.buttonweb}
                        >
                            Start
                        </Button>
                    )}
                    {showWebcam && (
                        <div>
                            <Webcam
                                audio={false}
                                height={400}
                                ref={webcamRef}
                                width={400}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                                onCapture={handleCapture}
                                className={styles.webcam}
                            />
                            <div className='d-flex'>
                                <Button onClick={toggleCamera} className={styles.button}>
                                    Flip Camera
                                </Button>
                                <Button onClick={cancelWebCam} className={styles.button}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => {
                                        const capturedImg = webcamRef.current.getScreenshot();
                                        setCapturedImage(capturedImg);
                                        onScan(capturedImg);
                                    }}
                                    className={styles.button}
                                >
                                    Capture
                                </Button>
                            </div>
                            {capturedImage && <img src={capturedImage} alt="Captured Image" />}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default FormUpload;
