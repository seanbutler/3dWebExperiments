// ---------------------------------------------------------------------------

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0, 50, 100);
var controls = new THREE.OrbitControls( camera );
controls.update();
// ---------------------------------------------------------------------------

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor( 0xAAAAFF);

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

class Entity extends THREE.Object3D{
  constructor() {
      super();
  }

  update() {
  }

  reset() {
  }
}

// ---------------------------------------------------------------------------

class Avatar extends Entity{
    constructor(parent, x, y, z) {
        super()

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        var meshLoader = new THREE.JSONLoader();
        meshLoader.load( "assets/parrot.json", (geometry) => {

            var material = new THREE.MeshLambertMaterial( {
                vertexColors: THREE.FaceColors,  // use colors from the geometry
                morphTargets: true
            });

            this.mesh = new THREE.Mesh( geometry, material );

            this.mixer = new THREE.AnimationMixer( this.mesh );
            this.prevMixerTime = Date.now();
            this.clip = THREE.AnimationClip.CreateFromMorphTargetSequence( 'motion', geometry.morphTargets, 30 );
            this.mixer.clipAction(this.clip).setDuration(1).play();

            this.mesh.castShadow = true;

            this.add(this.mesh);
        } );
        parent.add(this);
    }

    animate() {
        if (this.mixer) {
            var time = Date.now();
            this.mixer.update((time - this.prevMixerTime) * 0.001);
            this.prevMixerTime = time;
        }
    }

    update() {

        super.update();

        if ( this.mesh )
        {
            if ( keyboardService.IsKeyDown(68))
            {
                this.position.x += 0.2;
            }

            if ( keyboardService.IsKeyDown(65))
            {
                this.position.x -= 0.2;
            }

            if ( keyboardService.IsKeyDown(83))
            {
                this.position.z -= 0.2;
            }

            if ( keyboardService.IsKeyDown(87))
            {
                this.position.z += 0.2;
            }

            if ( keyboardService.IsKeyDown(32))
            {
                this.position.y += 0.2;
            }

            if ( keyboardService.IsKeyDown(16))
            {
                this.position.y -= 0.2;
            }

            this.mesh.rotation.y = 0.075 * Math.sin(Date.now() * 0.001);

            // camera.position.x = this.position.x;
            // camera.position.y = this.position.y + 1.0;
            // camera.position.z = this.position.z - 6.0;
            // camera.rotation.y = Math.PI;
            this.animate();

        }

    }

}

// ---------------------------------------------------------------------------

class WaterSurface extends Entity{
    constructor(parent) {
        super();

		var color = new THREE.Color();
        this.geometry = new THREE.PlaneBufferGeometry( 200, 200, 100, 100 );
        this.geometry.rotateX( - Math.PI / 2 );

        var positions = this.geometry.attributes.position;
        var vertex = new THREE.Vector3();
        var colors = [];

		this.floorMaterial=new THREE.MeshPhongMaterial( {
                                        color: 0x3377FF,
                                        specular: 0xFFFFFF,
                                        shininess: 96,
                                        flatShading: true,
                                        transparent: true,
                                        opacity: 0.95,
                                        // wireframe: true,
                                    } );

        // this.floorMaterial.shading = THREE.FlatShading;
        this.mesh = new THREE.Mesh( this.geometry, this.floorMaterial );
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = false;

        this.add( this.mesh );
        parent.add(this);
    }

    update() {
        super.update();

        var positions = this.geometry.attributes.position;
        var vertex = new THREE.Vector3();

        for ( var x = 0; x < 101; x++ ) {
            for ( var y = 0; y < 101; y++ ) {

                var pos = ( x * 101 ) + y;

            	vertex.fromBufferAttribute( positions, pos );
                var time = Date.now() * 0.001;
                vertex.y = 0;

                vertex.y += 2.70 * Math.sin ( ( 0.170 * x ) + (time * 1)) * 0.2;
                vertex.y += 0.40 * Math.sin ( ( 0.410 * x ) + (time * 3)) * 0.2;
                vertex.y += 0.15 * Math.sin ( ( 0.710 * x ) + (time * 5)) * 0.2;

                vertex.y += 2.5 * Math.sin ( ( 0.150 * y ) + ( time * 1.7 ) ) * 0.2;
                vertex.y += 0.4 * Math.sin ( ( 0.500 * y ) + ( time * 2.3 )) * 0.2;
                vertex.y += 0.1 * Math.sin ( ( 0.800 * y ) + ( time * 4.1 ) ) * 0.2;

                // vertex.y += 1.5 * Math.sin ( ( 0.150 * x ) + 1 * 1);
                // vertex.y += 0.5 * Math.sin ( ( 0.500 * x ) + 1 * 3);
                // vertex.y += 0.1 * Math.sin ( ( 0.800 * x ) + 1 * 5);

                // vertex.y += 1.5 * Math.sin ( ( 0.150 * y ) + 1 * 1.7);
                // vertex.y += 0.4 * Math.sin ( ( 0.500 * y ) + 1 * 2.3);
                // vertex.y += 0.1 * Math.sin ( ( 0.800 * y ) + 1 * 4.1);

            	positions.setXYZ( pos, vertex.x, vertex.y, vertex.z );
            }
        }

        this.geometry.attributes.position.needsUpdate = true;

        // this.position.x = avatar.position.x;
        // this.position.y = 0;
        // this.position.z = avatar.position.z;
    }
}

// ---------------------------------------------------------------------------

class BasicIsland extends Entity {
    constructor(parent, x, y, z) {
        super();

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.geometry = new THREE.CylinderBufferGeometry( 8, 14, 32, 11 );

		this.material=new THREE.MeshPhongMaterial({
                                        color: 0x00ff00,
                                        specular: 0x00ff00,
                                        shininess: 50,
                                        flatShading: true
                                    });


        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;

        this.add(this.mesh);
        parent.add(this);
    }

