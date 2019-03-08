var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 2;
camera.position.y = 1;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshNormalMaterial( );
var mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
mesh.position.x = -1;
mesh.position.y = 1;

var geometry2 = new THREE.CylinderGeometry( 0.5, 0.5, 1, 32 );
var material2 = new THREE.MeshNormalMaterial( );
var cylinder = new THREE.Mesh( geometry2, material2 );
scene.add( cylinder );
cylinder.position.x = 1;
cylinder.position.y = 1;


var geometry3 = new THREE.PlaneGeometry( 10, 10);
var material3 = new THREE.MeshNormalMaterial( );
var plane = new THREE.Mesh( geometry3, material3 );
scene.add( plane );

plane.rotation.x = -3.14159/2;


var animate = function () {
    requestAnimationFrame( animate );
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    cylinder.rotation.x += 0.01;

    renderer.render( scene, camera );
};

animate();
