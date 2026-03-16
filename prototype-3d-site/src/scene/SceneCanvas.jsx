import { Html, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { sceneHotspots } from "../data/content";

const defaultFocus = {
  focusCamera: [6.8, 4.0, 13.6],
  focusTarget: [0.7, 1.35, -1.45],
};

const cameraBounds = {
  minX: -6.8,
  maxX: 6.8,
  minY: 1.9,
  maxY: 6.1,
  minZ: 2.6,
  maxZ: 12.8,
  targetMinX: -3.8,
  targetMaxX: 4.8,
  targetMinY: 0.9,
  targetMaxY: 2.6,
  targetMinZ: -4.8,
  targetMaxZ: 1.2,
};

function CameraRig({ controlsRef, resetSignal }) {
  const { camera } = useThree();
  const cameraVector = useRef(new THREE.Vector3());
  const targetVector = useRef(new THREE.Vector3());
  const hasUserInteracted = useRef(false);
  const isResetting = useRef(true);

  useEffect(() => {
    const controls = controlsRef.current;

    if (!controls) {
      return undefined;
    }

    const handleStart = () => {
      hasUserInteracted.current = true;
      isResetting.current = false;
      controls.autoRotate = false;
    };

    controls.addEventListener("start", handleStart);

    return () => {
      controls.removeEventListener("start", handleStart);
    };
  }, [controlsRef]);

  useEffect(() => {
    hasUserInteracted.current = false;
    isResetting.current = true;

    if (controlsRef.current) {
      controlsRef.current.autoRotate = true;
    }
  }, [controlsRef, resetSignal]);

  useFrame(() => {
    const controls = controlsRef.current;

    if (!isResetting.current && hasUserInteracted.current) {
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, cameraBounds.minX, cameraBounds.maxX);
      camera.position.y = THREE.MathUtils.clamp(camera.position.y, cameraBounds.minY, cameraBounds.maxY);
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, cameraBounds.minZ, cameraBounds.maxZ);

      if (controls) {
        controls.target.x = THREE.MathUtils.clamp(controls.target.x, cameraBounds.targetMinX, cameraBounds.targetMaxX);
        controls.target.y = THREE.MathUtils.clamp(controls.target.y, cameraBounds.targetMinY, cameraBounds.targetMaxY);
        controls.target.z = THREE.MathUtils.clamp(controls.target.z, cameraBounds.targetMinZ, cameraBounds.targetMaxZ);
        controls.update();
      }
      return;
    }

    cameraVector.current.set(...defaultFocus.focusCamera);
    targetVector.current.set(...defaultFocus.focusTarget);

    camera.position.lerp(cameraVector.current, 0.045);

    if (controls) {
      controls.target.lerp(targetVector.current, 0.08);
      controls.update();

      const cameraSettled = camera.position.distanceTo(cameraVector.current) < 0.08;
      const targetSettled = controls.target.distanceTo(targetVector.current) < 0.08;

      if (cameraSettled && targetSettled) {
        isResetting.current = false;
      }
    } else {
      camera.lookAt(targetVector.current);
      isResetting.current = false;
    }
  });

  return null;
}

function HotspotMarker({ hotspot, activeHotspot, onSelectHotspot }) {
  const baseRef = useRef(null);
  const stemRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activeHotspot === hotspot.id;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (baseRef.current) {
      baseRef.current.position.y = 0.04 + Math.sin(time * 1.3) * 0.01;
      const scale = isActive ? 1.02 + Math.sin(time * 1.9) * 0.02 : 0.98 + Math.sin(time * 1.3) * 0.01;
      baseRef.current.scale.set(scale, 1, scale);
    }

    if (stemRef.current) {
      stemRef.current.position.y = 0.34 + Math.sin(time * 1.4) * 0.03;
    }
  });

  return (
    <group position={hotspot.position}>
      <mesh castShadow position={[0, 0.04, 0]} ref={baseRef}>
        <boxGeometry args={[0.46, 0.05, 0.26]} />
        <meshStandardMaterial
          color={isActive ? "#d4ddd8" : "#f1f0ec"}
          emissive={isActive ? "#7a918a" : "#1a424a"}
          emissiveIntensity={isActive ? 0.25 : 0.12}
          roughness={0.32}
          metalness={0.08}
        />
      </mesh>

      <mesh position={[0, 0.34, 0]} ref={stemRef}>
        <boxGeometry args={[0.02, 0.5, 0.02]} />
        <meshStandardMaterial color="#7a918a" emissive="#7a918a" emissiveIntensity={0.14} />
      </mesh>

      <Html position={[0, 0.82, 0]} transform distanceFactor={10}>
        <div
          className="scene-node-wrap"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            className={isActive ? "scene-node is-active" : "scene-node"}
            onBlur={() => setIsHovered(false)}
            onClick={() => onSelectHotspot(hotspot)}
            onFocus={() => setIsHovered(true)}
            type="button"
          >
            <strong>{hotspot.label}</strong>
          </button>
          {isHovered ? <div className="scene-node-tooltip">{hotspot.title}</div> : null}
        </div>
      </Html>
    </group>
  );
}

