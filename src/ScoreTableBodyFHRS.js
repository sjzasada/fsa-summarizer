import React, {Component} from "react";

import ScoreTableRow from "./ScoreTableRow.js";

class ScoreTableBodyFHRS extends Component {
  render() {
    var five = 0;
    var four = 0;
    var three = 0;
    var two = 0;
    var one = 0;
    var exempt = 0;

    var total = 0;

    var establishments = this.props.establishments;

    for (var i in establishments) {
      total++;
      switch (establishments[i].RatingValue) {
        case "5":
          five++;
          break;
        case "4":
          four++;
          break;
        case "3":
          three++;
          break;
        case "2":
          two++;
          break;
        case "1":
          one++;
          break;
        default:
          exempt++;
      }
    }

    console.log(total);

    return (
      <tbody>
        <ScoreTableRow title="5-star" val={five / total * 100} />
        <ScoreTableRow title="4-star" val={four / total * 100} />
        <ScoreTableRow title="3-star" val={three / total * 100} />
        <ScoreTableRow title="2-star" val={two / total * 100} />
        <ScoreTableRow title="1-star" val={one / total * 100} />
        <ScoreTableRow title="Exempt" val={exempt / total * 100} />
      </tbody>
    );
  }
}

export default ScoreTableBodyFHRS;
