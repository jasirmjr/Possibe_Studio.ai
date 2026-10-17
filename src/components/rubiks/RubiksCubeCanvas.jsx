import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { getTileTexture } from './pixelTextures';

/**
 * RubiksCubeCanvas
 * Interactive WebGL 3D Rubik's Cube on Pale Sage background (#DCE3A5).
 * Physically accurate multi-axial rotations preserving a rigid 3x3x3 cube throughout.
 *
 * - Glossy Cobalt Blue plastic cubie body (#0048FF) with rounded chamfers catching studio specular glints
 * - 54 procedural 8-bit pixel art sticker tiles
 * - Halftone circular dots & UI markers surrounding the cube
 * - Multi-axial scroll triggers:
 *    Stage 1 (0% - 25%): Top Slice Spin (90° clockwise)
 *    Stage 2 (25% - 50%): Body Tilt Axis & Right Slice Spin (90°)
 *    Stage 3 (50% - 75%): Column & Base Row Scramble (sequential 90° twists)
 *    Stage 4 (75% - 100%): Front Face Lock & Flush Align Snap
 * - Mouse drag-to-orbit with damped return
 */

const PALE_SAGE = 0xdce3a5;
const COBALT_BLUE = 0x0048ff;
const CUBIE_SIZE = 0.95;
const CUBIE_BEVEL = 0.07;
const PITCH = 1.02; // Tight, realistic speed-cube pitch with clean joint gaps

// Base isometric orientation
const BASE_ROT_X = 0.48;
const BASE_ROT_Y = -0.72;
const BASE_ROT_Z = 0.04;

// Principal Axes
const AXIS_X = new THREE.Vector3(1, 0, 0);
const AXIS_Y = new THREE.Vector3(0, 1, 0);
const AXIS_Z = new THREE.Vector3(0, 0, 1);

// Mechanical easing with subtle tactile detent overshoot
function mechanicalEase(t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const s = t * t * (3 - 2 * t);
  const detent = Math.sin(t * Math.PI) * Math.sin(t * Math.PI * 2) * 0.035;
  return s + detent;
}

// Cubic smoothstep for body tilt transitions
function smoothStep(t) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

// Discrete layer rotations mapped across scroll phases
const MOVES = [
  // Stage 1 (0.00 - 0.25): Top Slice Spin - Top horizontal layer (y = 1) turns 90° clockwise
  {
    pStart: 0.00,
    pEnd: 0.25,
    axis: AXIS_Y,
    filter: (p) => p.y > 0.5 * PITCH,
    angle: -Math.PI / 2,
  },
  // Stage 2 (0.25 - 0.50): Body Tilt Axis - Right vertical layer (x = 1) turns 90°
  {
    pStart: 0.25,
    pEnd: 0.50,
    axis: AXIS_X,
    filter: (p) => p.x > 0.5 * PITCH,
    angle: -Math.PI / 2,
  },
  // Stage 3A (0.50 - 0.625): Column Scramble Part 1 - Left vertical column (x = -1) turns 90°
  {
    pStart: 0.50,
    pEnd: 0.625,
    axis: AXIS_X,
    filter: (p) => p.x < -0.5 * PITCH,
    angle: Math.PI / 2,
  },
  // Stage 3B (0.625 - 0.75): Column Scramble Part 2 - Base horizontal row (y = -1) turns 90°
  {
    pStart: 0.625,
    pEnd: 0.75,
    axis: AXIS_Y,
    filter: (p) => p.y < -0.5 * PITCH,
    angle: Math.PI / 2,
  },
  // Stage 4 (0.75 - 1.00): Flush Align Lock - Front face (z = 1) turns 90° into flush alignment
  {
    pStart: 0.75,
    pEnd: 1.00,
    axis: AXIS_Z,
    filter: (p) => p.z > 0.5 * PITCH,
    angle: -Math.PI / 2,
  },
];

