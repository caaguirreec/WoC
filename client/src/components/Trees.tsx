import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh, Group, Vector3 } from 'three'
import { InfoPanel } from './InfoPanel'

interface TreeProps {
  position: [number, number, number]
  scale?: [number, number, number]
  onSelect: (position: Vector3) => void
}

const Tree = ({ position, scale = [1, 1, 1], onSelect }: TreeProps) => {
  const meshRef = useRef<Mesh>(null)

  const handleClick = (event: any) => {
    event.stopPropagation()
    if (meshRef.current) {
      onSelect(meshRef.current.position)
    }
  }

  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh ref={meshRef} castShadow receiveShadow onClick={handleClick}>
        <cylinderGeometry args={[0.2, 0.2, 2, 8]} />
        <meshStandardMaterial 
          color="#4a2f1c"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Leaves */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow onClick={handleClick}>
        <coneGeometry args={[1, 2, 8]} />
        <meshStandardMaterial 
          color="#2d5a27"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}

export const Trees = () => {
  const [selectedTree, setSelectedTree] = useState<{ position: Vector3; screenPosition: { x: number; y: number } } | null>(null)
  const { camera } = useThree()

  const handleTreeSelect = (position: Vector3) => {
    const vector = position.clone()
    vector.project(camera)
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight
    setSelectedTree({ position, screenPosition: { x, y } })
  }

  const treesPositions: [number, number, number][] = [
    [-10, 0, -10],
    [15, 0, -8],
    [-8, 0, 12],
    [12, 0, 15],
    [-15, 0, 5],
    [8, 0, -15],
  ]

  return (
    <>
      <group>
        {treesPositions.map((position, index) => (
          <Tree 
            key={index} 
            position={position}
            scale={[0.8 + Math.random() * 0.4, 0.8 + Math.random() * 0.4, 0.8 + Math.random() * 0.4]}
            onSelect={handleTreeSelect}
          />
        ))}
      </group>
      {selectedTree && (
        <InfoPanel
          title="Tree"
          description={`A beautiful tree at position (${selectedTree.position.x.toFixed(1)}, ${selectedTree.position.y.toFixed(1)}, ${selectedTree.position.z.toFixed(1)})`}
          position={selectedTree.screenPosition}
          onClose={() => setSelectedTree(null)}
        />
      )}
    </>
  )
} 