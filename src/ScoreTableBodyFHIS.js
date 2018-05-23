import React, {Component} from "react";

import ScoreTableRow from "./ScoreTableRow.js";

//Component to process and display Scottish scheme data
class ScoreTableBodyFHIS extends Component {
  constructor(props) {
    super(props);
    this.calculateScores = this.calculateScores.bind(this);
  }

  //process json to calcualte scores
  calculateScores(establishments) {
    //possible scores
    var pass = 0;
    var awaitinginspection = 0;
    var awaitingpublication = 0;
    var fail = 0;
    var exempt = 0;

    var total = 0;

    //  var establishments = this.props.establishments;

    //iterate over array of establishments
    for (var i in establishments) {
      total++;
      switch (establishments[i].RatingValue) {
        case "Pass":
        case "Pass and Eat Safe":
          pass++;
          break;
        case "Awaiting Inspection":
          awaitinginspection++;
          break;
        case "Awaiting Publication":
          awaitingpublication++;
          break;
        case "Improvement Required":
          fail++;
          break;
        default:
          exempt++;
      }
    }

    console.log("Total establishments in authority: " + total);

    var scores = {};

    scores.pass = pass / total * 100;
    scores.awaitinginspection = awaitinginspection / total * 100;
    scores.awaitingpublication = awaitingpublication / total * 100;
    scores.fail = fail / total * 100;
    scores.exempt = exempt / total * 100;

    return scores;
  }

  render() {
    let scores = this.calculateScores(this.props.establishments);

    //render Scottish format table, calculating percentages
    return (
      <tbody>
        <ScoreTableRow title="Pass" val={scores.pass} />
        <ScoreTableRow
          title="Awaiting Inspection"
          val={scores.awaitinginspection}
        />
        <ScoreTableRow
          title="Awaiting Publication"
          val={scores.awaitingpublication}
        />
        <ScoreTableRow title="Improvement Required" val={scores.fail} />
        <ScoreTableRow title="Exempt" val={scores.exempt} />
      </tbody>
    );
  }
}

export default ScoreTableBodyFHIS;
