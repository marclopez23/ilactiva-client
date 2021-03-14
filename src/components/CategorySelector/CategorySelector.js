import React, { useState } from "react";
import "./CategorySelector.scss";

const CategorySelector = ({ img, title, onClick }) => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive((state) => !state);
    onClick({ title });
  };
  return (
    <article className={`categorySelector`} onClick={handleClick}>
      <div className={`img ${active ? "selected" : " "}`}>
        <img src={img} alt="" />
      </div>
      <h3 className="titleMedium">{title}</h3>
    </article>
  );
};

export default CategorySelector;
