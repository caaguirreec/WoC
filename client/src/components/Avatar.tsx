import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3, Group, MeshStandardMaterial } from 'three'
import { useStore } from '../utils/store'
import { CollisionSystem } from '../utils/collision'

interface AvatarProps {
  position: [number, number, number]
}

export const Avatar = ({ position }: AvatarProps) => {
  const groupRef = useRef<Group>(null)
  const { avatarCustomization } = useStore()
  const moveSpeed = 0.1
  const moveDirection = useRef(new Vector3())
  const pedalRotation = useRef<number>(0)
  const collisionSystem = CollisionSystem.getInstance()
  const lastValidPosition = useRef(new Vector3())

  // Create reusable materials
  const frameMaterial = new MeshStandardMaterial({
    color: '#2c3e50',
    roughness: 0.3,
    metalness: 0.7,
    envMapIntensity: 1,
  })

  const wheelMaterial = new MeshStandardMaterial({
    color: '#1a1a1a',
    roughness: 0.4,
    metalness: 0.6,
    envMapIntensity: 1,
  })

  const chainMaterial = new MeshStandardMaterial({
    color: '#1a1a1a',
    roughness: 0.2,
    metalness: 0.8,
    envMapIntensity: 1,
  })

  const cyclistMaterial = new MeshStandardMaterial({
    color: avatarCustomization.bodyColor || '#3498db',
    roughness: 0.7,
    metalness: 0.2,
    envMapIntensity: 0.5,
  })

  const helmetMaterial = new MeshStandardMaterial({
    color: '#e74c3c',
    roughness: 0.5,
    metalness: 0.1,
    envMapIntensity: 0.8,
    transparent: true,
    opacity: 0.9,
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          moveDirection.current.z = -1
          break
        case 's':
        case 'arrowdown':
          moveDirection.current.z = 1
          break
        case 'a':
        case 'arrowleft':
          moveDirection.current.x = -1
          break
        case 'd':
        case 'arrowright':
          moveDirection.current.x = 1
          break
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          moveDirection.current.z = 0
          break
        case 's':
        case 'arrowdown':
          moveDirection.current.z = 0
          break
        case 'a':
        case 'arrowleft':
          moveDirection.current.x = 0
          break
        case 'd':
        case 'arrowright':
          moveDirection.current.x = 0
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      // Store last valid position
      lastValidPosition.current.copy(groupRef.current.position)

      // Calculate new position
      const newPosition = new Vector3(
        groupRef.current.position.x + moveDirection.current.x * moveSpeed,
        groupRef.current.position.y,
        groupRef.current.position.z + moveDirection.current.z * moveSpeed
      )

      // Check for collisions before moving with a smaller radius
      if (!collisionSystem.checkCollision(newPosition, 0.2)) {
        groupRef.current.position.copy(newPosition)
        
        // Rotate entire group to face movement direction
        if (moveDirection.current.length() > 0) {
          groupRef.current.rotation.y = Math.atan2(
            moveDirection.current.x,
            moveDirection.current.z
          )
          // Rotate pedals when moving
          const newRotation = pedalRotation.current
          pedalRotation.current = newRotation
        }
      } else {
        // If collision detected, try to slide along walls
        const slideX = new Vector3(
          groupRef.current.position.x + moveDirection.current.x * moveSpeed,
          groupRef.current.position.y,
          groupRef.current.position.z
        )
        const slideZ = new Vector3(
          groupRef.current.position.x,
          groupRef.current.position.y,
          groupRef.current.position.z + moveDirection.current.z * moveSpeed
        )

        if (!collisionSystem.checkCollision(slideX, 0.2)) {
          groupRef.current.position.copy(slideX)
        } else if (!collisionSystem.checkCollision(slideZ, 0.2)) {
          groupRef.current.position.copy(slideZ)
        } else {
          // If both slides fail, revert to last valid position
          groupRef.current.position.copy(lastValidPosition.current)
        }
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Main Frame */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 0.5]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Down Tube */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1.2, 0.1, 0.1]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Seat Tube */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Wheels */}
      <mesh position={[-1, 0.5, 0]} castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <primitive object={wheelMaterial} />
      </mesh>
      <mesh position={[1, 0.5, 0]} castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <primitive object={wheelMaterial} />
      </mesh>

      {/* Chain */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.05, 0.05]} />
        <primitive object={chainMaterial} />
      </mesh>

      {/* Pedals */}
      <group position={[0, 0.5, 0]} rotation={[0, pedalRotation.current, 0]}>
        <mesh position={[0.2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.1, 0.1]} />
          <primitive object={frameMaterial} />
        </mesh>
        <mesh position={[-0.2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.1, 0.1]} />
          <primitive object={frameMaterial} />
        </mesh>
      </group>

      {/* Crank Arms */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow rotation={[0, pedalRotation.current, 0]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Handlebars */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Seat */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.1, 0.2]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Cyclist Body */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
        <primitive object={cyclistMaterial} />
      </mesh>

      {/* Cyclist Head */}
      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <primitive object={cyclistMaterial} />
      </mesh>

      {/* Helmet */}
      <mesh position={[0, 1.9, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <primitive object={helmetMaterial} />
      </mesh>
    </group>
  )
} 