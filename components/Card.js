import React from "react";
import { Link } from "../routes";
import ProgressBar from "./ProgressBar";

const Card = (props) => {
  return (
    <div id="project-card">
      <div className="card">
        <div className="card__body">
          <img src={props.img} className="card__image" />
          <h4 className="card__title">{props.title}</h4>
          <p className="card__description">
            {props.category ? "Category: " + props.category[0].toUpperCase() + props.category.substr(1) : null}
          </p>
          <p className="card__description">
            {props.valueDonated
              ? "Value Donated: " + props.valueDonated + " ETH"
              : "Deadline: " + new Date(props.deadline * 1000).toLocaleDateString()}
          </p>
          <div className="progress-bar-wrapper padding-inline-1rem">
            <ProgressBar balance={props.balance} goal={props.goal} />
          </div>
        </div>
        <Link route={`/campaigns/${props.address}`}>
          <button className="card__btn">View Campaign</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