function RoomShell() {
  return (
    <group>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 22]} />
        <meshStandardMaterial color="#d8d2c8" metalness={0.03} roughness={0.96} />
      </mesh>

      <mesh receiveShadow position={[0, 3.6, -7]}>
        <boxGeometry args={[30, 7.2, 0.2]} />
        <meshStandardMaterial color="#ced6d0" metalness={0.06} roughness={0.84} />
      </mesh>

      <mesh receiveShadow position={[0, 7.2, 0]}>
        <boxGeometry args={[30, 0.16, 22]} />
        <meshStandardMaterial color="#ece8e1" metalness={0.02} roughness={0.94} />
      </mesh>

      <mesh receiveShadow position={[-8.8, 3.6, 0]}>
        <boxGeometry args={[0.2, 7.2, 22]} />
        <meshStandardMaterial color="#dfe5e0" metalness={0.04} roughness={0.88} />
      </mesh>

      <mesh receiveShadow position={[8.8, 3.6, 0]}>
        <boxGeometry args={[0.2, 7.2, 22]} />
        <meshStandardMaterial color="#dfe5e0" metalness={0.04} roughness={0.88} />
      </mesh>

      <mesh receiveShadow position={[-7.3, 3.6, 7.4]}>
        <boxGeometry args={[3.2, 7.2, 0.18]} />
        <meshStandardMaterial color="#e4e8e2" metalness={0.03} roughness={0.88} />
      </mesh>

      <mesh receiveShadow position={[7.3, 3.6, 7.4]}>
        <boxGeometry args={[3.2, 7.2, 0.18]} />
        <meshStandardMaterial color="#e4e8e2" metalness={0.03} roughness={0.88} />
      </mesh>

      <mesh receiveShadow position={[0, 6.7, 7.4]}>
        <boxGeometry args={[30, 1.2, 0.18]} />
        <meshStandardMaterial color="#e7ebe6" metalness={0.03} roughness={0.9} />
      </mesh>

      <mesh position={[0, 6.76, -2.5]}>
        <boxGeometry args={[10.2, 0.16, 1.6]} />
        <meshStandardMaterial color="#f3efe7" emissive="#f3efe7" emissiveIntensity={0.42} />
      </mesh>

      <mesh position={[-4.6, 5.0, -6.86]}>
        <boxGeometry args={[4.8, 2.8, 0.04]} />
        <meshStandardMaterial color="#f4f7f4" transparent opacity={0.18} />
      </mesh>

      <mesh position={[-4.6, 5.0, -6.9]}>
        <boxGeometry args={[4.4, 2.4, 0.02]} />
        <meshStandardMaterial color="#eef3ef" emissive="#eef3ef" emissiveIntensity={0.14} transparent opacity={0.44} />
      </mesh>

      <mesh receiveShadow position={[0, 0.02, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[13, 7.8]} />
        <meshStandardMaterial color="#cfd6cf" roughness={0.98} metalness={0.02} />
      </mesh>

      <mesh position={[4.7, 3.4, -6.86]}>
        <boxGeometry args={[4.2, 3.0, 0.08]} />
        <meshStandardMaterial color="#d5dfdb" emissive="#e8efec" emissiveIntensity={0.04} transparent opacity={0.16} />
      </mesh>

      <mesh position={[4.7, 3.4, -6.78]}>
        <boxGeometry args={[4.6, 3.4, 0.04]} />
        <meshStandardMaterial color="#eef2ef" transparent opacity={0.12} />
      </mesh>

      <mesh position={[0.2, 4.7, -6.88]}>
        <boxGeometry args={[5.8, 2.9, 0.04]} />
        <meshStandardMaterial color="#f7faf8" transparent opacity={0.12} />
      </mesh>

      <mesh position={[0.2, 4.7, -6.92]}>
        <boxGeometry args={[5.2, 2.3, 0.02]} />
        <meshStandardMaterial color="#d7e8ee" emissive="#d7e8ee" emissiveIntensity={0.14} transparent opacity={0.52} />
      </mesh>

      <mesh position={[0.2, 4.7, -6.86]}>
        <boxGeometry args={[0.12, 2.9, 0.08]} />
        <meshStandardMaterial color="#8ba09b" roughness={0.42} />
      </mesh>
      <mesh position={[0.2, 4.7, -6.86]}>
        <boxGeometry args={[5.8, 0.12, 0.08]} />
        <meshStandardMaterial color="#8ba09b" roughness={0.42} />
      </mesh>
      <mesh position={[-2.7, 4.7, -6.86]}>
        <boxGeometry args={[0.12, 2.9, 0.08]} />
        <meshStandardMaterial color="#8ba09b" roughness={0.42} />
      </mesh>
      <mesh position={[3.1, 4.7, -6.86]}>
        <boxGeometry args={[0.12, 2.9, 0.08]} />
        <meshStandardMaterial color="#8ba09b" roughness={0.42} />
      </mesh>

      <mesh position={[0.2, 4.5, -7.02]}>
        <planeGeometry args={[5, 2.05]} />
        <meshBasicMaterial color="#bcd2dc" />
      </mesh>

      {[
        [-1.6, 4.1, -7.03, 0.72],
        [0.3, 4.45, -7.03, 1.02],
        [1.8, 4.0, -7.03, 0.82],
      ].map(([x, y, z, h], index) => (
        <mesh key={index} position={[x, y, z]}>
          <boxGeometry args={[0.52, h, 0.02]} />
          <meshBasicMaterial color="#8da3ad" />
        </mesh>
      ))}

      <gridHelper args={[30, 40, "#7a918a", "#d6d8d3"]} position={[0, 0.01, 0]} />
    </group>
  );
}

