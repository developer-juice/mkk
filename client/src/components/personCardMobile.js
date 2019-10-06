import React from 'react';


function uncheckRelativeSpace(el,currval){
  var list = el.parentElement.childNodes;
  for(var i=0;i<3;i++){
    if(list[i].firstChild && list[i].firstChild.value !== currval){
      list[i].classList.remove("active");
    }
  }
}

function getTarget(clickT){
  var current = clickT.target;
  switch(current.nodeName){
    case "LABEL":
      break;
    case "SPAN":
    case "I":
    case "INPUT":
     current = current.parentElement;
     break;
    case "DIV":
      current = current.firstChild;
      break;
    default:
      current = 0;
      break;
  }
  return current;
}

function setChoice(eve){
  var currentLabelTarget = getTarget(eve);
  if(!currentLabelTarget) {
    return 0;
  }
  else{
  }
  // console.log(eve.target);
  var current = currentLabelTarget.firstChild;
  var previous = document.querySelector(`.${current.value}`);
  // previous.parentElement
  if(previous && current.value){
    //early exit, tyring to create bigger touch zone but not too big
    uncheckRelativeSpace(currentLabelTarget,current.value);
    previous.classList.remove("active");
    previous.classList.remove(current.value);
  }
  currentLabelTarget.classList.add("active");
  currentLabelTarget.classList.add(current.value);

}



function PersonCard(props){

  console.log(props.data);
  return(
    <tr className="human-card">
      <th className="mobile-crunch">
        <div className="card" >
          <img src={props.data.profilepic} className="card-img-top" alt={props.data.name} />
          <div className="card-body">
            <p style={{ textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white" }} className="card-text text-center">
              {props.data.name}</p>
          </div>
        </div>
        <div className="text-center align-center" onClick={(event)=>{setChoice(event)} } >
        <div className="btn-group btn-group-vertical" data-toggle="buttons">
          <label className="btn">
            <input type="radio" value="marry" name={"personvote"+props.index} />
            <i className="fa fa-circle-o fa-2x"></i>
            <i className="fa fa-dot-circle-o fa-2x"></i>
            <span>Marry</span>
          </label>
          <label className="btn">
            <input type="radio" value="kiss" name={"personvote"+props.index} /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i><span> Kiss</span>
          </label>
          <label className="btn">
            <input type="radio" value="kill" name={"personvote"+props.index} /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i><span> Kill</span>
          </label>
        </div>
          </div>
        </th>
    </tr>
  )

}


export default PersonCard;
