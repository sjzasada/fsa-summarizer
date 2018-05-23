import React, {Component} from "react";

import ScoreTableRow from "./ScoreTableRow.js";

//Component to process and display non-Scottish scheme data
class ScoreTableBodyFHRS extends Component {
  constructor(props) {
    super(props);
    this.calculateScores = this.calculateScores.bind(this);
  }

  //process json to calcualte scores
  calculateScores(establishments) {
    //possible scores
    var five = 0;
    var four = 0;
    var three = 0;
    var two = 0;
    var one = 0;
    var exempt = 0;

    var total = 0;

    //iterate over array of establishments
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
    console.log("Total establishments in authority: " + total);

    let score = {};

    score.five = five / total * 100;
    score.four = four / total * 100;
    score.three = three / total * 100;
    score.two = two / total * 100;
    score.one = one / total * 100;
    score.exempt = exempt / total * 100;

    return score; //return map of results
  }

  render() {
    let scores = this.calculateScores(this.props.establishments);

    //render non-Scottish format table, calculating percentages
    return (
      <tbody>
        <ScoreTableRow title="5-star" val={scores.five} />
        <ScoreTableRow title="4-star" val={scores.four} />
        <ScoreTableRow title="3-star" val={scores.three} />
        <ScoreTableRow title="2-star" val={scores.two} />
        <ScoreTableRow title="1-star" val={scores.one} />
        <ScoreTableRow title="Exempt" val={scores.exempt} />
      </tbody>
    );
  }
}

export default ScoreTableBodyFHRS;
