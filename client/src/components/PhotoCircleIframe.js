import React, {Component} from "react";

import Scene from "./Scene";


class votingForm {

    constructor(mongoDocs){
        this.IDs = [];
        this.votes = [];


    }
}


class PhotoCircleIframe extends Component {

    constructor(props){
      super(props);
      this.rightBumper = this.rightBumper.bind(this);
      this.leftBumper = this.leftBumper.bind(this);

      this.scene = new Scene();
      this.form = new votingForm(props.db);

      this.height = window.innerWidth < 480 ? 500 : 300;
      this.width = window.innerWidth < 480 ? window.innerWidth : 400;
      this.imgURLS=[0,0,0]

      this.state = {
          THREEdom: (<></>),
          currImageFocused: 0
      }


    }
    componentDidMount(){
      this.scene.render(this.mount);
      this.scene.createCelebBoxes(this.props.db);
      this.scene.renderScene();
      this.scene.resetTime();

    }
    componentWillUnmount(){
      this.scene.componentWillUnmount(this.mount);
    }

    render(){
        return (
        <>
          <div
          style={{ width: `${this.width}px`, height: `${this.height}px` }}
          ref={(mount) => { this.mount = mount }}
        ></div>
        <button onClick={this.leftBumper} className="left" type="button">CW!</button>
        <button onClick={this.rightBumper} className="right" type="button">CCW!</button>

        </>
      )
    }
    rightBumper(){
      var newCurr = this.state.currImageFocused;
      if(newCurr === 0){
          newCurr = 2;
      }
      else{
          newCurr--;
      }
      this.scene.next = newCurr;

      this.scene.setMiddle(newCurr);
      this.scene.rotateCCW();
        

      this.setState({
          currImageFocused: newCurr
      });
    }
    leftBumper(){
        var newCurr = this.state.currImageFocused;
        if(newCurr === 2){
            newCurr = 0;
        }
        else{
            newCurr++;
        }
        this.scene.next = newCurr;

        this.scene.setMiddle(newCurr);
        this.scene.rotateCW();
        
        this.setState({
            currImageFocused: newCurr
        });
    }
}

export default PhotoCircleIframe;
