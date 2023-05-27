import React from "react";
import track from "../../assets/track.svg";
import { Alert, ProgressBar, Button } from "react-bootstrap";
import styles from "./PredictionResult.module.css";
import { LinkContainer } from "react-router-bootstrap";

function PredictionResult({ prediction, description }) {
  const precision = (prediction.probability * 100).toFixed(2);

  return prediction.probability > 0.6 ? (
    <article className={styles.predictions}>
      <h2 className={styles.heading}>
        {prediction.className.replace(/(_)/gi, " ")}
      </h2>

      {/* <h4 className={styles.subheading}>
        {prediction.className === 'wild dog' ? (
          'Canid'
        ) : (
          <>
            <img src={track} alt="dog paw" />
            Dog
          </>
        )}
      </h4> */}

      <ProgressBar
        now={precision}
        label={precision}
        min={0}
        max={100}
        style={{
          width: `${precision}`,
        }}
        className="mt-3 bg-info text-white text-center font-weight-bold border-3 border-blue rounded-pill justify-content-center align-items-center d-flex"
        animated
      >
        {precision} %
      </ProgressBar>
      <LinkContainer to={`/search/${prediction.className}`}>
        <Button variant="success" className="mt-3 justify-content-center align-items-center d-flex" >View Details</Button>
      </LinkContainer>
    </article>
  ) : (
    <Alert variant="warning">
      Fail to identity product, try again with a different image.
    </Alert>
  );
}

export default PredictionResult;