function SecondaryTable() {
  return (
    <group position={[-3.4, 0, 3.0]}>
      <RoundedBox args={[1.9, 0.1, 1.0]} castShadow position={[0, 0.76, 0]} radius={0.06}>
        <meshStandardMaterial color="#d8c8b1" roughness={0.44} />
      </RoundedBox>

      {[
        [-0.76, 0.36, -0.34],
        [0.76, 0.36, -0.34],
        [-0.76, 0.36, 0.34],
        [0.76, 0.36, 0.34],
      ].map((position, index) => (
        <mesh castShadow key={index} position={position}>
          <boxGeometry args={[0.1, 0.72, 0.1]} />
          <meshStandardMaterial color="#516863" metalness={0.22} roughness={0.52} />
        </mesh>
      ))}

      <RoundedBox args={[0.5, 0.14, 0.38]} castShadow position={[0.32, 0.9, 0.08]} radius={0.03}>
        <meshStandardMaterial color="#1a424a" emissive="#1a424a" emissiveIntensity={0.18} />
      </RoundedBox>

      <mesh castShadow position={[-0.36, 0.84, -0.06]}>
        <boxGeometry args={[0.4, 0.03, 0.3]} />
        <meshStandardMaterial color="#f7f5f1" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[-0.34, 0.87, 0.1]}>
        <boxGeometry args={[0.15, 0.06, 0.2]} />
        <meshStandardMaterial color="#d4b691" roughness={0.76} />
      </mesh>
    </group>
  );
}

function VisitorChair({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow position={[0, 0.42, 0]}>
        <boxGeometry args={[0.46, 0.08, 0.46]} />
        <meshStandardMaterial color="#536863" roughness={0.58} />
      </mesh>
      <mesh castShadow position={[0, 0.76, -0.18]}>
        <boxGeometry args={[0.46, 0.56, 0.08]} />
        <meshStandardMaterial color="#536863" roughness={0.58} />
      </mesh>
      {[
        [-0.16, 0.18, -0.16],
        [0.16, 0.18, -0.16],
        [-0.16, 0.18, 0.16],
        [0.16, 0.18, 0.16],
      ].map((leg, index) => (
        <mesh castShadow key={index} position={leg}>
          <boxGeometry args={[0.05, 0.36, 0.05]} />
          <meshStandardMaterial color="#394a51" metalness={0.28} roughness={0.42} />
        </mesh>
      ))}
    </group>
  );
}

