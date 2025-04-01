import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { CollisionSystem } from '../utils/collision'

interface MountainsProps {
  position: [number, number, number]
}

export const Mountains = ({ position }: MountainsProps) => {
  const groupRef = useRef<Group>(null)
  const collisionSystem = CollisionSystem.getInstance()

  useEffect(() => {
    if (groupRef.current) {
      collisionSystem.addCollidableObject('mountains', groupRef.current)
    }

    return () => {
      collisionSystem.removeCollidableObject('mountains')
    }
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      collisionSystem.updateObjectBounds('mountains', groupRef.current)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Background Mountains */}
      <mesh position={[-20, 0, -30]} castShadow receiveShadow>
        <coneGeometry args={[8, 12, 4]} />
        <meshStandardMaterial 
          color="#4a4a4a"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[-10, 0, -30]} castShadow receiveShadow>
        <coneGeometry args={[6, 10, 4]} />
        <meshStandardMaterial 
          color="#4a4a4a"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[0, 0, -30]} castShadow receiveShadow>
        <coneGeometry args={[10, 15, 4]} />
        <meshStandardMaterial 
          color="#4a4a4a"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[10, 0, -30]} castShadow receiveShadow>
        <coneGeometry args={[7, 11, 4]} />
        <meshStandardMaterial 
          color="#4a4a4a"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[20, 0, -30]} castShadow receiveShadow>
        <coneGeometry args={[9, 13, 4]} />
        <meshStandardMaterial 
          color="#4a4a4a"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Midground Mountains */}
      <mesh position={[-15, 0, -20]} castShadow receiveShadow>
        <coneGeometry args={[6, 9, 4]} />
        <meshStandardMaterial 
          color="#666666"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[-5, 0, -20]} castShadow receiveShadow>
        <coneGeometry args={[8, 12, 4]} />
        <meshStandardMaterial 
          color="#666666"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[5, 0, -20]} castShadow receiveShadow>
        <coneGeometry args={[7, 10, 4]} />
        <meshStandardMaterial 
          color="#666666"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[15, 0, -20]} castShadow receiveShadow>
        <coneGeometry args={[9, 13, 4]} />
        <meshStandardMaterial 
          color="#666666"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Foreground Mountains */}
      <mesh position={[-10, 0, -10]} castShadow receiveShadow>
        <coneGeometry args={[5, 8, 4]} />
        <meshStandardMaterial 
          color="#808080"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[0, 0, -10]} castShadow receiveShadow>
        <coneGeometry args={[7, 11, 4]} />
        <meshStandardMaterial 
          color="#808080"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[10, 0, -10]} castShadow receiveShadow>
        <coneGeometry args={[6, 9, 4]} />
        <meshStandardMaterial 
          color="#808080"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
} 