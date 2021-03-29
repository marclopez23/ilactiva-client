import React, { useState, useEffect } from "react";
import "./CategorySelector.scss";

const CategorySelector = ({ text, img, title, onClick, isActive, load }) => {
  const [active, setActive] = useState(isActive);
  const handleClick = () => {
    setActive((state) => !state);
    onClick({ title });
  };
  useEffect(() => setActive(isActive), [isActive]);
  return (
    <article className={`categorySelector`} onClick={handleClick}>
      <div className={`img ${active ? "selected" : " "}`}>
        <img src={img} alt="" onLoad={() => load()} />
      </div>
      <h3 className="titleMedium">{text}</h3>
    </article>
  );
};

export default CategorySelector;
