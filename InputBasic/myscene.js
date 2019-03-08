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

var entities = []

class Entity {
  constructor(x, y) {
  }

  update() {
  }

  reset() {
  }
}

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


class Avatar extends Entity{
    constructor(x, y, z) {
      super()
      this.size = 1.0;
      this.geometry = new THREE.BoxGeometry( 1);
      this.material = new THREE.MeshStandardMaterial( );
      this.mesh = new THREE.Mesh( this.geometry, this.material );

      this.mesh.position.x = x;
      this.mesh.position.y = y;
      this.mesh.position.z = z;

      this.mesh.castShadow = true; //default is false
      this.mesh.receiveShadow = false; //default

      scene.add( this.mesh );
    }



    distanceTo(x, z) {
        // (xA-xB)²+(yA-yB)²+(zA-zB)² < (rA+rB)²

        let dist = Math.abs ( Math.sqrt (
                        ( ( this.mesh.position.x - x ) * ( this.mesh.position.x - x ) ) +
                        ( ( this.mesh.position.z - z ) * ( this.mesh.position.z - z ) )
                    ) );

    	// console.log("DistanceTo() = " + dist);
        return dist;
    }

    isCollidedWith(that) {
        // size + size > distance
        let collidedWith = (this.size + that.size) > this.distanceTo(that.mesh.position.x,  that.mesh.position.z);
        //	console.log("IsCollidedWith() " + collidedWith + " " + (this.size + that.size));
        return collidedWith;
    }

    collidedWithObstacle() {
        for(var n=0; n<entities.length; n++) {
            if ( entities[n].collidable == true ) {
                if ( this.isCollidedWith(entities[n]) == true ) {
                    return true;
                }
            }
        }
        return false;
    }


    update() {
        super.update();

        if ( this.collidedWithObstacle() )
        {
            console.log(" ------ CRASH ------- ");
        }


        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }

}

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

// var entities = [];

entities.push(new LightEntity(10, 10, 0, 0xFF7700));
entities.push(new LightEntity(-10, 10, 0, 0x0077FF));

entities.push(new Obstacle(-1.5, 1, 0));
entities.push(new Obstacle(0, 1, 0));

entities.push(new EnvironmentEntity(0, 0, 0x00FF00));

var avatar = new Avatar(1.5, 1, 0);
entities.push(avatar);


var animate = function () {
    requestAnimationFrame( animate );

    for (thing of entities) {
         thing.update();
     }
    renderer.render( scene, camera );
};


document.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
    var keyCode = event.keyCode;
    // up
    if (keyCode == 87) {
        avatar.mesh.position.y += 0.25;
        // down
    } else if (keyCode == 83) {
        avatar.mesh.position.y -= 0.25;
        // left
    } else if (keyCode == 65) {
        avatar.mesh.position.x -= 0.25;
        // right
    } else if (keyCode == 68) {
        avatar.mesh.position.x += 0.25;
        // space
    } else if (keyCode == 32) {
        avatar.mesh.position.x = 0.0;
        avatar.mesh.position.y = 0.0;
        avatar.mesh.position.z = 0.0;
    }
};



animate();