    update() {
        super.update();
    }
}

// ---------------------------------------------------------------------------

class VolcanicIsland extends Entity {
    constructor(parent) {
        super();

        this.position.x = 0;
        this.position.y = -5;
        this.position.z = 0;

        var color = new THREE.Color();
        this.geometry = new THREE.PlaneBufferGeometry( 100, 100, 100, 100 );
        this.geometry.rotateX( - Math.PI / 2 );

        // var positions = this.geometry.attributes.position;
        // var vertex = new THREE.Vector3();
        // var colors = [];

        this.material=new THREE.MeshPhongMaterial( {
                                        color: 0x777777,
                                        specular: 0x777777,
                                        shininess: 1,
                                        flatShading: true,
                                        transparent: false,
                                        // wireframe: true,
                                    } );

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = false;

        this.add( this.mesh );
        parent.add(this);


        var maxislands = Math.floor(Math.random() * 5 )
        for ( var islands = 0; islands < maxislands; islands++)
        {
            var p1 = 500000;
            var p2 = 1000000;

            var x1 = 40.0;
            var x2 = 40.0;

            var z1 = 40.0;
            var z2 = 40.0;

            this.generate(Math.random() * p1 + Math.random() * p2,
                            new THREE.Vector3(Math.random()*x1 + Math.random() * x2,
                                                0,
                                                Math.random()*z1 + Math.random()*z2)
                        );

        }
    }

    generate(particles, centre) {

        var positions = this.geometry.attributes.position;
        var vertex = new THREE.Vector3();

        for (var n=0; n<particles; n++ )
        {
            var angle = (( Math.random() *  Math.PI/2) + ( Math.random() *  Math.PI/2)) /2;

            var direction = Math.random() * ( 2 * Math.PI);
            var velocity = 1 + Math.random() * 2;

            // DISTANCE CALCULATION FROM https://keisan.casio.com/exec/system/1225079475
            var distance = ( (velocity * velocity) * Math.sin( 2 * angle ) ) / 9.8;

            // COORDINATES CALCULATION FROM https://www.theclassroom.com/coordinates-distances-angles-2732.html
            // soh, cah, toa

            var deltax = Math.sin(direction) * distance;
            var deltaz = Math.cos(direction) * distance;

            // console.log(deltax, deltaz);

            var coords = new THREE.Vector3();
            coords.x = Math.floor(centre.x + deltax * 50);
            coords.z = Math.floor(centre.z + deltaz * 50);

            var meshVertexIndex = ( coords.x * 101 ) + coords.z;

            var meshVertex = new THREE.Vector3();
            meshVertex.fromBufferAttribute( positions, meshVertexIndex );
            // meshVertex.x =   coords.x;
            meshVertex.y += 0.005;
            // meshVertex.z = coords.z;

            positions.setXYZ( meshVertexIndex, meshVertex.x, meshVertex.y, meshVertex.z );
            this.geometry.attributes.position.needsUpdate = true;
        }

    }

    update() {
        super.update();
    }
}

// ---------------------------------------------------------------------------

class AmbientLightEntity extends Entity{
  constructor(c) {
        super()

        this.light = new THREE.AmbientLight( c );

        // var lightHelper = new THREE.AmbientlLightHelper( this.light, 5 );
        // scene.add(lightHelper)


        this.add( this.light );
        scene.add( this );
  }
}

class DirectionalLightEntity extends Entity{
  constructor(parent, x, y, z, c, s) {
        super()

        this.light = new THREE.DirectionalLight( c, 1 );
        this.light.position.set( x, y, z );

        this.light.castShadow = true;            // default false

        this.light.shadow.mapSize.width = 1024;
        this.light.shadow.mapSize.height = 1024;

        this.light.shadow.camera.near = 700;    // default
        this.light.shadow.camera.far = 1200;     // default

        this.light.shadow.camera.left     = -50;
        this.light.shadow.camera.right    =  50;
        this.light.shadow.camera.top      =  50;
        this.light.shadow.camera.bottom   = -50;
        this.light.shadowDarkness = 0.75;

        // var directionalLightHelper = new THREE.DirectionalLightHelper( this.light, 5 );
        // scene.add(directionalLightHelper)
        // var shadowHelper = new THREE.CameraHelper( this.light.shadow.camera );
        // scene.add( shadowHelper );


		this.light.add( new THREE.Mesh( new THREE.SphereBufferGeometry( 40, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );

        scene.add( this.light );
        scene.add( this.light.target );

        parent.add(this);
  }

  update() {
      // var time = Date.now() * 0.001;
      // this.light.position.set(
      //                       0,
      //                       1000 * Math.sin ( time * 1/6),
      //                       1000 * Math.cos ( time * 1/6),
      //                   );
  }
}

// ---------------------------------------------------------------------------

// var avatar = new Avatar(scene, 0, 5, 0);
// entities.push(avatar);

entities.push(new WaterSurface(scene));
// entities.push(new AmbientLightEntity(0x333333));

// entities.push(new DirectionalLightEntity(scene, 0, 10, 0, 0xFFFFFF, true));
entities.push(new DirectionalLightEntity(scene, 1000, 1000, 0, 0xFFAA66, true));

// entities.push(new BasicIsland(scene, 0, 0, 0));
// entities.push(new BasicIsland(scene, 20, 5, 0));
// entities.push(new BasicIsland(scene, 0, 3, 20));

entities.push(new VolcanicIsland(scene, 0, -10, 0));

// ---------------------------------------------------------------------------

var animate = function () {

    for (thing of entities) {
         thing.update();
     }

     controls.update();
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
};

// ---------------------------------------------------------------------------

animate();
