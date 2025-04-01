import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'
import { useMarketplaceStore } from '../utils/marketplaceStore'
import { CollisionSystem } from '../utils/collision'

interface MarketplaceProps {
  position: [number, number, number]
}

export const Marketplace = ({ position }: MarketplaceProps) => {
  const groupRef = useRef<Group>(null)
  const { toggleMarketplace } = useMarketplaceStore()
  const collisionSystem = CollisionSystem.getInstance()

  useEffect(() => {
    if (groupRef.current) {
      collisionSystem.addCollidableObject('marketplace', groupRef.current)
    }

    return () => {
      collisionSystem.removeCollidableObject('marketplace')
    }
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Update collision bounds
      collisionSystem.updateObjectBounds('marketplace', groupRef.current)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Building */}
      <mesh castShadow receiveShadow>
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
      <mesh 
        position={[0, -0.5, 1.5]} 
        castShadow 
        receiveShadow
        onClick={(e) => {
          e.stopPropagation()
          toggleMarketplace()
        }}
      >
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