function DeskCluster({
  position = [0.25, 0, -0.25],
  rotation = [0, 0, 0],
  accent = "#1a424a",
  showDeskChair = false,
  showSecondMonitor = false,
  showDeskLamp = false,
}) {
  const legPositions = [
    [-1.15, 0.38, -0.6],
    [1.15, 0.38, -0.6],
    [-1.15, 0.38, 0.6],
    [1.15, 0.38, 0.6],
  ];

  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[3.15, 0.12, 1.7]} castShadow position={[0, 0.82, 0]} radius={0.08} receiveShadow>
        <meshStandardMaterial color="#d6c5ad" roughness={0.42} />
      </RoundedBox>

      {legPositions.map((position, index) => (
        <mesh castShadow key={index} position={position}>
          <boxGeometry args={[0.12, 0.76, 0.12]} />
          <meshStandardMaterial color="#4f6560" metalness={0.2} roughness={0.44} />
        </mesh>
      ))}

      <RoundedBox args={[0.92, 0.5, 0.08]} castShadow position={[0.34, 1.38, -0.38]} radius={0.03}>
        <meshStandardMaterial color="#dbe4df" emissive="#dbe4df" emissiveIntensity={0.16} roughness={0.18} />
      </RoundedBox>

      {showSecondMonitor ? (
        <>
          <RoundedBox args={[0.76, 0.44, 0.08]} castShadow position={[-0.54, 1.34, -0.34]} radius={0.03}>
            <meshStandardMaterial color="#dbe4df" emissive="#dbe4df" emissiveIntensity={0.15} roughness={0.18} />
          </RoundedBox>
          <mesh castShadow position={[-0.54, 1.05, -0.34]}>
            <boxGeometry args={[0.14, 0.38, 0.12]} />
            <meshStandardMaterial color="#3e535a" metalness={0.2} roughness={0.44} />
          </mesh>
          <mesh castShadow position={[-0.54, 0.9, -0.34]}>
            <boxGeometry args={[0.38, 0.06, 0.26]} />
            <meshStandardMaterial color="#465b61" metalness={0.2} roughness={0.42} />
          </mesh>
        </>
      ) : null}

      <mesh castShadow position={[0.34, 1.06, -0.38]}>
        <boxGeometry args={[0.16, 0.42, 0.14]} />
        <meshStandardMaterial color="#3e535a" metalness={0.2} roughness={0.44} />
      </mesh>

      <mesh castShadow position={[0.34, 0.9, -0.38]}>
        <boxGeometry args={[0.44, 0.06, 0.32]} />
        <meshStandardMaterial color="#465b61" metalness={0.2} roughness={0.42} />
      </mesh>

      <RoundedBox args={[0.92, 0.03, 0.28]} castShadow position={[0.24, 0.89, 0.16]} radius={0.02}>
        <meshStandardMaterial color="#5b6f6b" metalness={0.08} roughness={0.46} />
      </RoundedBox>

      <RoundedBox args={[0.48, 0.05, 0.64]} castShadow position={[-0.96, 0.88, 0.24]} radius={0.02}>
        <meshStandardMaterial color="#f7f5f1" roughness={0.92} />
      </RoundedBox>

      <RoundedBox args={[0.36, 0.05, 0.56]} castShadow position={[-1.16, 0.91, 0.14]} radius={0.02}>
        <meshStandardMaterial color="#d4b691" roughness={0.72} />
      </RoundedBox>

      <RoundedBox args={[0.24, 0.18, 0.16]} castShadow position={[-0.36, 0.95, -0.08]} radius={0.03}>
        <meshStandardMaterial color="#50645f" roughness={0.5} metalness={0.16} />
      </RoundedBox>

      <mesh castShadow position={[-0.08, 0.9, 0.18]}>
        <boxGeometry args={[0.16, 0.02, 0.12]} />
        <meshStandardMaterial color="#f0f1ee" roughness={0.88} />
      </mesh>
      <mesh castShadow position={[0.08, 0.9, 0.18]}>
        <boxGeometry args={[0.05, 0.02, 0.05]} />
        <meshStandardMaterial color="#f0f1ee" roughness={0.88} />
      </mesh>

      <RoundedBox args={[0.36, 0.18, 0.2]} castShadow position={[1.18, 0.95, 0.28]} radius={0.02}>
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.14} />
      </RoundedBox>

      <mesh castShadow position={[1.18, 1.17, 0.28]}>
        <cylinderGeometry args={[0.02, 0.02, 0.28, 16]} />
        <meshStandardMaterial color="#7a918a" emissive="#7a918a" emissiveIntensity={0.12} />
      </mesh>

      <RoundedBox args={[0.58, 0.58, 0.58]} castShadow position={[-1.38, 0.42, -0.42]} radius={0.05}>
        <meshStandardMaterial color="#71837d" roughness={0.58} />
      </RoundedBox>

      <mesh castShadow position={[-1.38, 0.54, -0.1]}>
        <boxGeometry args={[0.36, 0.04, 0.02]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.16} />
      </mesh>

      {showDeskLamp ? (
        <group position={[1.28, 0.92, -0.36]}>
          <mesh castShadow position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 16]} />
            <meshStandardMaterial color="#7a918a" metalness={0.28} roughness={0.28} />
          </mesh>
          <mesh castShadow position={[0.08, 0.29, 0]} rotation={[0, 0, -0.72]}>
            <boxGeometry args={[0.2, 0.03, 0.03]} />
            <meshStandardMaterial color="#7a918a" metalness={0.28} roughness={0.28} />
          </mesh>
          <mesh castShadow position={[0.17, 0.33, 0]} rotation={[0, 0, -0.4]}>
            <coneGeometry args={[0.09, 0.16, 18, 1, true]} />
            <meshStandardMaterial color="#f0e6d8" side={THREE.DoubleSide} roughness={0.72} />
          </mesh>
          <pointLight color="#f8e9d3" intensity={0.18} distance={2.2} position={[0.16, 0.27, 0]} />
        </group>
      ) : null}

      {showDeskChair ? (
        <group position={[0, 0, 1.18]}>
          <mesh castShadow position={[0, 0.42, 0]}>
            <boxGeometry args={[0.56, 0.08, 0.52]} />
            <meshStandardMaterial color="#536863" roughness={0.58} />
          </mesh>
          <mesh castShadow position={[0, 0.8, -0.18]}>
            <boxGeometry args={[0.56, 0.64, 0.09]} />
            <meshStandardMaterial color="#536863" roughness={0.58} />
          </mesh>
          {[[-0.2, 0.2, -0.18], [0.2, 0.2, -0.18], [-0.2, 0.2, 0.18], [0.2, 0.2, 0.18]].map((leg, index) => (
            <mesh castShadow key={index} position={leg}>
              <boxGeometry args={[0.05, 0.4, 0.05]} />
              <meshStandardMaterial color="#394a51" metalness={0.28} roughness={0.42} />
            </mesh>
          ))}
        </group>
      ) : null}

      <group position={[0.78, 0.36, 0.42]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.34, 0.1, 24]} />
          <meshStandardMaterial color="#4b605d" roughness={0.54} />
        </mesh>
        <mesh castShadow position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.58, 18]} />
          <meshStandardMaterial color="#4b605d" roughness={0.48} />
        </mesh>
        <mesh castShadow position={[0, 0.7, 0]}>
          <boxGeometry args={[0.48, 0.08, 0.42]} />
          <meshStandardMaterial color="#566b68" roughness={0.46} />
        </mesh>
      </group>
    </group>
  );
}

