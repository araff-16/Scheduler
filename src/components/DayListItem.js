import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  
  const formatSports = function(spots){
    if (spots === 0){
      return (<h3 className="text--light">no spots remaining</h3>)
    } else if (spots === 1) {
      return (<h3 className="text--light">1 spot remaining</h3>)
    } else {
      return (<h3 className="text--light">{spots} spots remaining</h3>)
    }
  }

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  } )


  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      {formatSports(props.spots)}
    </li>
  );
}