import React, {Component} from "react";

//Component to render the table rows. Show score to 2dp
class ScoreTableRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.val.toFixed(2)}&#37;</td>
      </tr>
    );
  }
}

export default ScoreTableRow;
