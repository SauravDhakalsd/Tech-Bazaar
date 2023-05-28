// import React from 'react'
// import { load, Webcam } from '@teachablemachine/image';

// const AISearch = () => {
//     const URL = "../../public/AI_model/";

//     let model, webcam, labelContainer, maxPredictions;

//     async function init() {
//         const modelURL = URL + "model.json";
//         const weightsURL = URL + "weights.bin";
//         const metadataURL = URL + "metadata.json";

//         const modelJSON = await fetch(modelURL).then((response) => response.json());
//         const weights = await fetch(weightsURL).then((response) => response.arrayBuffer());
//         const metadataJSON = await fetch(metadataURL).then((response) => response.json());

//         // const modelJSON = await readFile(modelURL);
//         // const weights = await readFile(weightsURL);
//         // const metadataJSON = await readFile(metadataURL);

//         model = await load(modelJSON, metadataJSON);
//         maxPredictions = model.getTotalClasses();

//         const flip = true;
//         webcam = new Webcam(200, 200, flip);
//         await webcam.setup();
//         await webcam.play();
//         window.requestAnimationFrame(loop);

//         document.getElementById("webcam-container").appendChild(webcam.canvas);
//         labelContainer = document.getElementById("label-container");
//         for (let i = 0; i < maxPredictions; i++) {
//             labelContainer.appendChild(document.createElement("div"));
//         }
//     }

//     // async function readFile(url) {
//     //     return new Promise((resolve, reject) => {
//     //         const xhr = new XMLHttpRequest();
//     //         xhr.open('GET', url, true);
//     //         xhr.responseType = 'arraybuffer';
//     //         xhr.onload = () => {
//     //             if (xhr.status === 200) {
//     //                 resolve(xhr.response);
//     //             } else {
//     //                 reject(new Error(xhr.statusText));
//     //             }
//     //         };
//     //         xhr.onerror = () => {
//     //             reject(new Error('Network error'));
//     //         };
//     //         xhr.send();
//     //     });
//     // }

//     async function loop() {
//         webcam.update();
//         await predict();
//         window.requestAnimationFrame(loop);
//     }

//     async function predict() {
//         // predict can take in an image, video or canvas html element
//         const prediction = await model.predict(webcam.canvas);
//         for (let i = 0; i < maxPredictions; i++) {
//             const classPrediction =
//                 prediction[i].className +
//                 ": " +
//                 prediction[i].probability.toFixed(2);
//             labelContainer.childNodes[i].innerHTML = classPrediction;
//         }
//     }

//     return (
//         <div>
//             <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
//             <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></script>
//             <button type="button" onclick="init()">Start</button>
//             <div id="webcam-container"></div>
//             <div id="label-container"></div>
//         </div>
//     )
// }

// export default AISearch

import React, { useRef } from "react";
import { loadFromFiles, Webcam } from "@teachablemachine/image";

const AISearch = () => {
    const URL = "../../public/AI_model/";

    let model, webcam, maxPredictions;
    const webcamContainerRef = useRef(null);
    const labelContainerRef = useRef(null);

    async function init() {
        const modelURL = URL + "model.json";
        const weightsURL = URL + "weights.bin";
        const metadataURL = URL + "metadata.json";
        const modelJSON = await fetch(modelURL).then((response) => response.json());
        const weights = await fetch(weightsURL).then((response) =>
            response.arrayBuffer()
        );
        const metadataJSON = await fetch(metadataURL).then((response) =>
            response.json()
        );
        model = await loadFromFiles(modelJSON, weights, metadataJSON);
        maxPredictions = model.getTotalClasses();

        const flip = true;
        webcam = new Webcam(200, 200, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        webcamContainerRef.current.appendChild(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            labelContainerRef.current.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainerRef.current.childNodes[i].innerHTML = classPrediction;
        }
    }

    return (
        <div>
            <button type="button" onClick={init}>
                Start
            </button>
            <div id="webcam-container" ref={webcamContainerRef}></div>
            <div id="label-container" ref={labelContainerRef}></div>
        </div>
    );
};

export default AISearch;
