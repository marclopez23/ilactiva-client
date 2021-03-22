import React from 'react';
import "./Tag.scss"

const Tag = ({txt}) => {
    return (
      <li className="tag caption">
        {txt}
      </li>
    );
}
 
export default Tag;