function ArchiveShelfLeft() {
  const rows = [0.64, 1.42, 2.2];
  const folderColors = ["#d8e0db", "#d4b691", "#f5f2ec", "#8fa6a0", "#c4c5b6"];

  return (
    <group position={[-7.15, 0, 1.05]}>
      <mesh castShadow position={[0, 1.7, 0]}>
        <boxGeometry args={[1.24, 3.4, 0.42]} />
        <meshStandardMaterial color="#6f8580" roughness={0.52} />
      </mesh>

      {[-0.56, 0.56].map((offset, index) => (
        <mesh castShadow key={index} position={[offset, 1.7, 0.04]}>
          <boxGeometry args={[0.08, 3.36, 0.5]} />
          <meshStandardMaterial color="#849690" roughness={0.46} />
        </mesh>
      ))}

      {rows.map((height, rowIndex) => (
        <group key={height}>
          <mesh castShadow position={[0, height, 0.04]}>
            <boxGeometry args={[1.08, 0.08, 0.68]} />
            <meshStandardMaterial color="#758883" roughness={0.48} />
          </mesh>
          {Array.from({ length: 5 }).map((_, columnIndex) => (
            <mesh
              castShadow
              key={`${rowIndex}-${columnIndex}`}
              position={[-0.34 + columnIndex * 0.18, height + 0.24, 0.06]}
              rotation={[0, 0, columnIndex % 2 === 0 ? -0.04 : 0.03]}
            >
              <boxGeometry args={[0.12, 0.42 + (columnIndex % 2) * 0.06, 0.28]} />
              <meshStandardMaterial color={folderColors[(rowIndex + columnIndex) % folderColors.length]} roughness={0.48} />
            </mesh>
          ))}
        </group>
      ))}

      {[[-0.18, 2.92, 0.06], [0.2, 2.92, 0.06]].map((position, index) => (
        <RoundedBox args={[0.3, 0.24, 0.4]} castShadow key={index} position={position} radius={0.03}>
          <meshStandardMaterial color={index === 0 ? "#cbb699" : "#7a918a"} roughness={0.54} />
        </RoundedBox>
      ))}
    </group>
  );
}

function CeilingLights() {
  return (
    <group>
      {[
        [-4.6, 6.75, -1.8],
        [0.2, 6.75, -1.8],
        [5.0, 6.75, -1.8],
      ].map((position, index) => (
        <group key={index} position={position}>
          <mesh>
            <boxGeometry args={[2.8, 0.08, 0.8]} />
            <meshStandardMaterial color="#f6f2ea" emissive="#f6f2ea" emissiveIntensity={0.74} />
          </mesh>
          <pointLight color="#fff1dc" intensity={0.52} distance={10} position={[0, -0.2, 0]} />
        </group>
      ))}
    </group>
  );
}

