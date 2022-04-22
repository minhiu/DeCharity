import classNames from "classnames";
import React, { Component } from "react";

class ExpandableItem extends Component {
  state = {
    active: false,
    answerMaxHeight: 0,
  };

  onQuestionClick = () => {
    this.setState({ active: !this.state.active })
    this.setState({ answerMaxHeight: !this.state.active ? 600 : 0 });
  };
  render() {
    // question.forEach((question) => {
    //   question.addEventListener("click", (event) => {
    //     const active = document.querySelector(".question.active");
    //     if (active && active !== question) {
    //       active.classList.toggle("active");
    //       active.nextElementSibling.style.maxHeight = 0;
    //     }
    //     question.classList.toggle("active");
    //     const answer = question.nextElementSibling;
    //     if (question.classList.contains("active")) {
    //       answer.style.maxHeight = answer.scrollHeight + "px";
    //     } else {
    //       answer.style.maxHeight = 0;
    //     }
    //   });
    // });

    return (
      <div className="container">
        <div
          className={
            classNames("question", this.state.active  ? "active" : null)
          }
          onClick={this.onQuestionClick}
        >
          {this.props.question}
        </div>
        <div className="answercont" style={{ maxHeight: this.state.answerMaxHeight }}>
          <div className="answer">{this.props.answer}</div>
        </div>
      </div>
    );
  }
}

export default ExpandableItem;
