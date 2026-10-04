'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { planets, sunData } from '@/data/planets';
import { Planet } from '@/types/planet';
import { getInitialAngles, BASE_SPEED } from '@/lib/simulation';

interface SolarSystem3DProps {
  selectedPlanet: Planet | null;
  onSelectPlanet: (planet: Planet) => void;
  isPlaying: boolean;
  speed: number;
  resetTrigger: number;
}

// Skala 3D proporsional untuk visual edukasi
const PLANET_3D_CONFIG: Record<string, { size: number; orbitDist: number }> = {
  mercury: { size: 1.0, orbitDist: 18 },
  venus: { size: 1.6, orbitDist: 26 },
  earth: { size: 1.8, orbitDist: 36 },
  mars: { size: 1.3, orbitDist: 48 },
  jupiter: { size: 4.2, orbitDist: 64 },
  saturn: { size: 3.5, orbitDist: 80 },
  uranus: { size: 2.5, orbitDist: 96 },
  neptune: { size: 2.4, orbitDist: 110 },
};

function createCircleGeometry(radius: number, segments: number): THREE.BufferGeometry {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
  const points = curve.getPoints(segments);
  return new THREE.BufferGeometry().setFromPoints(
    points.map((p) => new THREE.Vector3(p.x, 0, p.y))
  );
}

