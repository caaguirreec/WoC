import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import { useStore } from '../utils/store'

interface AvatarProps {
  position: [number, number, number]
}

export const Avatar = ({ position }: AvatarProps) => {
  const meshRef = useRef<Mesh>(null)
  const { avatarCustomization } = useStore()

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Add avatar animations here
    }
  })

  return (
    <group position={position}>
      {/* Body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <capsuleGeometry args={[0.5, 1, 4, 8]} />
        <meshStandardMaterial 
          color={avatarCustomization.bodyColor || '#ffd700'}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color={avatarCustomization.headColor || '#ffd700'}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
    </group>
  )
} 