import React from "react";
import "./CategoryFilter.css";

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <select
      className="form-select form-select-lg"
      value={activeCategory}
      onChange={(e) => setActiveCategory(e.target.value)}
    >
      <option value="">All Categories</option>

      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.categoryName}
        </option>
      ))}
    </select>

  );
};

export default CategoryFilter;


// const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
//   return (
//     <select
//       className="form-select form-select-lg"
//       value={activeCategory}
//       onChange={(e) => setActiveCategory(e.target.value)}
//     >
//       <option value="All">All Categories</option>
//       {categories.map(cat => (
//         <option key={cat.id} value={cat.categoryName}>
//           {cat.categoryName}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default CategoryFilter;
