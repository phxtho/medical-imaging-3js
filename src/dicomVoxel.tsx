import { FC, useEffect, useState } from "react";
import { Box } from "./box";
import dicomFile from "./assets/case1_008.dcm";
import cornerstone, { Image } from "cornerstone-core";
// @ts-ignore
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

const computeCoord = (index: number) => {
  const x = Math.floor(index / 512);
  const y = index - 512 * x;

  return [x, y];
};

const DicomVoxel: FC = () => {
  const [image, setImage] = useState<Image>();
  useEffect(() => {
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

    cornerstone.loadAndCacheImage("wadouri:" + dicomFile).then((data) => {
      console.log(data);

      // image.imageFrame.pixelData
      //setImage([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    });
  }, []);

  if (!image) return null;

  return (
    <>
      {/* {[0, 2].slice(0, 2).map((pixel, index) => {
        // const [x, y] = computeCoord(index);
        return <Box colour={0} position={[0, 0, 0]} />;
      })} */}
      <Box colour={0} position={[0, 0, 0]} />
    </>
  );
};

export default DicomVoxel;
