import React from 'react';
import { BrowserRouter as Router, Link, Route, Redirect} from "react-router-dom";



import SurveyPage from "./pages/surveyPage";
import Header from "./components/Header";

import "./style/radio.css";
import "./style/home.css";
import "bootstrap/dist/css/bootstrap.min.css";

function RedirectPage(){
  return (
    <div className="jumbotron">
      <Link className="btn btn-success" to="/mkk/play" />
      <Redirect to="/mkk/play" />
    </div>

  )
}

function App() {
  return (
    <Router>
      <Route path="/"  >
        <Header user={{companyName: "Unlicensed"}} />
      </Route>

      <Route exact path="/" component={RedirectPage} />
      <Route exact path="/mkk" component={RedirectPage} />
      <Route exact path="/mkk/play" component={SurveyPage} />
    </Router>

      );
}

//
// function PageExactSelect(props){
//
//   return (
//     <Switch>
//       <Route  path="/play">
//         <SurveyPage />
//       </Route>
//       <Route path="/statistics">
            // <StatsPage />
          // </Route>
//     </Switch>
//   )
// }
export default App;
