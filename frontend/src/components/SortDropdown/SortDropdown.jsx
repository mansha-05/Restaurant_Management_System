import React from "react";
import "./SortDropdown.css";

const SortDropdown = ({ sortOption, setSortOption }) => {
  return (
    <select
      className="form-select form-select-lg"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="">Sort By</option>
      <option value="priceLowHigh">Price: Low → High</option>
      <option value="priceHighLow">Price: High → Low</option>
      <option value="nameAZ">Name: A → Z</option>
      <option value="nameZA">Name: Z → A</option>
    </select>
  );
};

export default SortDropdown;

