import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Sky } from '@react-three/drei'
import { Suspense } from 'react'
import { Avatar } from '../components/Avatar'
import { Ground } from '../components/Ground'
import { Marketplace } from '../components/Marketplace'
import { Trees } from '../components/Trees'
import { Buildings } from '../components/Buildings'
import { Mountains } from '../components/Mountains'

export const World = () => {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 75 }}>
      <Suspense fallback={null}>
        <Sky 
          distance={450000} 
          inclination={0.5} 
          azimuth={0.25} 
          rayleigh={0.5}
          turbidity={10}
        />
        <Environment preset="sunset" />
        
        {/* Mountains */}
        <Mountains position={[0, 0, 0]} />
        
        {/* Ground */}
        <Ground />
        
        {/* Trees */}
        <Trees position={[2, 1, 1]} />
        
        {/* Buildings */}
        <Buildings />
        
        {/* Cycling Path */}
        {/*<CyclingPath />*/}
        
        {/* Avatar */}
        <Avatar position={[0, 0, 0]} />
        
        {/* Marketplace */}
        <Marketplace position={[5, 0, 0]} />
        
        {/* Controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={20}
          target={[0, 0, 0]}
        />
      </Suspense>
    </Canvas>
  )
} 