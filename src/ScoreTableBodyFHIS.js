import React, {Component} from "react";

import ScoreTableRow from "./ScoreTableRow.js";

class ScoreTableBodyFHIS extends Component {
  render() {
    var pass = 0;
    var awaitinginspection = 0;
    var awaitingpublication = 0;
    var fail = 0;
    var exempt = 0;

    var total = 0;

    var establishments = this.props.establishments;

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

    console.log(total);

    return (
      <tbody>
        <ScoreTableRow title="Pass" val={pass / total * 100} />{" "}
        <ScoreTableRow
          title="Awaiting Inspection"
          val={awaitinginspection / total * 100}
        />{" "}
        <ScoreTableRow
          title="Awaiting Publication"
          val={awaitingpublication / total * 100}
        />{" "}
        <ScoreTableRow title="Improvement Required" val={fail / total * 100} />{" "}
        <ScoreTableRow title="Exempt" val={exempt / total * 100} />
      </tbody>
    );
  }
}

export default ScoreTableBodyFHIS;
