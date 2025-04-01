import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh, Group, Vector3 } from 'three'
import { InfoPanel } from './InfoPanel'

interface BuildingProps {
  position: [number, number, number]
  scale?: [number, number, number]
  color?: string
  onSelect: (position: Vector3) => void
}

const Building = ({ position, scale = [1, 1, 1], color = '#8b4513', onSelect }: BuildingProps) => {
  const meshRef = useRef<Mesh>(null)

  const handleClick = (event: any) => {
    event.stopPropagation()
    if (meshRef.current) {
      onSelect(meshRef.current.position)
    }
  }

  return (
    <group position={position} scale={scale}>
      {/* Main building */}
      <mesh ref={meshRef} castShadow receiveShadow onClick={handleClick}>
        <boxGeometry args={[2, 3, 2]} />
        <meshStandardMaterial 
          color={color}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Windows */}
      <mesh position={[0, 0, 1]} castShadow receiveShadow onClick={handleClick}>
        <boxGeometry args={[1.8, 2.8, 0.1]} />
        <meshStandardMaterial 
          color="#87ceeb"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

export const Buildings = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<{ position: Vector3; screenPosition: { x: number; y: number } } | null>(null)
  const { camera } = useThree()

  const handleBuildingSelect = (position: Vector3) => {
    const vector = position.clone()
    vector.project(camera)
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight
    setSelectedBuilding({ position, screenPosition: { x, y } })
  }

  const buildingsPositions: [number, number, number][] = [
    [-15, 0, -15],
    [15, 0, -15],
    [-15, 0, 15],
    [15, 0, 15],
  ]

  const buildingColors = ['#8b4513', '#a0522d', '#8b4513', '#a0522d']

  return (
    <>
      <group>
        {buildingsPositions.map((position, index) => (
          <Building 
            key={index} 
            position={position}
            scale={[1 + Math.random() * 0.5, 1 + Math.random() * 0.5, 1 + Math.random() * 0.5]}
            color={buildingColors[index]}
            onSelect={handleBuildingSelect}
          />
        ))}
      </group>
      {selectedBuilding && (
        <InfoPanel
          title="Building"
          description={`A building at position (${selectedBuilding.position.x.toFixed(1)}, ${selectedBuilding.position.y.toFixed(1)}, ${selectedBuilding.position.z.toFixed(1)})`}
          position={selectedBuilding.screenPosition}
          onClose={() => setSelectedBuilding(null)}
        />
      )}
    </>
  )
} 