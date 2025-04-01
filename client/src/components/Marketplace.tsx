import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useStore } from '../utils/store'

interface MarketplaceProps {
  position: [number, number, number]
}

export const Marketplace = ({ position }: MarketplaceProps) => {
  const meshRef = useRef<Mesh>(null)
  const { addToInventory } = useStore()

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Add subtle animations or effects here if needed
    }
  })

  return (
    <group position={position}>
      {/* Building */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial 
          color="#8b4513"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <coneGeometry args={[2, 1, 4]} />
        <meshStandardMaterial 
          color="#8b0000"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Door */}
      <mesh position={[0, -0.5, 1.5]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.5, 0.1]} />
        <meshStandardMaterial 
          color="#4a4a4a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
} 