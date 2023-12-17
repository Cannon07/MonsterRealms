import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Ninja } from "./Ninja";
import { Tribal } from "./Tribal";
import { GreenSpikyBlob } from "./GreenSpikyBlob";
import { useState, useRef, useEffect } from "react";
import { Text } from "@react-three/drei";
import { easing } from "maath";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useCursor } from "@react-three/drei";

export const Experience = () => { 
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  useCursor(hovered);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0, 
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true,
      )
    } else {
      controlsRef.current.setLookAt(
        0,
        0, 
        10,
        0, 
        0, 
        0,
        true,
      )
    }
  }, [active]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls 
        ref={controlsRef} 
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      /> 
      <MonsterStage 
        texture={'textures/Anime_equirectangular-jpg_ninja_village_691794268_9692469.jpg'}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
        name="Ninja"
        color='#e9e5d1'
      >
        <Ninja scale={0.6} position-y={-1} hovered={hovered === "Ninja"} />
      </MonsterStage>
      <MonsterStage 
        texture={'textures/Anime_equirectangular-jpg_Tribal_World_1505254795_9692476.jpg'} 
        position-x={-2.5} 
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
        name="Tribal"
        color='#ac4133'
      >
        <Tribal scale={0.5} position-y={-1} hovered={hovered === "Tribal"} />
      </MonsterStage>
      <MonsterStage 
        texture={'textures/Digital_Painting_equirectangular-jpg_Swamp_Island_1116734067_9692482.jpg'} 
        position-x={2.5} 
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
        name="Blob"
        color="#475c3c"
      >
        <GreenSpikyBlob scale={0.3} position-y={-1} hovered={hovered === "Blob"} />
      </MonsterStage>
    </>
  );
}; 

const MonsterStage = ({ 
    children, 
    texture, 
    name, 
    color, 
    active, 
    setActive, 
    hovered, 
    setHovered,
    ...props 
  }) => {
  const map = useTexture(
    texture
  );

  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta)
  })
  
  return <group {...props}>
    <Text 
      font="fonts/Caprasimo-Regular.ttf" 
      fontSize={0.3}
      position={[0, -1.3, 0.051]}
      anchorY={"bottom"}>
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
    </Text>

    <RoundedBox 
      name={name}
      args={[2, 3, 0.1]} 
      onDoubleClick={() => setActive(active === name ? null : name)}
      onPointerEnter={() => setHovered(name)}
      onPointerLeave={() => setHovered(null)}
    >
      <MeshPortalMaterial side={THREE.DoubleSide} ref={portalMaterial}>
        <ambientLight intensity={0.5} />
        <Environment preset="sunset" />
        {children}
        <mesh>
          <sphereGeometry args={[7, 64, 64]} />
          <meshStandardMaterial map={map} side={THREE.BackSide} />
        </mesh>
      </MeshPortalMaterial>
    </RoundedBox>
  </group>;
}
