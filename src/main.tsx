import React from "react";
import ReactDOM from "react-dom/client";
import dicomFile from "./assets/case1_008.dcm";
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

cornerstone.loadAndCacheImage("wadouri:" + dicomFile).then((image: unknown) => {
  console.log("image", image);
});

// const imageId = cornerstoneWADOImageLoader.wadouri.(dicomFile);
// cornerstoneWADOImageLoader.loadImage(imageId).then((image: unknown) => {
//   console.log(image);
// });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode></React.StrictMode>
);
