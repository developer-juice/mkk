import React, {Component} from 'react';
import "../style/surveypage.css"
import PersonCardDesktop from "../components/personCardDesktop"
import PersonCardMobile from "../components/personCardMobile"
import ThreejsMobile from "../components/PhotoCircleIframe.js";

import dummydata from "../dev/dummydata.js"

const ADRATE = 3;

const stock_urls=[
  `${process.env.PUBLIC_URL}/static/marry.jpg`,
  `${process.env.PUBLIC_URL}/static/kiss.jpeg`,
  `${process.env.PUBLIC_URL}/static/kill.jpg`
]


function ContentToggle(props){
  return (
    <div onClick={props.click} style={{padding: "20px" }} className="custom-control custom-switch lg right">
      <input type="checkbox" className="custom-control-input" id="customSwitch1" />
      <label className="custom-control-label" htmlFor="customSwitch1">18+</label>
    </div>
  )
}

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


//anticpate  adds a style and makes the choice they made grow bigger
// this is for suspence after the network call returns
function anticipate(el,url){

  var la = el.parentElement;
  var arr= [];
  la.childNodes.forEach( (val,index)=>{
    if(val.firstChild.value !== el.firstChild.value){
      arr.push(val);
    }
  })
  arr.forEach(function(val){
    la.removeChild(val);
  })

  el.style.backgroundImage = `url(${stock_urls[url]})`;
  el.style.backgroundSize = "contain";
  el.style.height= "125px";
  el.style.width = "176px";

}


class SurveyPage extends Component {

  constructor(props){
    super(props);
    this.isMobile = window.innerWidth < 480;
    this.roulette = []; // this will contain the ADRATE number of roultes they can go through at a time without ads.


    this.submitValidate = this.submitValidate.bind(this)
    this.filterGender = this.filterGender.bind(this)
    this.state = {
      submitted: false,
      isLoading: true,
      spinsLeftTillAd: ADRATE,
      eighteen: false,
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
    return(
      <div>
        {this.banner()}
        {this.filter()}
        {!this.state.isLoading && !this.state.submitted && this.playGame()}
      </div>
    )
  }

  playGame(){
    var cards= [];
    for(var i=0;i<3;i++){
      if(this.isMobile){
        cards.push(
          (<PersonCardMobile data={this.state.currspin[i]} key={"personcard"+i} index={i} />)
        );
      }
      else {
        cards.push(
          (<PersonCardDesktop data={this.state.currspin[i]} key={"personcard"+i} index={i} />)
        );
      }
    }
    var classStr = `table ${this.state.eighteen ? "table-dark" : "table-striped"}`;
      return(
        <div id="survey-page-form">
        <ThreejsMobile db={[]} />

          <table id="survey-table" className={classStr}>
            <tbody>
            </tbody>
          </table>
          <button style={{ marginTop:"20px", padding: "10px"}} type="button" className="btn btn-info right" onClick={this.submitValidate}>Submit</button>
        </div>
      )
    }

  submit(){
    this.setState({
      submitted: false,
      isLoading: false,
    })

  }

  submitValidate(){
    var m,ks,kl;
    m = document.querySelector(".marry");
    ks = document.querySelector(".kiss");
    kl = document.querySelector(".kill");
    var self = this;
    if(m  && ks && kl){
      setTimeout(function(){
        anticipate(m,0);
        anticipate(ks,1);
        anticipate(kl,2);
        self.submit();

      },1200);
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

  filter(){
    return (
      <div onClick={(event)=>{this.filterGender(event)} } className="survey-page-filter-box btn-group btn-group-toggle" data-toggle="buttons">
        <span style={{marginRight: "10px"}}> Filter Genders </span>
          <label className="btn btn-secondary active">
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
          <ContentToggle click={()=>{this.toggle18()} } />
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
