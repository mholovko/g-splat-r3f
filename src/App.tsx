import { OrbitControls, StatsGl } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Box } from './box';
import { Splat } from './splat-object';

function App() {
  return (
    <Canvas className="h-full w-full bg-black" gl={{antialias:false}}>
      <StatsGl />
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1, 0, 0]} />
      <Box position={[1, 0, 0]} />
      <group position={[3, 0, 0]}>
        <Splat />
      </group>
    </Canvas>
  );
}

export default App;