function ArchiveWall() {
  const rows = [0.66, 1.48, 2.3, 3.12];
  const folderColors = ["#d8e0db", "#d4b691", "#f5f2ec", "#8fa6a0", "#c4c5b6"];

  return (
    <group position={[5.0, 0, -3.3]}>
      <mesh castShadow position={[0, 2.05, 0]}>
        <boxGeometry args={[3.6, 4.1, 0.18]} />
        <meshStandardMaterial color="#6a807a" roughness={0.5} />
      </mesh>

      <mesh castShadow position={[-1.68, 2.05, 0.08]}>
        <boxGeometry args={[0.11, 4.16, 0.44]} />
        <meshStandardMaterial color="#80918c" roughness={0.46} />
      </mesh>
      <mesh castShadow position={[1.68, 2.05, 0.08]}>
        <boxGeometry args={[0.11, 4.16, 0.44]} />
        <meshStandardMaterial color="#80918c" roughness={0.46} />
      </mesh>

      {rows.map((height, rowIndex) => (
        <group key={height}>
          <mesh castShadow position={[0, height, 0.16]}>
            <boxGeometry args={[3.32, 0.08, 0.76]} />
            <meshStandardMaterial color="#71857f" roughness={0.48} />
          </mesh>

          {Array.from({ length: 10 }).map((_, columnIndex) => (
            <mesh
              castShadow
              key={`${rowIndex}-${columnIndex}`}
              position={[-1.28 + columnIndex * 0.28, height + 0.28, 0.16]}
              rotation={[0, 0, columnIndex % 3 === 0 ? -0.06 : 0]}
            >
              <boxGeometry args={[0.18, 0.46 + (columnIndex % 2) * 0.08, 0.36]} />
              <meshStandardMaterial color={folderColors[(rowIndex + columnIndex) % folderColors.length]} roughness={0.48} />
            </mesh>
          ))}
        </group>
      ))}

      {[-1.0, 0.08, 1.16].map((offset, index) => (
        <RoundedBox args={[0.84, 0.38, 0.58]} castShadow key={offset} position={[offset, 3.86, 0.08]} radius={0.04}>
          <meshStandardMaterial color={index === 1 ? "#1a424a" : "#8a9c97"} roughness={0.48} />
        </RoundedBox>
      ))}
    </group>
  );
}

function StorageCabinets() {
  return (
    <group position={[-5.45, 0, -2.8]}>
      {[0, 1.22].map((offset) => (
        <RoundedBox args={[1.18, 2.04, 0.78]} castShadow key={offset} position={[offset, 1.02, 0]} radius={0.04}>
          <meshStandardMaterial color="#71837d" roughness={0.52} />
        </RoundedBox>
      ))}
      {[0, 1.22].map((offset) => (
        <mesh castShadow key={`line-${offset}`} position={[offset, 1.02, 0.4]}>
          <boxGeometry args={[0.8, 1.46, 0.03]} />
          <meshStandardMaterial color="#e8ece8" emissive="#e8ece8" emissiveIntensity={0.08} transparent opacity={0.44} />
        </mesh>
      ))}
      {[0, 1.22].map((offset) => (
        <mesh castShadow key={`handle-${offset}`} position={[offset + 0.25, 1.04, 0.41]}>
          <boxGeometry args={[0.03, 0.36, 0.02]} />
          <meshStandardMaterial color="#e3e1d9" metalness={0.4} roughness={0.24} />
        </mesh>
      ))}
    </group>
  );
}

function PlantCluster() {
  const leafOffsets = [
    [-0.08, 0.48, 0],
    [0.08, 0.5, 0.04],
    [0, 0.56, -0.06],
    [-0.04, 0.62, 0.08],
    [0.05, 0.66, -0.02],
  ];

  return (
    <group position={[-5.95, 0, 4.1]}>
      <mesh castShadow position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.42, 20]} />
        <meshStandardMaterial color="#9d775d" roughness={0.72} />
      </mesh>

      {leafOffsets.map((offset, index) => (
        <mesh castShadow key={index} position={offset} rotation={[0.24 + index * 0.08, index * 0.5, 0.4]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#7f9c8b" : "#658475"} roughness={0.84} />
        </mesh>
      ))}
    </group>
  );
}

function FloorLamp() {
  return (
    <group position={[6.05, 0, 3.2]}>
      <mesh castShadow position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.28, 0.34, 0.08, 24]} />
        <meshStandardMaterial color="#6d807a" roughness={0.52} />
      </mesh>
      <mesh castShadow position={[0, 1.38, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 2.6, 18]} />
        <meshStandardMaterial color="#d3d8d2" metalness={0.36} roughness={0.18} />
      </mesh>
      <mesh castShadow position={[0, 2.82, 0]}>
        <coneGeometry args={[0.36, 0.52, 24, 1, true]} />
        <meshStandardMaterial color="#f0e6d8" roughness={0.82} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color="#efe2cd" intensity={0.36} position={[0, 2.64, 0]} />
    </group>
  );
}

