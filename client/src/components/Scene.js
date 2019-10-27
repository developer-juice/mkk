import * as THREE from 'three';
import _ from "lodash";


// this will be the cirlce vector that is created by the sinucoial
// movements of the pictures.
const radius = 15;
// const seperation = 2/3 * Math.PI;




class Scene {
  constructor() {

    this.stop = this.stop.bind(this)
    this.render = this.render.bind(this);
    this.pullCenterCircle = this.pullCenterCircle.bind(this);
    this.pushBackToDisplay = this.pushBackToDisplay.bind(this);
    this.rotateCW = this.rotateCW.bind(this);
    this.rotateCCW = this.rotateCCW.bind(this);
    this.renderScene = this.renderScene.bind(this);


    this.time = 0;
    this.curr = 0; //the index of the image thats focused
    // if this. curr =0;, [curr, right, left]. its a left bitshift per say
    this.celebs = [null,null,null];
    this.currThetas=[0,0,0];
    this.setDefaultPos(); // does notmodify the mesh properties of postion
    this.append();
  }

  editVector3FromTheta(index){
   
    // this.currThetas[index]
    this.currPoss[index].x = radius * Math.cos(0+ this.currThetas[index] + this.time );
    this.currPoss[index].z = radius * Math.sin(0+  this.currThetas[index] + this.time);

  }

  setMiddle(el){
    this.curr = el;
  }


