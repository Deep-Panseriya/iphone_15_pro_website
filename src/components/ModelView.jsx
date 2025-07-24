import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import Lights from './Lights'
import Iphone from './Iphone'
import * as THREE from 'three'
import { Suspense, useMemo } from 'react'
import Loader from './Loader'

export default function ModelView({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item
}) {
  // Memoize target vector for better performance
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

      {/* Scene Lights */}
      <Lights />

      {/* Orbit Controls with smooth inertia */}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        dampingFactor={0.1}
        enableDamping={true}
        target={target}
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