export default function SolarSystem3D({
  selectedPlanet,
  onSelectPlanet,
  isPlaying,
  speed,
  resetTrigger,
}: SolarSystem3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Simpan state terkini dalam ref agar animation loop berjalan mulus tanpa re-create scene
  const isPlayingRef = useRef(isPlaying);
  const speedRef = useRef(speed);
  const onSelectPlanetRef = useRef(onSelectPlanet);
  const selectedPlanetRef = useRef(selectedPlanet);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    speedRef.current = speed;
    onSelectPlanetRef.current = onSelectPlanet;
    selectedPlanetRef.current = selectedPlanet;
  }, [isPlaying, speed, onSelectPlanet, selectedPlanet]);

  const anglesRef = useRef<Record<string, number>>(getInitialAngles());
  const planetMeshesRef = useRef<Record<string, THREE.Mesh>>({});
  const selectionRingsRef = useRef<Record<string, THREE.Line>>({});
  const sunSelectionRingRef = useRef<THREE.Line | null>(null);

  // Reset sudut orbit ketika tombol reset ditekan
  useEffect(() => {
    anglesRef.current = getInitialAngles();
  }, [resetTrigger]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050816, 0.002);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Posisi awal kamera: agak condong dari atas dan samping agar semua orbit terlihat megah
    camera.position.set(0, 95, 135);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Kontrol Interaktif OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 250;
    controls.minDistance = 15;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };

    // 3. Pencahayaan (Lighting)
    const sunPointLight = new THREE.PointLight(0xfff7d6, 3.5, 400, 0.5);
    sunPointLight.position.set(0, 0, 0);
    scene.add(sunPointLight);

    const ambientLight = new THREE.AmbientLight(0x2d3748, 0.6);
    scene.add(ambientLight);

    // 4. Bintang-bintang di Latar Belakang (Starfield 3D)
    const starsCount = 1200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      const radius = 300 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi);
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Daftar objek interaktif yang dapat diklik mouse
    const interactiveMeshes: THREE.Mesh[] = [];

    // 5. Matahari (The Sun) di Pusat
    const sunGeometry = new THREE.SphereGeometry(6.5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    sunMesh.userData = { planet: sunData };
    scene.add(sunMesh);
    interactiveMeshes.push(sunMesh);

    // Pendaran (Sun Glow)
    const sunGlowGeometry = new THREE.SphereGeometry(7.6, 32, 32);
    const sunGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      transparent: true,
      opacity: 0.35,
      side: THREE.BackSide,
    });
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
    scene.add(sunGlow);

    // Cincin seleksi untuk Matahari
    const sunSelGeometry = createCircleGeometry(8.8, 50);
    const sunSelMaterial = new THREE.LineBasicMaterial({
      color: 0xffea00,
      transparent: true,
      opacity: 0.9,
    });
    const sunSelRing = new THREE.Line(sunSelGeometry, sunSelMaterial);
    sunSelRing.visible = false;
    sunMesh.add(sunSelRing);
    sunSelectionRingRef.current = sunSelRing;

    // 6. Jalur Orbit dan Objek Planet 3D
    planetMeshesRef.current = {};
    selectionRingsRef.current = {};

    planets.forEach((planet) => {
      const config = PLANET_3D_CONFIG[planet.id] || { size: 1.5, orbitDist: 30 };

      // Garis jalur orbit melingkar 3D
      const orbitGeometry = createCircleGeometry(config.orbitDist, 100);
      const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0x475569,
        transparent: true,
        opacity: 0.25,
      });
      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
      scene.add(orbitLine);

      // Mesh Planet 3D
      const planetGeometry = new THREE.SphereGeometry(config.size, 28, 28);
      const planetMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(planet.color),
        roughness: 0.6,
        metalness: 0.1,
      });
      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
      planetMesh.userData = { planet };
      scene.add(planetMesh);
      interactiveMeshes.push(planetMesh);
      planetMeshesRef.current[planet.id] = planetMesh;

      // Cincin untuk Saturnus
      if (planet.id === 'saturn') {
        const ringGeo = new THREE.RingGeometry(config.size * 1.4, config.size * 2.3, 32);
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xe2d6b5,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.75,
          roughness: 0.8,
        });
        const saturnRing = new THREE.Mesh(ringGeo, ringMat);
        saturnRing.rotation.x = Math.PI / 2.3;
        planetMesh.add(saturnRing);
      }

      // Cincin penanda pilihan (Selection indicator ring)
      const selGeometry = createCircleGeometry(config.size * 1.6, 50);
      const selMaterial = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.9,
      });
      const selRing = new THREE.Line(selGeometry, selMaterial);
      selRing.visible = false;
      planetMesh.add(selRing);
      selectionRingsRef.current[planet.id] = selRing;
    });

    // 7. Raycasting untuk Interaksi Klik & Hover pada Objek Angkasa
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      // Hanya tangani klik kiri untuk memilih
      if (event.button !== 0) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const clickedObj = intersects[0].object.userData.planet as Planet;
        if (clickedObj) {
          onSelectPlanetRef.current(clickedObj);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // 8. Loop Animasi requestAnimationFrame
    let animId = 0;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Update posisi orbit jika simulasi sedang berjalan
      if (isPlayingRef.current) {
        const currentSpeed = speedRef.current;
        planets.forEach((planet) => {
          const deltaAngle = planet.orbitSpeed * BASE_SPEED * 2.8 * currentSpeed * (delta * 60);
          anglesRef.current[planet.id] = (anglesRef.current[planet.id] || 0) + deltaAngle;

          const angle = anglesRef.current[planet.id];
          const config = PLANET_3D_CONFIG[planet.id];
          const mesh = planetMeshesRef.current[planet.id];

          if (mesh && config) {
            mesh.position.x = Math.cos(angle) * config.orbitDist;
            mesh.position.z = Math.sin(angle) * config.orbitDist;
            mesh.rotation.y += 0.015; // Rotasi planet pada porosnya
          }
        });
      }

      // Update penanda seleksi planet & matahari
      const currentSelected = selectedPlanetRef.current;
      planets.forEach((p) => {
        const ring = selectionRingsRef.current[p.id];
        if (ring) {
          ring.visible = currentSelected?.id === p.id;
          if (ring.visible) {
            ring.rotation.z += 0.02;
          }
        }
      });

      if (sunSelectionRingRef.current) {
        sunSelectionRingRef.current.visible = currentSelected?.id === 'sun';
        if (sunSelectionRingRef.current.visible) {
          sunSelectionRingRef.current.rotation.z += 0.015;
        }
      }

      // Rotasi pelan latar belakang bintang & matahari
      starField.rotation.y += 0.00015;
      sunMesh.rotation.y += 0.002;

      controls.update();
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup saat unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[550px] lg:min-h-[620px] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing select-none relative"
      tabIndex={0}
      aria-label="Kanvas Tata Surya 3D Interaktif"
    />
  );
}