  setDefaultPos(){
    this.currPoss = [new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3()];
    var left = this.curr- 1 < 0 ? 2 : this.curr - 1;
    var right = this.curr+ 1 > 2  ? 0 : this.curr + 1;
    this.time = 0;

    this.currThetas[left] = 3.14159 *210/180; // are make them to the current values
    this.currThetas[this.curr] = 3.14159 *90/180;
    this.currThetas[right] = 3.14159 *330/180;

    this.editVector3FromTheta(left);
    this.editVector3FromTheta(right);
    this.editVector3FromTheta(this.curr);

    this.currPoss[right].y+=10;
    this.currPoss[left].y+=10;
  
    if(this.camera){
      this.camera.position.z = 18.5;
      this.camera.updateProjectionMatrix();
    }
    return;
  }
  createCelebBoxes(imgURLs){
    console.log("START",imgURLs);
    var loader = new THREE.TextureLoader();
    var group = new THREE.Group();
    this.celebs = _.map(imgURLs,(val,index)=>{
      // i have yet to upload images to the local storag elocation which apparently is required.
      var texture = loader.load( val.profilepic );
      var geometry = new THREE.BoxGeometry(3,4.5,0.5);
      var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { side: THREE.DoubleSide, map: texture } ) );

      group.add(mesh);
      return mesh;
    });

    // base is (-5,0,-5) + y (0,5,0) + z ( 0,5,-10)
    // radius = 14.1421356
    this.celebs[2].position.set(this.currPoss[2].x,this.currPoss[2].y,this.currPoss[2].z);// curr right
    this.celebs[1].position.set(this.currPoss[1].x,this.currPoss[1].y,this.currPoss[1].z);// curr right
    this.celebs[0].position.set(this.currPoss[0].x,this.currPoss[0].y,this.currPoss[0].z);// curr right





    this.scene.add(group);

    this.group = group;
  }

  // i dont need to bind these things because a bound function calls them already.
  pullCenterCircle(){

  }
  pushBackToDisplay(){

  }



  /* 
  pull all 
  the spheres back to the position in 
  the circle with all the same radius, rotate them, 
  
  then expand
  it to the view thats normal.

  */
  rotateCW(){
    var left = this.curr- 1 < 0 ? 2 : this.curr - 1;
    var right = this.curr+ 1 > 2  ? 0 : this.curr + 1;
    if(this.celebs[this.curr].position.x > -0.2 && this.celebs[this.curr].position.x < 0.2 ){
      // console.log("SNAPPING",this.celebs[this.curr].position,this.curr);
      this.setDefaultPos();
      this.celebs[2].position.set(this.currPoss[2].x,this.currPoss[2].y,this.currPoss[2].z);// curr right
      this.celebs[1].position.set(this.currPoss[1].x,this.currPoss[1].y,this.currPoss[1].z);// curr right
      this.celebs[0].position.set(this.currPoss[0].x,this.currPoss[0].y,this.currPoss[0].z);// curr right
    }
    else{
      this.editVector3FromTheta(left);
      this.editVector3FromTheta(right);
      this.editVector3FromTheta(this.curr);

      this.currPoss[left].y+=0.25;
      this.currPoss[this.curr].y-=0.27;
      // this.currPoss[this.curr].z-=0.08;

      this.celebs[2].position.set(this.currPoss[2].x,this.currPoss[2].y,this.currPoss[2].z);// curr right
      this.celebs[1].position.set(this.currPoss[1].x,this.currPoss[1].y,this.currPoss[1].z);// curr right
      this.celebs[0].position.set(this.currPoss[0].x,this.currPoss[0].y,this.currPoss[0].z);// curr right
      this.camera.position.z = 18.5 + 3 * Math.abs(Math.sin(this.time/2)); 
      this.camera.updateProjectionMatrix();


      this.time += 0.05;
      this.renderScene();
      this.frameId = window.requestAnimationFrame(this.rotateCW)
    }
  }
  rotateCCW(){
    var left = this.curr- 1 < 0 ? 2 : this.curr - 1;
    var right = this.curr+ 1 > 2  ? 0 : this.curr + 1;
    if(this.celebs[this.curr].position.x > -0.2 && this.celebs[this.curr].position.x < 0.2 ){
      this.setDefaultPos();
      this.celebs[2].position.set(this.currPoss[2].x,this.currPoss[2].y,this.currPoss[2].z);// curr right
      this.celebs[1].position.set(this.currPoss[1].x,this.currPoss[1].y,this.currPoss[1].z);// curr right
      this.celebs[0].position.set(this.currPoss[0].x,this.currPoss[0].y,this.currPoss[0].z);// curr right
    }
    else{

      this.editVector3FromTheta(left);
      this.editVector3FromTheta(right);
      this.editVector3FromTheta(this.curr);


      this.currPoss[this.curr].y-=0.25;
      this.currPoss[right].y+=0.27;
      // this.currPoss[this.curr].z-=0.08;

      this.celebs[2].position.set(this.currPoss[2].x,this.currPoss[2].y,this.currPoss[2].z);// curr right
      this.celebs[1].position.set(this.currPoss[1].x,this.currPoss[1].y,this.currPoss[1].z);// curr right
      this.celebs[0].position.set(this.currPoss[0].x,this.currPoss[0].y,this.currPoss[0].z);// curr right
      this.camera.position.z = 18.5 + 3 * Math.abs(Math.sin(this.time/2)); 
      this.camera.updateProjectionMatrix();


      this.time -= 0.05;
      this.renderScene();
      this.frameId = window.requestAnimationFrame(this.rotateCCW)
    }
  }
  resetTime(){

    this.time = 0;
  }

  append() {
    const height = window.innerWidth < 480 ? 500 : 300;
    const width = window.innerWidth < 480 ? window.innerWidth : 400;

    this.scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )

    this.renderer = new THREE.WebGLRenderer({ antialias: true ,alpha: true});
    camera.position.z = 18.5;
    camera.position.y = 0;
    camera.lookAt(new THREE.Vector3(0,1,0));

    camera.updateProjectionMatrix();


    this.renderer.setSize(width, height)

    this.camera = camera;
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 1 ).normalize();
    this.scene.add(light);
    this.renderScene();



  }

  componentWillUnmount(mount) {
    this.stop()
    mount.removeChild(this.renderer.domElement)
  }



  stop() {
    cancelAnimationFrame(this.frameId)
  }




  renderScene() {
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(this.renderScene)
  }

  render(mount){
    mount.appendChild(this.renderer.domElement);

  }

}

export default Scene