export default function RubiksCubeCanvas({
  scrollProgress = 0,
  onPhaseChange,
  interactive = true,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // References to keep render loop decoupled and fluid
  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  const onPhaseChangeRef = useRef(onPhaseChange);
  onPhaseChangeRef.current = onPhaseChange;

  const activePhaseRef = useRef(0);
  const smoothPRef = useRef(0);

  // Mouse drag-to-orbit state
  const mouseOrbit = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(PALE_SAGE);

    // 2. Camera: Focused isometric perspective with generous framing
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(32, aspect, 0.1, 100);
    camera.position.set(0, 0.15, 8.8);
    camera.lookAt(0, 0.1, 0);

    // 3. Renderer with high DPI and soft shadows
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // 4. Studio Lighting Environment
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    // Key Directional Light (Top-Front-Right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5.5, 8.5, 6.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Fill Directional Light (Bottom-Left)
    const fillLight = new THREE.DirectionalLight(0xf4f8ff, 0.85);
    fillLight.position.set(-6, 2, -2);
    scene.add(fillLight);

    // Specular Glint Point Light positioned to reflect sharply off chamfers
    const glintLight = new THREE.PointLight(0xffffff, 2.6, 18);
    glintLight.position.set(1.8, 4.2, 4.6);
    scene.add(glintLight);

    // Rim light from rear
    const rimLight = new THREE.DirectionalLight(0xdce3a5, 1.1);
    rimLight.position.set(-3, 6, -5);
    scene.add(rimLight);

    // 5. Halftone Particle Dots Background Overlay
    const dotsGroup = new THREE.Group();
    dotsGroup.position.z = -0.5;
    scene.add(dotsGroup);

    const dotGeo = new THREE.CircleGeometry(0.038, 16);
    const dotMat = new THREE.MeshBasicMaterial({
      color: 0x0b0b0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
    });

    const dotCoords = [
      // Top-Left vertical pairs
      [-2.4, 2.3], [-1.8, 2.3],
      [-2.4, 1.8], [-1.8, 1.8],
      [-2.4, 1.3], [-1.8, 1.3],
      // Mid-Left
      [-2.6, 0.45], [-2.35, 0.25],
      // Bottom-Left fine halftone grid
      [-2.5, -0.75], [-2.32, -0.75], [-2.14, -0.75],
      [-2.5, -0.92], [-2.32, -0.92], [-2.14, -0.92],
      [-2.5, -1.09], [-2.32, -1.09], [-2.14, -1.09],
      [-2.5, -1.26], [-2.32, -1.26],
      // Bottom dots row
      [-1.8, -2.15], [-0.9, -2.15], [-0.15, -2.15], [0.15, -2.15],
      // Bottom-Right cluster
      [2.15, -0.65], [2.45, -0.85], [2.2, -1.15], [2.55, -1.25],
      [2.25, -1.55], [2.65, -1.75], [2.05, -1.45], [2.45, -1.95],
      // Top-Right ambient dots
      [1.95, 2.1], [2.35, 2.05],
    ];

    dotCoords.forEach(([dx, dy]) => {
      const mesh = new THREE.Mesh(dotGeo, dotMat);
      mesh.position.set(dx, dy, 0);
      dotsGroup.add(mesh);
    });

    // 6. Assemble 3×3×3 Rubik's Cube
    const cubeGroup = new THREE.Group();
    cubeGroup.position.set(0, 0.10, 0);
    scene.add(cubeGroup);

    // Geometries
    const cubieGeo = new RoundedBoxGeometry(CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE, 4, CUBIE_BEVEL);
    const tileGeo = new RoundedBoxGeometry(0.82, 0.82, 0.02, 3, 0.04);

    // Glossy Cobalt Blue Plastic Material with Chamfer Glint
    const plasticMat = new THREE.MeshPhysicalMaterial({
      color: COBALT_BLUE,
      roughness: 0.15,
      metalness: 0.04,
      clearcoat: 0.95,
      clearcoatRoughness: 0.10,
      reflectivity: 0.70,
    });

    const cubieList = [];

    // Construct exactly 27 cubies: x, y, z in {-1, 0, 1}
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const cubie = new THREE.Group();
          cubie.position.set(x * PITCH, y * PITCH, z * PITCH);

          // Plastic body core
          const plasticMesh = new THREE.Mesh(cubieGeo, plasticMat);
          plasticMesh.castShadow = true;
          plasticMesh.receiveShadow = true;
          cubie.add(plasticMesh);

          // Add sticker tiles on exterior faces
          const tileOffset = CUBIE_SIZE / 2 + 0.008;

          const addTile = (faceName, u, v, pos, rot) => {
            const texture = getTileTexture(faceName, u, v);
            const tileMat = new THREE.MeshPhysicalMaterial({
              map: texture,
              roughness: 0.20,
              metalness: 0.02,
              clearcoat: 0.80,
              clearcoatRoughness: 0.12,
            });
            const tileMesh = new THREE.Mesh(tileGeo, tileMat);
            tileMesh.position.copy(pos);
            tileMesh.rotation.set(rot.x, rot.y, rot.z);
            tileMesh.castShadow = true;
            cubie.add(tileMesh);
          };

          // Right Face (+X): Yellow background with black pixel spiral
          if (x === 1) {
            const u = 2 - (z + 1);
            const v = 1 - y;
            addTile('right', u, v, new THREE.Vector3(tileOffset, 0, 0), {
              x: 0,
              y: Math.PI / 2,
              z: 0,
            });
          }

          // Left Face (-X): White base with black pixel glyphs
          if (x === -1) {
            const u = z + 1;
            const v = 1 - y;
            addTile('left', u, v, new THREE.Vector3(-tileOffset, 0, 0), {
              x: 0,
              y: -Math.PI / 2,
              z: 0,
            });
          }

          // Top Face (+Y): White, Black & Yellow geometry
          if (y === 1) {
            const u = x + 1;
            const v = z + 1;
            addTile('top', u, v, new THREE.Vector3(0, tileOffset, 0), {
              x: -Math.PI / 2,
              y: 0,
              z: 0,
            });
          }

          // Bottom Face (-Y): Blue & White pixel patterns
          if (y === -1) {
            const u = x + 1;
            const v = 2 - (z + 1);
            addTile('bottom', u, v, new THREE.Vector3(0, -tileOffset, 0), {
              x: Math.PI / 2,
              y: 0,
              z: 0,
            });
          }

          // Front Face (+Z): Cobalt Blue with 8-bit glyphs
          if (z === 1) {
            const u = x + 1;
            const v = 1 - y;
            addTile('front', u, v, new THREE.Vector3(0, 0, tileOffset), {
              x: 0,
              y: 0,
              z: 0,
            });
          }

          // Back Face (-Z): Yellow & Black pixel patterns
          if (z === -1) {
            const u = 2 - (x + 1);
            const v = 1 - y;
            addTile('back', u, v, new THREE.Vector3(0, 0, -tileOffset), {
              x: 0,
              y: Math.PI,
              z: 0,
            });
          }

          cubie.userData = {
            initX: x,
            initY: y,
            initZ: z,
          };

          cubeGroup.add(cubie);
          cubieList.push(cubie);
        }
      }
    }

    // Window resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Pre-allocated math objects to avoid garbage collection
    const tempPos = new THREE.Vector3();
    const tempQuat = new THREE.Quaternion();
    const rotQuat = new THREE.Quaternion();
    const clock = new THREE.Clock();
    let animId;

    // Continuous 60/120 FPS render loop
    const render = () => {
      const time = clock.getElapsedTime();

      // Fluid scroll smoothing
      const targetP = Math.max(0, Math.min(1, scrollProgressRef.current));
      smoothPRef.current += (targetP - smoothPRef.current) * 0.18;
      const p = smoothPRef.current;

      // Active phase notification
      const currentPhase = p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3;
      if (currentPhase !== activePhaseRef.current) {
        activePhaseRef.current = currentPhase;
        if (onPhaseChangeRef.current) {
          onPhaseChangeRef.current(currentPhase);
        }
      }

      // Smooth multi-axial body tilt across the 4 scroll phases
      let tiltX = 0;
      let tiltY = 0;
      let tiltZ = 0;

      if (p < 0.25) {
        const t = p / 0.25;
        tiltY = -0.12 * smoothStep(t);
      } else if (p < 0.50) {
        const t = (p - 0.25) / 0.25;
        tiltX = Math.sin(t * Math.PI) * 0.25;
        tiltY = -0.12 - smoothStep(t) * 0.50;
        tiltZ = Math.sin(t * Math.PI) * 0.12;
      } else if (p < 0.75) {
        const t = (p - 0.50) / 0.25;
        tiltX = -0.06 * smoothStep(t);
        tiltY = -0.62 - smoothStep(t) * 0.40;
        tiltZ = 0.04 * smoothStep(t);
      } else {
        const t = (p - 0.75) / 0.25;
        tiltX = -0.06 * (1 - smoothStep(t)) + 0.04 * smoothStep(t);
        tiltY = -1.02 - smoothStep(t) * 0.25;
        tiltZ = 0.04 * (1 - smoothStep(t));
      }

      // Micro ambient float & studio lighting interaction
      const floatBob = Math.sin(time * 1.6) * 0.03;
      const floatRotY = Math.sin(time * 1.1) * 0.015;

      // Mouse drag damping
      const mo = mouseOrbit.current;
      mo.x += (mo.targetX - mo.x) * 0.08;
      mo.y += (mo.targetY - mo.y) * 0.08;

      cubeGroup.rotation.x = BASE_ROT_X + tiltX + mo.y;
      cubeGroup.rotation.y = BASE_ROT_Y + tiltY + floatRotY + mo.x;
      cubeGroup.rotation.z = BASE_ROT_Z + tiltZ;
      cubeGroup.position.y = 0.10 + floatBob;

      // Exact rigid-body layer rotation evaluation for all 27 cubies
      cubieList.forEach((cubie) => {
        const { initX, initY, initZ } = cubie.userData;
        tempPos.set(initX * PITCH, initY * PITCH, initZ * PITCH);
        tempQuat.identity();

        for (let i = 0; i < MOVES.length; i++) {
          const m = MOVES[i];
          if (p <= m.pStart) break;

          let moveAngle = 0;
          if (p >= m.pEnd) {
            moveAngle = m.angle;
          } else {
            const t = (p - m.pStart) / (m.pEnd - m.pStart);
            moveAngle = m.angle * mechanicalEase(t);
          }

          if (m.filter(tempPos)) {
            rotQuat.setFromAxisAngle(m.axis, moveAngle);
            tempPos.applyQuaternion(rotQuat);
            tempQuat.premultiply(rotQuat);
          }
        }

        cubie.position.copy(tempPos);
        cubie.quaternion.copy(tempQuat);
      });

      // Subtle background dot drift
      dotsGroup.position.x = Math.sin(time * 0.8) * 0.04 + p * 0.08;
      dotsGroup.position.y = Math.cos(time * 0.6) * 0.03;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      cubieGeo.dispose();
      tileGeo.dispose();
      plasticMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
    };
  }, []);

  // Mouse orbit event handlers
  const handlePointerDown = useCallback((e) => {
    if (!interactive) return;
    mouseOrbit.current.isDragging = true;
    mouseOrbit.current.startX = e.clientX;
    mouseOrbit.current.startY = e.clientY;
    mouseOrbit.current.initialTargetX = mouseOrbit.current.targetX;
    mouseOrbit.current.initialTargetY = mouseOrbit.current.targetY;
  }, [interactive]);

  const handlePointerMove = useCallback((e) => {
    if (!interactive || !mouseOrbit.current.isDragging) return;
    const dx = (e.clientX - mouseOrbit.current.startX) * 0.005;
    const dy = (e.clientY - mouseOrbit.current.startY) * 0.005;
    mouseOrbit.current.targetX = mouseOrbit.current.initialTargetX + dx;
    mouseOrbit.current.targetY = Math.max(-0.5, Math.min(0.5, mouseOrbit.current.initialTargetY + dy));
  }, [interactive]);

  const handlePointerUp = useCallback(() => {
    if (!interactive) return;
    mouseOrbit.current.isDragging = false;
    mouseOrbit.current.targetX *= 0.25;
    mouseOrbit.current.targetY *= 0.25;
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden touch-none"
      style={{ backgroundColor: '#DCE3A5' }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
