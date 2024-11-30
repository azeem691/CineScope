import React from "react";

const FilterGroup = ({ minRate, handleFilter, ratings }) => {
  return (
    <ul className="align_center movie_filter">
      {ratings.map((x) => {
        return (
          <li
            key={x}
            className={`movie_filter_item ${minRate === x ? "active" : ""}`}
            onClick={() => handleFilter(x)}
          >
            {x}+ Star
          </li>
        );
      })}
    </ul>
  );
};

export default FilterGroup;
