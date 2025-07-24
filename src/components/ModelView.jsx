import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import Lights from './Lights'
import * as THREE from 'three'
import { lazy, Suspense, useMemo } from 'react'
import Loader from './Loader'

// Lazy-load Iphone component
const Iphone = lazy(() => import('./Iphone'))

export default function ModelView({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item
}) {
  // Memoize the target vector to avoid re-creating every render
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), [])

  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      {/* Perspective Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      {/* Lighting setup */}
      <Lights />

      {/* Orbit Controls */}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={target}
        enabled={index === 1} // Only enable when active
        onEnd={() => {
          if (controlRef.current) {
            setRotationState(controlRef.current.getAzimuthalAngle())
          }
        }}
      />

      {/* 3D Model Group */}
      <group
        ref={groupRef}
        name={index === 1 ? 'small' : 'large'}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <Iphone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  )
}
