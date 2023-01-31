interface BoxProps {
  colour: number;
  position: [number, number, number];
}
export const Box = ({ colour, position }: BoxProps) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial opacity={1} color={"white"} />
    </mesh>
  );
};
