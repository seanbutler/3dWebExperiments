var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.x = 0;
camera.position.y = 3;
camera.position.z = 8;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

controls = new THREE.OrbitControls( camera, renderer.domElement );

controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = true;
controls.minDistance = 1;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2;


class Entity {
  constructor(x, y) {
  }

  update() {
  }
}

var grid = 50

class SphereEntity extends Entity{
  constructor() {
    super()
    this.radius = 0.5
    this.scale = 1.0

    this.geometry = new THREE.SphereGeometry(this.radius, 12, 12);
    this.material = new THREE.MeshStandardMaterial( );
    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.mesh.position.x = Math.floor(Math.random()*grid)-grid/2;
    this.mesh.position.y = 0;
    this.mesh.position.z = Math.floor(Math.random()*grid)-grid/2;

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false;

    scene.add( this.mesh );
  }

  update() {
    this.scale = this.scale + 0.01
    this.mesh.scale.set(this.scale, this.scale, this.scale)
  }
}


class PlaneEntity extends Entity{
  constructor(y) {
      super()
      this.geometry = new THREE.PlaneGeometry(100, 100);
      this.material = new THREE.MeshStandardMaterial({color: 0xffffff});
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      this.mesh.position.y = y;

      this.mesh.castShadow = false; //default is false
      this.mesh.receiveShadow = true; //default
      scene.add( this.mesh );
      this.mesh.rotation.x = -3.14159/2;
  }

  update() {
  }
}


class TestEntity extends Entity{
  constructor(col, x, y, z) {
        super()

        this.light = new THREE.DirectionalLight( col, 1 );
        this.light.position.set( x, y, z );
        this.light.castShadow = true;            // default false

        this.light.shadow.mapSize.width = 512;
        this.light.shadow.mapSize.height = 512;

        this.light.shadow.camera.near = 1;    // default
        this.light.shadow.camera.far = 20;     // default

        this.light.shadow.camera.left     = -30;
        this.light.shadow.camera.right    =  30;
        this.light.shadow.camera.top      =  30;
        this.light.shadow.camera.bottom   = -30;

        scene.add( this.light );
  }

  update() {

  }
}


objects = []
minRadius = 1
maxRadius = 100
totalSpheres = 500
createSphereAttempts = 500



for (n=0; n<100; n++)
{
    objects.push(new SphereEntity())
}

objects.push(new PlaneEntity(-1))

objects.push(new TestEntity(0xff7700, 10, 10, 0))
objects.push(new TestEntity(0x0044ff, -10, 10, 0))


var animate = function () {
    requestAnimationFrame( animate );

    for (n=0; n<objects.length*0.1; n++)
    {
        objects[n].update()
    }

    controls.update();

    renderer.render( scene, camera );
};

animate();
