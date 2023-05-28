import React from "react";
import FormUpload from "../components/FormUpload/FormUpload";
import ImageScan from "../components/WebcamSearch/ImageScan";

function AI_Dashboard() {
  return (
    <div className="d-flex">
      <FormUpload />
      <ImageScan />
    </div>
  )
}

export default AI_Dashboard;
