import * as THREE from 'three';
import _ from "lodash";


// this will be the cirlce vector that is created by the sinucoial
// movements of the pictures.
const radius = 15;
// const seperation = 2/3 * Math.PI;




class Scene {
  constructor() {

    // this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    // this.animate = this.animate.bind(this);
    this.render = this.render.bind(this);
    this.rotateCW = this.rotateCW.bind(this);
    this.rotateCCW = this.rotateCCW.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.time = 0;
    this.curr = 0; //the index of the image thats focused
    this.celebs = [null,null,null];
    this.currThetas=[0,0,0];
    this.setDefaultPos(); // does notmodify the mesh properties of postion
    this.append();
  }

  editVector3FromTheta(index){
    // this.currThetas[index]
    this.currPoss[index].x = radius * Math.cos(this.time + this.currThetas[index]);
    this.currPoss[index].z = radius * Math.sin(this.time + this.currThetas[index]);

  }


  setDefaultPos(){
    this.currPoss = [new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3()];
    var left = this.curr- 1 < 0 ? 2 : this.curr - 1;
    var right = this.curr+ 1 > 2  ? 0 : this.curr + 1;
    this.time = 0;

    this.currThetas[left] = Math.PI *150/180; // are make them to the current values
    this.currThetas[this.curr] = Math.PI *270/180;
    this.currThetas[right] = Math.PI *30/180;

    this.editVector3FromTheta(left);
    this.editVector3FromTheta(right);
    this.editVector3FromTheta(this.curr);

    //
    this.currPoss[right].y+=10;
    this.currPoss[left].y+=10;
    this.currPoss[right].z-=20;
    this.currPoss[left].z-=20;
    this.currPoss[this.curr].z =7

  }
  createCelebBoxes(imgURLs){
    var loader = new THREE.TextureLoader();
    var group = new THREE.Group();
    var urls = [
      `http://${window.location.host}/static/kiss.jpeg`,
      `http://${window.location.host}/static/kill.jpg`,
      `http://${window.location.host}/static/marry.jpg`
    ]
    this.celebs = _.map(urls,(val,index)=>{
      // i have yet to upload images to the local storag elocation which apparently is required.
      var texture = loader.load( val );
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

    var geometry = new THREE.SphereGeometry( 1, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var s1 = new THREE.Mesh( geometry, material );
    var s2 = new THREE.Mesh( geometry, material );
    var s3 = new THREE.Mesh( geometry, material );


    s1.position.set(this.currPoss[2].x,this.currPoss[2].y,this.currPoss[2].z);// curr right
    s2.position.set(this.currPoss[1].x,this.currPoss[1].y,this.currPoss[1].z);// curr right
    s3.position.set(this.currPoss[0].x,this.currPoss[0].y,this.currPoss[0].z);// curr right




    this.scene.add(group);
    this.scene.add(s1);
    this.scene.add(s2);
    this.scene.add(s3);

    this.group = group;
    console.log(this.currPoss);
  }

  rotateCW(){
    var left = this.curr- 1 < 0 ? 2 : this.curr - 1;
    var right = this.curr+ 1 > 2  ? 0 : this.curr + 1;
    console.log(this.celebs[right].position.x);
    if(this.celebs[right].position.x > -0.2 && this.celebs[right].position.x < 0.2 ){
      console.log("SNAPPING",this.celebs[this.curr].position);
      this.setDefaultPos();
      // console.log("NOT SNAPPING",pos_list);
      this.celebs[2].position.set(this.currPoss[2].x,this.currPoss[2].y,this.currPoss[2].z);// curr right
      this.celebs[1].position.set(this.currPoss[1].x,this.currPoss[1].y,this.currPoss[1].z);// curr right
      this.celebs[0].position.set(this.currPoss[0].x,this.currPoss[0].y,this.currPoss[0].z);// curr right

      this.curr = right;
    }
    else{

      this.editVector3FromTheta(left);
      this.editVector3FromTheta(right);
      this.editVector3FromTheta(this.curr);


      // this.currPoss[right].y-=0.02;
      // this.currPoss[right].z+=0.08;
      //
      //
      // this.currPoss[this.curr].y+=0.02;
      // this.currPoss[this.curr].z-=0.08;

      this.celebs[2].position.set(this.currPoss[2].x,this.currPoss[2].y,this.currPoss[2].z);// curr right
      this.celebs[1].position.set(this.currPoss[1].x,this.currPoss[1].y,this.currPoss[1].z);// curr right
      this.celebs[0].position.set(this.currPoss[0].x,this.currPoss[0].y,this.currPoss[0].z);// curr right
      // this.celebs[left].__dirtyPosition = true;
      // this.celebs[this.curr].__dirtyPosition = true;
      // this.celebs[right].__dirtyPosition = true;

      this.time += 0.02;
      this.renderScene();
      this.frameId = window.requestAnimationFrame(this.rotateCW)
    }
  }
  rotateCCW(nextCurr){
    var left = this.curr- 1 < 0 ? 2 : this.curr - 1;
    var right = this.curr+ 1 > 2  ? 0 : this.curr + 1;
    // this.celebs[nextCurr] will move to 0,0,0 somehow
    if(this.celebs[this.curr].position.x > -0.2|| this.celebs[this.curr].position.x < 0.2 ){
      // snap into place
      this.setDefaultPos();

    }
    else{

      this.editVector3FromTheta(left);
      this.editVector3FromTheta(right);
      this.editVector3FromTheta(this.curr);

      // console.log("NOT SNAPPING",pos_list);
      this.celebs[left].position.set(this.currPoss[left]);
      this.celebs[this.curr].position.set(this.currPoss[this.curr])
      this.celebs[right].position.set(this.currPoss[right]);

      this.time += 0.01;
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
    camera.position.z = 15;
    // camera.position.y = 40;
    // camera.lookAt(new THREE.Vector3(0,0,-10));

    camera.updateProjectionMatrix ()
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
