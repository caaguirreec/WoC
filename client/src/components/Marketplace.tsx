import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, CanvasTexture } from 'three'
import { useMarketplaceStore } from '../utils/marketplaceStore'
import { CollisionSystem } from '../utils/collision'

interface MarketplaceProps {
  position: [number, number, number]
}

export const Marketplace = ({ position }: MarketplaceProps) => {
  const groupRef = useRef<Group>(null)
  const { toggleMarketplace } = useMarketplaceStore()
  const collisionSystem = CollisionSystem.getInstance()

  // Create text texture
  const textTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return null

    canvas.width = 256
    canvas.height = 64

    // Fill background
    context.fillStyle = '#8b4513'
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Add text
    context.fillStyle = '#ffffff'
    context.font = 'bold 32px Arial'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText('Bike Market', canvas.width / 2, canvas.height / 2)

    return new CanvasTexture(canvas)
  }, [])

  useEffect(() => {
    if (groupRef.current) {
      collisionSystem.addCollidableObject('marketplace', groupRef.current)
    }

    return () => {
      collisionSystem.removeCollidableObject('marketplace')
    }
  }, [])

  useFrame(() => {
    if (groupRef.current) {
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

      {/* Sign */}
      {textTexture && (
        <mesh position={[0, 2.5, 0]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[3, 0.75]} />
          <meshStandardMaterial 
            map={textTexture}
            transparent
            opacity={0.9}
          />
        </mesh>
      )}
    </group>
  )
} 