import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'

interface BuildingProps {
  position: [number, number, number]
  scale?: [number, number, number]
  color?: string
}

const Building = ({ position, scale = [1, 1, 1], color = '#8b4513' }: BuildingProps) => {
  return (
    <group position={position} scale={scale}>
      {/* Main building */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 3, 2]} />
        <meshStandardMaterial 
          color={color}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Windows */}
      <mesh position={[0, 0, 1]} castShadow receiveShadow>
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
  const buildingsPositions: [number, number, number][] = [
    [-15, 0, -15],
    [15, 0, -15],
    [-15, 0, 15],
    [15, 0, 15],
  ]

  const buildingColors = ['#8b4513', '#a0522d', '#8b4513', '#a0522d']

  return (
    <group>
      {buildingsPositions.map((position, index) => (
        <Building 
          key={index} 
          position={position}
          scale={[1 + Math.random() * 0.5, 1 + Math.random() * 0.5, 1 + Math.random() * 0.5]}
          color={buildingColors[index]}
        />
      ))}
    </group>
  )
} 