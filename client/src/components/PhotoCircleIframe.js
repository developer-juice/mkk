import React, {Component} from "react";

import Scene from "./Scene";
import "../style/form.css"



function getGameText(index){
  switch(index){
    case 0:
      return "Marry";
      break;
    case 1:
      return "Kiss";
      break;
    default:
      return "Kill";
      break;  
  }
}

class votingForm {

    constructor(mongoDocs){
        this.IDs = [];
        this.votes = ["Undecided","Undecided","Undecided"];
        this.objs = mongoDocs;
    }
    getCurrentVote(index){
      return this.votes[index];
    }
  }

function radioButton(index){
  var text = getGameText(index);
  

  return (
    <label className="btn">
    <input type="radio" value={text.toUpperCase()} name={"choice number "+index} />
    <i className="fa fa-circle-o fa-2x"></i>
    <i className="fa fa-dot-circle-o fa-2x"></i>
    <span>{text}</span>
  </label>
  )
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
    renderForm(){
      var index = this.state.currImageFocused;
      var celeb = this.props.db[index];
      return (
      <table className="vote-form">
        <thead className="vote-form">
          <tr>


            <th><button onClick={this.leftBumper} className="left" type="button">Bump Left CW!</button></th>
            <th> . </th>
            <th><button onClick={this.rightBumper} className="right" type="button"> Bump Right CCW!</button></th>
          </tr>
          <caption> ----------- VOTE ---------------</caption>

          <tr>
            <th> Name </th>
            <th> Gender </th>
            <th> Current Vote</th>
          </tr>
          <tr>
            <td>{celeb.name}</td>
            <td>{celeb.gender}</td>
            <td>{this.form.getCurrentVote(index)}</td>
          </tr>
        </thead>
        <tbody className="vote-form">
          <tr>
            <td> </td>
            <td> <span><input type="radio" name="choice" value="CHOICE1"/>Marry</span></td>
            <td> </td>
          </tr>
          <tr>
            <td></td>
            <td> <span><input type="radio" name="choice" value="CHOICE2"/>Kiss</span></td>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
            <td> <span><input type="radio" name="choice" value="CHOICE3"/>Kill</span></td>
            <td> </td>
          </tr>
          </tbody>

      </table>);
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
        {this.renderForm()}
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
