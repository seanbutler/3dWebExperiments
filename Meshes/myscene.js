// ---------------------------------------------------------------------------

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.x= 0;
camera.position.y = 1.5;
camera.position.z = 2;

// ---------------------------------------------------------------------------

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// ---------------------------------------------------------------------------

class Service{
    constructor(){
    }

    Update(){
    }
};

// ---------------------------------------------------------------------------


class KeyboardService extends Service{
    constructor(){
        super();
        document.addEventListener("keydown", this.DocumentKeyDown, false);
        document.addEventListener("keyup", this.DocumentKeyUp, false);

        this.keys=[];
    }

    DocumentKeyDown(event) {
        var keyCode = event.keyCode;
        keyboardService.keys[keyCode]=true;
        console.log("Down")
    };

    DocumentKeyUp(event) {
        var keyCode = event.keyCode;
        keyboardService.keys[keyCode]=false;
        console.log("Up")
    };

    IsKeyDown(keyCode){
        return this.keys[keyCode];
    }
};

keyboardService = new KeyboardService();

// ---------------------------------------------------------------------------

var entities = []

class Entity {
  constructor(x, y) {
  }

  update() {
  }

  reset() {
  }
}

// ---------------------------------------------------------------------------



class Obstacle extends Entity {

  constructor(x, y, z) {
      super()
      this.size = 1.0;
      this.collidable = true;
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
      super.update();

      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.01;
  }
}

// ---------------------------------------------------------------------------

class Avatar extends Entity{
    constructor(x, y, z) {
        super()

        // var meshLoader = new THREE.ObjectLoader();
        // meshLoader.load( "assets/spaceship/test-scene-2.json", (geo, materals) => {
        this.x = x;
        this.y = y;
        this.z = z;

        var meshLoader = new THREE.JSONLoader();
        meshLoader.load( "assets/stork.json", (geometry) => {

            var material = new THREE.MeshLambertMaterial( {
                vertexColors: THREE.FaceColors,  // use colors from the geometry
                morphTargets: true
            });

            this.mesh = new THREE.Mesh( geometry, material );

            this.mesh.position.x = this.x;
            this.mesh.position.y = this.y;
            this.mesh.position.z = this.z;

            scene.add(this.mesh);

            // this.mixer = new THREE.AnimationMixer( this.mesh );
            // this.prevMixerTime = Date.now();
            // this.clip = THREE.AnimationClip.CreateFromMorphTargetSequence( 'motion', geometry.morphTargets, 30 );
            // this.mixer.clipAction(this.clip).setDuration(1).play();
        } );
    }

    animate() {
        // if (this.mixer) {
        //     var time = Date.now();
        //     this.mixer.update((time - this.prevMixerTime) * 0.001);
        //     this.prevMixerTime = time;
        // }

    }

    update() {

        super.update();

        if ( this.mesh != undefined)
        {
            if ( keyboardService.IsKeyDown(68))
            {
                this.mesh.position.x += 0.1;
            }

            if ( keyboardService.IsKeyDown(65))
            {
                this.mesh.position.x -= 0.1;
            }

            if ( keyboardService.IsKeyDown(83))
            {
                this.mesh.position.z += 0.1;
            }

            if ( keyboardService.IsKeyDown(87))
            {
                this.mesh.position.z -= 0.1;
            }

            this.mesh.rotation.y = 0.1 * Math.sin(Date.now() * 0.001);
        }
        this.animate();

    }



}

// ---------------------------------------------------------------------------

class EnvironmentEntity extends Entity{
  constructor(x, y, c) {
      super()
      this.geometry = new THREE.PlaneGeometry( 10, 10);
      this.material = new THREE.MeshStandardMaterial({color: c});
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      this.mesh.castShadow = false; //default is false
      this.mesh.receiveShadow = true; //default
      scene.add( this.mesh );
      this.mesh.rotation.x = -3.14159/2;
  }
}

// ---------------------------------------------------------------------------

class LightEntity extends Entity{
  constructor(x, y, z, c) {
        super()

        this.light = new THREE.DirectionalLight( c, 1 );
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
}

// ---------------------------------------------------------------------------

entities.push(new LightEntity(10, 10, 0, 0xCCCCCC));
entities.push(new LightEntity(-10, 10, 0, 0xAAAAAA));
entities.push(new EnvironmentEntity(0, 0, 0xEEEEEE));
entities.push(new Avatar(0, 1, 0));

// ---------------------------------------------------------------------------

var animate = function () {

    for (thing of entities) {
         thing.update();
     }
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
};

// ---------------------------------------------------------------------------

animate();
