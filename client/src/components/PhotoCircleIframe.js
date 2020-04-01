import React, {Component} from "react";

import Scene from "./Scene";
import "../style/form.css"


//
// function getGameText(index){
//   switch(index){
//     case 0:
//       return "Marry";
//     case 1:
//       return "Kiss";
//     default:
//       return "Kill";
//   }
// }


function fieldReset(){
  var ele = document.querySelectorAll("input[name=choice]");
    for(var i=0;i<ele.length;i++)
      ele[i].checked = false;
}


function RadioButton(text,listener){
   return (
    <label className="btn">
    <input type="radio"
      onChange={listener}
      value={text.toLowerCase()} name="choice" />
    <i className="fa fa-circle-o fa-2x"></i>
    <i className="fa fa-dot-circle-o fa-2x"></i>
    <span>{text}</span>
  </label>
  )
}

function MySmartLineup(props){
  const {curr, currVotes} = props;
  return (
    <div id="label" className="smart-lineup">
      <div >
        <p> Selected:</p>
        <p className="HUD-current">{curr.name}</p>
        <p className="HUD-current">~{curr.gender}</p>
      </div>
      <div><div>Marry:</div><div className="HUD-current"> {currVotes["marry"].name}</div></div>
      <div><div>Kiss:</div><div className="HUD-current"> {currVotes["kiss"].name}</div></div>
      <div><div>Kill:</div><div className="HUD-current"> {currVotes["kill"].name}</div></div>
      </div>
  )
}


function MySmartTable(props){
  const { leftBumper, rightBumper, voteForPerson} = props;
  // var celeb = this.props.db[index];
  return (
  <table className="vote-form">
    <thead className="vote-form">
   <tr>
    <th><button onClick={leftBumper} className="left" type="button">Bump Left CW!</button></th>
    <th> . </th>
    <th><button onClick={rightBumper} className="right" type="button"> Bump Right CCW!</button></th>
  </tr>

    </thead>
    <tbody id="survey-table" className="vote-form">
      <tr>
        <td> </td>
        <td>  {RadioButton("Marry",voteForPerson)} </td>
        <td> </td>
      </tr>
      <tr>
        <td></td>
        <td>{RadioButton("Kiss",voteForPerson)}</td>
        <td></td>
      </tr>
      <tr>
        <td> </td>
        <td>{RadioButton("Kill",voteForPerson)}</td>

        <td> </td>
      </tr>
      </tbody>

  </table>);
}



class PhotoCircleIframe extends Component {

    constructor(props){
      super(props);
      this.rightBumper = this.rightBumper.bind(this);
      this.leftBumper = this.leftBumper.bind(this);
      this.voteForPerson = this.voteForPerson.bind(this);
      this.scene = new Scene();

      this.height = window.innerWidth < 480 ? 500 : 300;
      this.width = window.innerWidth < 480 ? window.innerWidth : 400;
      this.imgURLS=[0,0,0]

      this.state = {
          THREEdom: (<></>),
          currImageFocused: 0,
          votes: {"marry": "null","kiss":"null","kill":"null"},
      }


    }
    // the current array of votes will be contained in the photocircleiframe? no i will
    // have to lift the state up
    // this bound function will neeed to
    // this function explicitely states if a user couldnt make up their mind
    // and voted the same person multiple ways.
    voteForPerson(event){
      const radiobuttonvalue = event.target.value; // setState is a pooling function. calling a synthetic
      // event later means it it is no longer assible.
      const self = this;
      self.setState(function(prev){
        const keys = Object.keys(prev.votes);
        var votesUpdated =  {};
        keys.forEach(function(key,index){
          if(prev.votes[key].name === self.props.db[self.state.currImageFocused].name){
            votesUpdated[key] = {
              name: "Deleted"
            };
          }
          else{
            votesUpdated[key] = prev.votes[key];
          }
        })

        votesUpdated[radiobuttonvalue] = this.props.db[this.state.currImageFocused];
        this.props.updateVotes(votesUpdated)
        return {
          votes: votesUpdated
        }
      });
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
      // const isMobile  = window.viewport < 500;
        return (
        <div id="moneyshot-voting-table-container">
          <div id="moneyshot-and-lineup-container">
            <div id="js-render-box"
              style={{ width: `${this.width}px`, height: `${this.height}px` }}
              ref={(mount) => { this.mount = mount }}
            ></div>
            <MySmartLineup currVotes={this.state.votes}
             curr={this.props.db[this.state.currImageFocused]} />
          </div>


            <div>
              <MySmartTable
                leftBumper={this.leftBumper} rightBumper={this.rightBumper}
                voteForPerson={this.voteForPerson}
               />
            </div>

        </div>
      )
    }
    rightBumper(){
      fieldReset();
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
          currImageFocused: newCurr,
      });
    }
    leftBumper(){
      fieldReset();
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
