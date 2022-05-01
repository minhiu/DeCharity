import React from "react";
import { Link } from "../routes";

const Card = (props) => {
  return (
    <div id="project-card">
      <div className="card">
        <div className="card__body">
          <img src={props.img} className="card__image" />
          <h4 className="card__title">{props.address}</h4>
          <p className="card__description">
            {props.valueDonated
              ? "Value Donated: " + props.valueDonated + " ETH"
              : "Description: " + props.description}
          </p>
        </div>
        <Link route={`/campaigns/${props.address}`}>
          <button className="card__btn">View Campaign</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
