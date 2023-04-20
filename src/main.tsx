import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./main.css";
// @ts-ignore
import dicomFile from "./assets/case1_008.dcm";
import cornerstone, { Image } from "cornerstone-core";
// @ts-ignore
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";
import { createTexture } from "./texture";
import * as THREE from "three";

// Load image
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// @ts-ignore
const { imageFrame } = await cornerstone.loadAndCacheImage(
  "wadouri:" + dicomFile
);

const texture = createTexture(imageFrame);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Canvas>
      <color attach="background" args={["white"]} />
      <camera position={[0, 0, -20]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[imageFrame.columns, imageFrame.rows, 1, 1]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
      <OrbitControls />
    </Canvas>
  </React.StrictMode>
);
