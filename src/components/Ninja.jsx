/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/models/Ninja.gltf -o src/components/Ninja.jsx -r public 
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Ninja({hovered, ...props}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Ninja.gltf')
  const { actions } = useAnimations(animations, group)
  
  useEffect(() => {
    const anim = hovered ? "Wave": "Idle"
    actions[anim].reset().fadeIn(0.5).play();
    return () => actions[anim].fadeOut(0.5);
  }, [hovered]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <skinnedMesh name="Ninja" geometry={nodes.Ninja.geometry} material={materials.Atlas} skeleton={nodes.Ninja.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Ninja.gltf')
