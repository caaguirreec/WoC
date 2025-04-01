import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import {  Group, Box3 } from 'three'
import { CollisionSystem } from '../utils/collision'

interface TreesProps {
  position: [number, number, number]
}

const createTree = (position: [number, number, number], size: number = 1, treeId: string) => {
  const groupRef = useRef<Group>(null)
  const collisionSystem = CollisionSystem.getInstance()

  useEffect(() => {
    if (groupRef.current) {
      // Create a custom bounding box for each tree
      const box = new Box3().setFromObject(groupRef.current)
      box.min.y = 0 // Only check collisions from ground level
      box.max.y = 1.5 // Limit collision height
      box.min.x -= 0.5 // Add some padding
      box.max.x += 0.5
      box.min.z -= 0.5
      box.max.z += 0.5
      collisionSystem.addCollidableObject(treeId, groupRef.current)
    }

    return () => {
      collisionSystem.removeCollidableObject(treeId)
    }
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      const box = new Box3().setFromObject(groupRef.current)
      box.min.y = 0
      box.max.y = 1.5
      box.min.x -= 0.5
      box.max.x += 0.5
      box.min.z -= 0.5
      box.max.z += 0.5
      collisionSystem.updateObjectBounds(treeId, groupRef.current)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Trunk */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.2 * size, 0.3 * size, 2 * size, 8]} />
        <meshStandardMaterial 
          color="#4a2f1c"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      {/* Crown */}
      <mesh position={[0, 1.5 * size, 0]} castShadow receiveShadow>
        <coneGeometry args={[1 * size, 2 * size, 8]} />
        <meshStandardMaterial 
          color="#2d5a27"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}

export const Trees = ({ position }: TreesProps) => {
  // Create tree positions in a more natural distribution
  const treePositions: [number, number, number][] = [
    // Small trees
    [-15, 0, -15], [-12, 0, -18], [-8, 0, -12], [-5, 0, -15],
    [5, 0, -18], [8, 0, -12], [12, 0, -15], [15, 0, -18],
    
    // Medium trees
    [-18, 0, -8], [-14, 0, -5], [-10, 0, -8], [-6, 0, -5],
    [6, 0, -8], [10, 0, -5], [14, 0, -8], [18, 0, -5],
    
    // Large trees
    [-16, 0, 0], [-12, 0, 2], [-8, 0, -2], [-4, 0, 0],
    [4, 0, 2], [8, 0, -2], [12, 0, 0], [16, 0, 2],
    
    // Random clusters
    [-13, 0, 5], [-9, 0, 8], [-5, 0, 5], [-1, 0, 8],
    [1, 0, 5], [5, 0, 8], [9, 0, 5], [13, 0, 8],
  ]

  return (
    <group position={position}>
      {treePositions.map((pos, index) => (
        <group key={index}>
          {createTree(pos, 0.8 + Math.random() * 0.4, `tree-${index}`)}
        </group>
      ))}
    </group>
  )
} 