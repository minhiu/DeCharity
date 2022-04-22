import React, { Component } from "react";
import ExpandableItem from "./ExpandableItem";

class ExpandableForm extends Component {
  renderItems = () => {
    return this.props.items.map((item, index) => (
      <ExpandableItem question={item.question} answer={item.answer} id={index} key={index} />
    ));
  };

  render() {
    return <div className="wrapper">{this.renderItems()}</div>;
  }
}

export default ExpandableForm;