function ArchiveBoxes() {
  return (
    <group position={[6.25, 0, 3.0]}>
      {[0, 0.46, 0.92].map((offset, index) => (
        <RoundedBox args={[0.46, 0.34, 0.58]} castShadow key={offset} position={[0, 0.18 + index * 0.34, offset * 0.22]} radius={0.03}>
          <meshStandardMaterial color={index === 1 ? "#7a918a" : "#cbb699"} roughness={0.58} />
        </RoundedBox>
      ))}
    </group>
  );
}

function ProcessMarkers() {
  const markers = [
    [-1.0, 1.12, -1.45],
    [0.05, 1.12, -1.85],
    [1.15, 1.12, -2.2],
    [2.25, 1.12, -2.58],
  ];

  return (
    <group>
      {markers.map((position, index) => (
        <RoundedBox args={[0.44, 0.12, 0.3]} castShadow key={index} position={position} radius={0.03}>
          <meshStandardMaterial
            color={index === markers.length - 1 ? "#d8e0db" : "#d7c0a0"}
            emissive={index === markers.length - 1 ? "#7a918a" : "#8a7052"}
            emissiveIntensity={index === markers.length - 1 ? 0.22 : 0.08}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

function WallDashboard() {
  const panelRef = useRef(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (panelRef.current) {
      panelRef.current.material.emissiveIntensity = 0.12 + Math.sin(time * 1.2) * 0.03;
    }
  });

  return (
    <group position={[-4.5, 2.4, -5.66]}>
      <RoundedBox args={[2.2, 1.08, 0.06]} castShadow radius={0.04} ref={panelRef}>
        <meshStandardMaterial color="#eef2ef" emissive="#7a918a" emissiveIntensity={0.14} transparent opacity={0.88} />
      </RoundedBox>
      <mesh position={[0, 0.02, 0.06]}>
        <boxGeometry args={[1.76, 0.06, 0.02]} />
        <meshStandardMaterial color="#556965" />
      </mesh>
      <mesh position={[0, -0.18, 0.06]}>
        <boxGeometry args={[1.5, 0.04, 0.02]} />
        <meshStandardMaterial color="#556965" />
      </mesh>
      <mesh position={[-0.52, 0.22, 0.06]}>
        <boxGeometry args={[0.24, 0.24, 0.02]} />
        <meshStandardMaterial color="#556965" />
      </mesh>
      <mesh position={[-0.1, 0.18, 0.06]}>
        <boxGeometry args={[0.52, 0.14, 0.02]} />
        <meshStandardMaterial color="#556965" />
      </mesh>
    </group>
  );
}

function AIAssistant() {
  const groupRef = useRef(null);
  const haloRef = useRef(null);
  const beaconRef = useRef(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = 1.45 + Math.sin(time * 1.4) * 0.06;
      groupRef.current.rotation.y = Math.sin(time * 0.4) * 0.18;
    }

    if (haloRef.current) {
      haloRef.current.rotation.z = time * 0.4;
      haloRef.current.scale.x = 1 + Math.sin(time * 1.1) * 0.04;
      haloRef.current.scale.y = 1 + Math.cos(time * 1.1) * 0.04;
    }

    if (beaconRef.current) {
      beaconRef.current.position.y = -0.78 + Math.sin(time * 1.2) * 0.05;
    }
  });

  return (
    <group position={[-3.2, 0, 1.3]} ref={groupRef}>
      <mesh castShadow position={[0, 0, 0]}>
        <sphereGeometry args={[0.34, 48, 48]} />
        <meshStandardMaterial color="#eef2ef" emissive="#7a918a" emissiveIntensity={0.22} transparent opacity={0.84} roughness={0.18} />
      </mesh>

      <mesh castShadow position={[0, 0, 0]} scale={1.18}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial color="#eef2ef" emissive="#7a918a" emissiveIntensity={0.1} transparent opacity={0.12} />
      </mesh>

      <mesh position={[-0.11, 0.05, 0.29]}>
        <sphereGeometry args={[0.03, 18, 18]} />
        <meshStandardMaterial color="#465a60" emissive="#465a60" emissiveIntensity={0.16} />
      </mesh>
      <mesh position={[0.11, 0.05, 0.29]}>
        <sphereGeometry args={[0.03, 18, 18]} />
        <meshStandardMaterial color="#465a60" emissive="#465a60" emissiveIntensity={0.16} />
      </mesh>

      <mesh position={[0, -0.04, 0.29]} rotation={[0, 0, -Math.PI * 0.47]}>
        <torusGeometry args={[0.12, 0.014, 18, 48, Math.PI * 0.84]} />
        <meshStandardMaterial color="#465a60" emissive="#465a60" emissiveIntensity={0.12} />
      </mesh>

      <mesh castShadow position={[0, -0.64, 0]}>
        <cylinderGeometry args={[0.14, 0.2, 0.48, 32]} />
        <meshStandardMaterial color="#eef2ef" emissive="#7a918a" emissiveIntensity={0.2} transparent opacity={0.66} roughness={0.24} />
      </mesh>

      <mesh castShadow position={[0, -1.04, 0]}>
        <sphereGeometry args={[0.2, 28, 28]} />
        <meshStandardMaterial color="#eef2ef" emissive="#7a918a" emissiveIntensity={0.14} transparent opacity={0.48} />
      </mesh>

      <mesh position={[0, -1.22, 0]} ref={beaconRef}>
        <torusGeometry args={[0.46, 0.025, 20, 64]} />
        <meshStandardMaterial color="#7a918a" emissive="#7a918a" emissiveIntensity={0.18} transparent opacity={0.54} />
      </mesh>

      <mesh position={[0, -0.06, 0]} ref={haloRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.02, 20, 90]} />
        <meshStandardMaterial color="#7a918a" emissive="#7a918a" emissiveIntensity={0.16} transparent opacity={0.38} />
      </mesh>
    </group>
  );
}

function DeskArea() {
  return (
    <>
      <DeskCluster showDeskChair showDeskLamp showSecondMonitor />
      <DeskCluster position={[-4.4, 0, -0.95]} rotation={[0, 0.08, 0]} accent="#7a918a" />
      <DeskCluster position={[4.5, 0, 0.25]} rotation={[0, -0.1, 0]} accent="#3d5962" />
      <SecondaryTable />
      <VisitorChair position={[-4.1, 0, 3.9]} rotation={[0, 0.35, 0]} />
      <VisitorChair position={[-2.5, 0, 4.1]} rotation={[0, -0.3, 0]} />
      <VisitorChair position={[-5.2, 0, -0.2]} rotation={[0, 0.7, 0]} />
      <VisitorChair position={[3.6, 0, 1.3]} rotation={[0, -0.55, 0]} />
    </>
  );
}

function ArchiveAreaLeft() {
  return (
    <>
      <StorageCabinets />
      <ArchiveShelfLeft />
    </>
  );
}

function ArchiveAreaRight() {
  return (
    <>
      <ArchiveWall />
      <ArchiveBoxes />
    </>
  );
}

function WallPanelArea() {
  return (
    <>
      <WallDashboard />
      <ProcessMarkers />
    </>
  );
}

function AssistantArea() {
  return <AIAssistant />;
}

function Decorations() {
  return (
    <>
      <CeilingLights />
      <PlantCluster />
      <FloorLamp />
    </>
  );
}

function OfficeScene({ activeHotspot, onSelectHotspot }) {
  return (
    <>
      <color attach="background" args={["#f1f0ec"]} />

      <ambientLight intensity={0.66} />
      <directionalLight castShadow intensity={0.98} position={[5.8, 8.8, 5.4]} shadow-mapSize-height={2048} shadow-mapSize-width={2048} />
      <pointLight intensity={0.72} position={[-4.8, 4.9, 4.8]} color="#f7efdf" />
      <pointLight intensity={0.34} position={[4.9, 4.2, -3.2]} color="#7a918a" />

      <RoomShell />
      <Decorations />
      <DeskArea />
      <ArchiveAreaLeft />
      <ArchiveAreaRight />
      <WallPanelArea />
      <AssistantArea />
      {sceneHotspots.map((hotspot) => (
        <HotspotMarker
          activeHotspot={activeHotspot}
          hotspot={hotspot}
          key={hotspot.id}
          onSelectHotspot={onSelectHotspot}
        />
      ))}
    </>
  );
}

export function SceneCanvas({ activeHotspot, onSelectHotspot, resetSignal }) {
  const controlsRef = useRef(null);

  return (
    <Canvas camera={{ fov: 40, position: [6.8, 4.0, 13.6] }} dpr={[1, 1.5]} shadows gl={{ antialias: true }}>
      <OfficeScene activeHotspot={activeHotspot} onSelectHotspot={onSelectHotspot} />
      <CameraRig controlsRef={controlsRef} resetSignal={resetSignal} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.12}
        enablePan={false}
        enableZoom
        maxAzimuthAngle={0.52}
        maxDistance={12.8}
        maxPolarAngle={Math.PI / 2.04}
        minAzimuthAngle={-0.58}
        minDistance={8.2}
        minPolarAngle={Math.PI / 3.45}
        ref={controlsRef}
      />
    </Canvas>
  );
}
