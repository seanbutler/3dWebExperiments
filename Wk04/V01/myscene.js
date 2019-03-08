var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.x= 0;
camera.position.y = 1;
camera.position.z = 2;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

class Entity {
  constructor(x, y) {
  }

  update() {
  }
}

class BoxEntity extends Entity{
  constructor(x, y, z) {
      super()
      this.geometry = new THREE.TorusKnotGeometry( 0.4, 0.15, 64, 32);
      this.material = new THREE.MeshStandardMaterial( );
      this.mesh = new THREE.Mesh( this.geometry, this.material );

      this.mesh.position.x = x;
      this.mesh.position.y = y;
      this.mesh.position.z = z;

      this.mesh.castShadow = true; //default is false
      this.mesh.receiveShadow = false; //default

      scene.add( this.mesh );
  }

  update() {
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.01;
  }
}


class PlaneEntity extends Entity{
  constructor(x, y) {
      super()
      this.geometry = new THREE.PlaneGeometry( 10, 10);
      this.material = new THREE.MeshStandardMaterial({color: 0xfff000});
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      this.mesh.castShadow = false; //default is false
      this.mesh.receiveShadow = true; //default
       scene.add( this.mesh );
      this.mesh.rotation.x = -3.14159/2;
  }

  update() {
      // this.mesh.rotation.z += 0.1;
  }
}


class TestEntity extends Entity{
  constructor(x, y, z) {
        super()

        this.light = new THREE.DirectionalLight( 0xffffff, 1 );
        this.light.position.set( x, y, z );
        this.light.castShadow = true;            // default false

        this.light.shadow.mapSize.width = 512;
        this.light.shadow.mapSize.height = 512;

        this.light.shadow.camera.near = 1;    // default
        this.light.shadow.camera.far = 20;     // default

        this.light.shadow.camera.left     = -3;
        this.light.shadow.camera.right    =  3;
        this.light.shadow.camera.top      =  3;
        this.light.shadow.camera.bottom   = -3;

        scene.add( this.light );
  }

  update() {
  }
}

obj1 = new BoxEntity(-1.5, 1, 0)
obj2 = new BoxEntity(0, 1, 0)
obj3 = new BoxEntity(1.5, 1, 0)

obj4 = new PlaneEntity(0, 0)
test = new TestEntity(0, 10, 0)

var animate = function () {
    requestAnimationFrame( animate );

    obj1.update();
    obj2.update();
    obj3.update();

    obj4.update();
    test.update();


    renderer.render( scene, camera );
};

animate();
