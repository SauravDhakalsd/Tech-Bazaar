import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { Alert, Button, ProgressBar, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

import styles from "./ImageScan.module.css";

const ImageScan = () => {
    const URL = process.env.PUBLIC_URL + "/model/";

    const [model, setModel] = useState(null);
    const [showWebcam, setShowWebcam] = useState(false);
    const [frontCamera, setFrontCamera] = useState(true);
    const [capturedImage, setCapturedImage] = useState(null);
    const [heading, setHeading] = useState("");
    const [precision, setPrecision] = useState(0);

    const webcamRef = useRef(null);

    const handleStart = useCallback(() => {
        setShowWebcam(true);
        const formupload = document.getElementById("formupload");
        formupload.style.display = "none";
        const scanupload = document.getElementById("scanupload");
        scanupload.style.margin = "auto";
    }, []);

    const loadModel = async () => {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
    };

    const capture = async () => {
        if (model && webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage(imageSrc);
            const img = new Image();
            img.src = imageSrc;
            img.onload = async () => {
                const prediction = await model.predict(img);
                const highestProbabilityIndex = prediction.reduce(
                    (maxIndex, current, index) =>
                        current.probability > prediction[maxIndex].probability ? index : maxIndex,
                    0
                );
                const highestPrediction = prediction[highestProbabilityIndex];
                setHeading(highestPrediction.className);
                setPrecision((highestPrediction.probability * 100).toFixed(2));
            };
        }
    };

    const toggleCamera = useCallback(() => {
        setFrontCamera(!frontCamera);
    }, []);

    const videoConstraints = {
        facingMode: frontCamera ? "user" : "environment",
    };

    const cancelWebCam = useCallback(() => {
        setShowWebcam(false);
    })

    useEffect(() => {
        if (!model) {
            loadModel();
        }
    }, [model]);

    return (
        <>
            {capturedImage ? (
                <div className={styles.container}>
                    <section className={styles.wrapper}>
                        <div >
                            <Button className={styles.buttonagain}
                                onClick={() => {
                                    setCapturedImage(false);
                                }}
                            >
                                Scan Again
                            </Button>
                        </div>
                        <figure>
                            <img src={capturedImage} alt="Captured Image" id="image" className={styles.image} />
                        </figure>
                    </section>
                    <article className={styles.predictions}>
                        <h2 className={styles.heading}>
                            {heading}
                        </h2>
                        <ProgressBar
                            now={precision}
                            label={`${precision}%`}
                            min={0}
                            max={100}
                            style={{
                                width: `${precision}%`
                            }}
                            className="mt-3 bg-info text-white text-center font-weight-bold border-3 border-blue rounded-pill justify-content-center align-items-center d-flex"
                            animated
                        >
                            {precision} %
                        </ProgressBar>
                        <LinkContainer to={`/search/${heading}`}>
                            <Button variant="success" className="mt-3 justify-content-center align-items-center d-flex" >View Details</Button>
                        </LinkContainer>
                    </article>
                </div>
            ) : (
                <div className={styles.uploadContainer} id="scanupload">
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
                                    onClick={capture}
                                    className={styles.button}
                                >
                                    Capture
                                </Button>
                            </div>
                            {capturedImage && <img src={capturedImage} alt="Captured Image" />}
                        </div>
                    )};
                </div>
            )}
        </>
    );
};

export default ImageScan;
