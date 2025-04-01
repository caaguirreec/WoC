import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, CatmullRomCurve3, Vector3 } from 'three'

const createPathCurve = () => {
  const points = [
    new Vector3(-20, 0.1, -20),
    new Vector3(-10, 0.1, -10),
    new Vector3(0, 0.1, 0),
    new Vector3(10, 0.1, 10),
    new Vector3(20, 0.1, 20),
  ]
  return new CatmullRomCurve3(points)
}

export const CyclingPath = () => {
  const curve = createPathCurve()
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      // Add subtle animation or effects here if needed
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
      <tubeGeometry args={[curve, 100, 0.5, 8, false]} />
      <meshStandardMaterial 
        color="#4a4a4a"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
} 