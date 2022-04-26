import classNames from "classnames";
import React, { Component } from "react";

class ExpandableItem extends Component {
  state = {
    active: false,
    answerMaxHeight: 0,
  };

  onQuestionClick = () => {
    this.setState({
      active: !this.state.active,
      answerMaxHeight: !this.state.active ? 600 : 0,
    });
  };
  render() {
    return (
      <div className="container">
        <div
          className={classNames(
            "question",
            this.state.active ? "active" : null
          )}
          onClick={this.onQuestionClick}
        >
          {this.props.question}
        </div>
        <div
          className="answercont"
          style={{ maxHeight: this.state.answerMaxHeight }}
        >
          <div className="answer" style={{ textAlign: this.props.alignLeft ? "left" : null }}>
            {this.props.answer}
          </div>
        </div>
      </div>
    );
  }
}

export default ExpandableItem;
