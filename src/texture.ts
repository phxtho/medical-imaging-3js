// Utils for generating a data texture out of raw pixel inensity values
import * as THREE from "three";

export const generateTextureData = (
  pixelData: Uint16Array,
  largestPixelValue: number,
  columns: number,
  rows: number
) => {
  const channels = 4;
  const size = columns * rows;
  const data = new Uint8Array(size * channels);

  pixelData.forEach((pixel: number, index: number) => {
    // convert pixel to [0-255] range
    const intensity = Math.floor((pixel / largestPixelValue) * 255);

    const stride = index * channels;
    // Fill in RGB values
    for (let channel = 0; channel < channels - 1; channel++) {
      data[stride + channel] = intensity;
    }
    // Fill in Alpha Channel
    data[stride + 3] = 255;
  });

  return data;
};

export interface ImageFrame {
  pixelData: Uint16Array;
  largestPixelValue: number;
  columns: number;
  rows: number;
}

export const createTexture = (imageFrame: ImageFrame): THREE.DataTexture => {
  const { pixelData, largestPixelValue, columns, rows } = imageFrame;
  const buffer = generateTextureData(
    pixelData,
    largestPixelValue,
    columns,
    rows
  );

  const texture = new THREE.DataTexture(buffer, columns, rows);
  texture.needsUpdate = true;
  return texture;
};
