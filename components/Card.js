import React from "react";
const Card = (props) => {
  return (
    <div id="project-card">
      <div className="card">
        <div className="card__body">
          <img src={props.img} className="card__image" />
          <h4 className="card__title">{props.title}</h4>
          <p className="card__description">
            {props.valueDonated
              ? "Value Donated: " + props.valueDonated + " ETH"
              : "Description: " + props.description}
          </p>
        </div>
        <button className="card__btn">View Charity</button>
      </div>
    </div>
  );
};

export default Card;
