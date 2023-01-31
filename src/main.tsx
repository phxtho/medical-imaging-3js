import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./main.css";
import DicomVoxel from "./dicomVoxel";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Canvas>
      <color attach="background" args={["white"]} />
      <camera position={[0, 0, -20]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <DicomVoxel />
      <OrbitControls />
    </Canvas>
  </React.StrictMode>
);
