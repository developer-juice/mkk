import React, {Component} from 'react';
import "../style/surveypage.css"
// import PersonCardDesktop from "../components/personCardDesktop"
// import PersonCardMobile from "../components/personCardMobile"
import ThreejsMobile from "../components/PhotoCircleIframe.js";

import dummydata from "../dev/dummydata.js"

const ADRATE = 3;

// const stock_urls=[
//   `${process.env.PUBLIC_URL}/static/marry.jpg`,
//   `${process.env.PUBLIC_URL}/static/kiss.jpeg`,
//   `${process.env.PUBLIC_URL}/static/kill.jpg`
// ]


function ContentToggle(props){
  return (
    <div onClick={props.click} style={{padding: "20px" }} className="custom-control custom-switch lg right">
      <input type="checkbox" className="custom-control-input" id="customSwitch1" />
      <label className="custom-control-label" htmlFor="customSwitch1">18+</label>
    </div>
  )
}


/* this iniatlies an array of three random values which are unique and %DatabaseLength
1,5,2 is an example spin.
this will be differnt when we scale to production, we will have to have leniancy on choosing values
*/
function spinWheel(){
  var list = [];
  var cards = [];
  for(var i=0;i<3;i++){
    var choice = Math.random() * (dummydata.length);
    choice = choice.toFixed(0) % dummydata.length;
    if(!list.includes(choice)){
      list.push(choice)
      cards.push(dummydata[choice]);
    }
    else{
      i--;
    }
  }
  return cards;
}

// {
//   el.style.backgroundImage = `url(${stock_urls[url]})`;
//   el.style.backgroundSize = "contain";
//   el.style.height= "125px";
//   el.style.width = "176px";

// }


class SurveyPage extends Component {

  constructor(props){
    super(props);
    this.isMobile = window.innerWidth < 480;
    this.roulette = [];

    this.submitValidate = this.submitValidate.bind(this);
    this.filterGender = this.filterGender.bind(this);
    this.setVotes = this.setVotes.bind(this);
    this.state = {
      submitted: false,
      isLoading: true,
      spinsLeftTillAd: ADRATE,
      eighteen: false,
      currspin: null,
      choices: {"marry": null,"kiss":null,"kill":null}, // probably index values 0,1,2
    }
  }
  componentDidMount(){
    var self = this;
    //when the component loads we will get our first batch without ads, maybe that will change
    setTimeout(function(){
      self.setState({
        isLoading: false,
        currspin: spinWheel(),
      });
    },1500);
  }


  render(){
    const isMobile = window.viewport < 480;
    return(
      <div>
        {this.banner()}
        <div id="entire-game">


          {!this.state.isLoading && !this.state.submitted &&
          this.playGame()}


        </div>
        </div>
    )
  }
  setVotes(el){
    this.setState({
      choices: el
    })
  }

  /*
     *****
     *   *  Photo Card circles about z axis
     *   *
     *****

     ******
     *    *
     ******
     *    *
     ******   survay table
     ******
     *    *
     ******

  */
  playGame(){
    // the same canvas will be used for mobile and desktop.
    const  cards = (
      <ThreejsMobile updateVotes={this.setVotes} id="mycanvas" db={this.state.currspin} >
      </ThreejsMobile>);
    // var classStr = `table ${this.state.eighteen ? "table-dark" : "table-striped"}`;
      return(
        <div id="survey-page-form">
        {this.filter()}
          {cards}
          <button style={{ marginTop:"20px", padding: "10px"}}
            type="button" className="btn btn-info right"
            onClick={this.submitValidate}>Submit</button>
        </div>
      )
    }

  submit(){
    this.setState({
      submitted: false,
      isLoading: true,
    })

  }


  // the dynmaic version there is state that is maintained in the component and
  //we just have to make sure they are nonNull
  submitValidate(){
    const self = this;
    const valid =
    self.state.choices.marry && self.state.choices.marry!== "Deleted" &&
     self.state.choices.kiss && self.state.choices.kiss !== "Deleted" &&
     self.state.choices.kill && self.state.choices.kill !== "Deleted";
    if(valid){
      self.setState({
        valid: true,
      })
      self.submit();
    }
    else{
      var table = document.querySelector("#survey-table");
      table.classList.add("warn-table");
      setTimeout(function(){
            var table = document.querySelector("#survey-table");
            table.classList.remove("warn-table");
      },2500)
    }


  }
  // // in this validation function it it assumed that all values are present as <nodes>
  // // thats the static version.
  // submitValidate(){
  //   var m,ks,kl;
  //   m = document.querySelector(".marry");
  //   ks = document.querySelector(".kiss");
  //   kl = document.querySelector(".kill");
  //   var self = this;
  //   if(m  && ks && kl){
  //     setTimeout(function(){
  //       anticipate(m,0);
  //       anticipate(ks,1);
  //       anticipate(kl,2);
  //       self.submit();

  //     },1200);
  //   }
  //   else{
  //     var table = document.querySelector("#survey-table");
  //     table.classList.add("warn-table");
  //     setTimeout(function(){
  //           var table = document.querySelector("#survey-table");
  //           table.classList.remove("warn-table");
  //     },2500)
  //   }

  // }

  filter(){
    return (
      <div onClick={(event)=>{this.filterGender(event)} } className="survey-page-filter-box btn-group btn-group-toggle" data-toggle="buttons">
        <ContentToggle click={()=>{this.toggle18()} } />


        <span style={{marginRight: "10px"}}> Filter Genders </span>
          <label className="radio-button btn btn-secondary active">
            <input type="radio" value="all" name="gender" id="option1" /> All
          </label>
          <label className="btn btn-secondary">
            <input type="radio" value="female" name="gender" id="option2"  /> Female
          </label>
          <label className="btn btn-secondary">
            <input type="radio" value="male" name="gender" id="option3"  /> Male
          </label>
        </div>
    )
  }
  filterGender(eve){
    var previous = document.querySelector("label.active");
    if(previous){
      previous.classList.remove("active");
    }
    eve.target.parentElement.classList.add("active");
  }


  toggle18(){
    this.setState({eighteen: !this.state.eighteen})
  }

  banner(){
    return (
      <div className="container">

        <section className="container survey-page-headsup" id="survey-page-banner">
          <h3>Quiz your Subconcious</h3>
          <br />
          <br />
          <br />
          <p> {`...You have ${this.state.spinsLeftTillAd} spins left till refresh....`}</p>
        </section>
      </div>
    )
  }
}


export default SurveyPage;
