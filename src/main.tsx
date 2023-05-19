import React, { useRef } from "react";
import ReactDOM from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./main.css";
// @ts-ignore
import dicomFile from "./assets/case1_008.dcm";
import cornerstone from "cornerstone-core";
// @ts-ignore
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";
import { createTexture } from "./texture";
import * as THREE from "three";

// Load image
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// @ts-ignore
cornerstone.loadAndCacheImage("wadouri:" + dicomFile).then(({ imageFrame }) => {
  const texture = createTexture(imageFrame);
  const aspect = imageFrame.columns / imageFrame.rows;

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <Canvas>
        <color attach="background" args={["#fdfcf9"]} />
        <camera position={[0, 0, -30]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <RotatingPlaneMesh texture={texture} planeWidth={4} aspect={aspect} />
        <OrbitControls />
      </Canvas>
    </React.StrictMode>
  );
});

const RotatingPlaneMesh = ({
  texture,
  planeWidth,
  aspect,
}: {
  texture: THREE.Texture;
  planeWidth: number;
  aspect: number;
}) => {
  const meshRef = useRef<THREE.Mesh>();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.4;
  });

  return (
    //@ts-ignore
    <mesh position={[0, 0, 0]} ref={meshRef}>
      <planeGeometry args={[planeWidth, planeWidth * aspect, 1, 1]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};
