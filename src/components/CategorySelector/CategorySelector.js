import React from "react";
import "./CategorySelector.scss";
const CategorySelector = ({ img, title, onClick }) => {
  return (
    <article className="categorySelector" onClick={() => onClick({ title })}>
      <div className="img">
        <img src={img} alt="" />
      </div>
      <h3 className="titleMedium">{title}</h3>
    </article>
  );
};

export default CategorySelector;
