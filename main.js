import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera =new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(0);
camera.position.setX(0);
camera.position.setY(0);

loader.load( './monkey.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

loader.load( './spaceShip.glb', function ( gltf ) {

  gltf.scene.position.z = 7;

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );




const geometry = new THREE.IcosahedronGeometry(10,1);
const material =new THREE.MeshStandardMaterial({color:0xffffff,wireframe:true})
const icosahedronGeometry =new THREE.Mesh(geometry,material);

scene.add(icosahedronGeometry);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(ambientLight);

const gridHelper = new THREE.GridHelper(200,50);


const controls = new OrbitControls(camera,renderer.domElement);

function addStar(){
  const geometry = new THREE.BoxGeometry(0.1,0.1,0.1);
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry,material);

  const [x, y, z] = Array(3).fill().map(()=>
    THREE.MathUtils.randFloatSpread(100)
  );

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

function addRandomObjects(){
  
  const geometry = new THREE.BoxGeometry(3,3,3);
  const material = new THREE.MeshStandardMaterial({color:0xffffff,wireframe:true});
  const randomObject = new THREE.Mesh(geometry,material);
  
  const [x, y, z] = Array(3).fill().map(()=>
  THREE.MathUtils.randFloatSpread(100)
);
  
  randomObject.position.set(x,y,z);
  
}

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
  icosahedronGeometry.rotation.x += 0.01;
  icosahedronGeometry.rotation.y += 0.01;
  icosahedronGeometry.rotation.z += 0.01;

  camera.position.z = t* 0.01;
  
  
  

  
  
    
}

document.body.onscroll = moveCamera;

Array(200).fill().forEach(addRandomObjects);

function animate(){
  requestAnimationFrame(animate);

  

  controls.update();

  renderer.render(scene,camera);
}
animate();


