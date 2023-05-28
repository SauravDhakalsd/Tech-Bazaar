import { useCallback, useState } from "react";

import { useMLModel } from "../../hook/useMLModel";
import { useFetch } from "../../hook/useFetch";

export function useImageScan() {
  const [file, setFile] = useState([]);
  const [prediction, setPrediction] = useState([]);
  const [description, setDescription] = useState({});
  const [error, setError] = useState(null);

  const statusType = {
    IDLE: "IDLE",
    FULFILLED: "FULFILLED",
    REJECTED: "REJECTED",
  };

  const [status, setStatus] = useState(statusType.IDLE);

  const { predict } = useMLModel({
    modelPath: "./model/model.json",
    metadataPath: "./model/metadata.json",
  });

  const { retrieve } = useFetch();

  const handleResults = useCallback(async (data) => {
    setPrediction(data);
  }, []);

  const onScan = useCallback(async (acceptedFiles) => {
    try {
      const [single] = acceptedFiles;
      setFile(
        Object.assign(single, {
          preview: URL.createObjectURL(single),
        })
      );

      const image = document.getElementById("image");
      const mlPrediction = await predict(image);

      await handleResults(mlPrediction);
    } catch (err) {
      setError(err);
      setStatus(statusType.REJECTED);
    } finally {
      setStatus(statusType.FULFILLED);
    }
  }, []);

  return {
    onScan,
    file,
    prediction,
    description,
    error,
    isLoading: status === statusType.IDLE,
    isFinished: status === statusType.FULFILLED,
    isRejected: status === statusType.REJECTED,
  };
}
