import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';

function onWindowResize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function OnMouseMoved(event) {
  var rel_pos_x = event.clientX - window.innerWidth/2;
  var rel_pos_y = event.clientY - window.innerHeight/2;
  //alert("DX="+dx+" DY="+dy);
  camera.position.x = rel_pos_x * 0.0005;
  camera.position.y = -rel_pos_y * 0.0005;
}

window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener('mousemove', OnMouseMoved, false );

//Setup Scene
const canvas = document.querySelector('#c');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
renderer.setClearColor(0xC5C6C7);

const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

{
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}

function CreateCube(x, y, z) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const material = new THREE.MeshPhongMaterial({color: 0x24305E});

  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);
  scene.add(cube);
}

var x, y;
for (x=-5; x<=5; x++) {
	for (y=-3; y<=3; y++) {
		if ((x+y)%2 == 0)
			CreateCube(x, y, 0);
	}
}

/*const cube0 = new THREE.Mesh(geometry, material);
cube0.position = (2, -4, -10)
scene.add(cube0);
const cube1 = new THREE.Mesh(geometry, material);
cube1.position = (-2, 4, -10)
scene.add(cube1);
const cube2 = new THREE.Mesh(geometry, material);
cube2.position = (-2, -4, -10)
scene.add(cube2);
const cube3 = new THREE.Mesh(geometry, material);
cube3.position = (2, 4, -10)
scene.add(cube3);*/

onWindowResize();

function render(time) {
  time *= 0.001;  // convert time to seconds

  //cube.rotation.x = time;
  //cube.rotation.y = time;
  //cube.rotation.z = time;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);