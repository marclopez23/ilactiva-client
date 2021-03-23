import React from 'react';
import empty from "../../assets/empty.svg";
import "./Empty.scss"

const Empty = ({txt}) => {
    return (
      <div className="noEvents">
        <img src={empty} alt="no hay enventos" />
        <p className="subheader">
          {txt}
        </p>
      </div>
    );
}
 
export default Empty;