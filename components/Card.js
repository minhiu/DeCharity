import React from "react";
import { Link } from "../routes";
import ProgressBar from "./ProgressBar";

const Card = (props) => {
  return (
    <div id="project-card">
      <div className="card">
        <div className="card__body">
          <div className="position-relative">
            {props.isRejected ? (
              <div className="card__rejected">Rejected</div>
            ) : null}
            <img src={props.img} className="card__image" />
          </div>
          <h4 className="card__title">{props.title}</h4>
          {props.category ? (
            <p className="card__description">
              {"Category: " +
                props.category[0].toUpperCase() +
                props.category.substr(1)}
            </p>
          ) : null}
          {props.valueDonated ? (
            <p className="card__description">
              {"Value Donated: " + props.valueDonated + " ETH"}
            </p>
          ) : null}
          {props.deadline ? (
            <p className="card__description">
              {"Deadline: " +
                new Date(props.deadline * 1000).toLocaleDateString()}
            </p>
          ) : null}
          <div className="progress-bar-wrapper padding-inline-1rem">
            <ProgressBar startingFund={props.startingFund} goal={props.goal} />
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
