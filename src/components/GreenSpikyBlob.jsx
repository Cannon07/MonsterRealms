/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/models/GreenSpikyBlob.gltf -o src/components/GreenSpikyBlob.jsx -r public 
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function GreenSpikyBlob({hovered, ...props}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/GreenSpikyBlob.gltf')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const anim = hovered ? "Dance" : "Idle"
    actions[anim].reset().fadeIn(0.5).play();
    return () => actions[anim].fadeOut(0.5);
  }, [hovered]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <skinnedMesh name="GreenSpiky_Blob" geometry={nodes.GreenSpiky_Blob.geometry} material={materials.Atlas} skeleton={nodes.GreenSpiky_Blob.skeleton} />
          <skinnedMesh name="GreenSpiky_Blob002" geometry={nodes.GreenSpiky_Blob002.geometry} material={materials.Atlas} skeleton={nodes.GreenSpiky_Blob002.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/GreenSpikyBlob.gltf')