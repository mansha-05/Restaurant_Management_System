import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar"
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter"
import DishGrid from "../../components/DishGrid/DishGrid";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import "./Menu.css";
import { getMenu } from "../../services/menu";
import { getCategories } from "../../services/category";

const Menu = () => {
  const [allDishes, setAllDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const menuData = await getMenu();
      const categoryData = await getCategories();
      console.log("Categories:", categoryData); 
      // Map categoryId → categoryName
      const categoryMap = {};
      categoryData.forEach(cat => {
        categoryMap[cat.id] = cat.categoryName;
      });

      const mappedMenu = (menuData || []).map(item => ({
        id: item.id,
        name: item.item_name,
        price: item.price,
        description: item.description,
        imageUrl: item.imageUrl,
        categoryId: item.categoryId,
        categoryName: categoryMap[item.categoryId] || "Unknown"
      }));

      setAllDishes(mappedMenu);
      setCategories(categoryData);
    };

    fetchData();
  }, []);

//         allDishes.forEach(dish => {
//   // console.log("ID:", dish.id, dish.name);
// });


  const filteredAndSortedDishes = allDishes
  .filter(dish => {
    const matchSearch = dish.name.toLowerCase().includes(search.toLowerCase());

    const matchCategory = activeCategory === "" || activeCategory === null
      ? true  // show all categories
      : dish.categoryId === Number(activeCategory);

    return matchSearch && matchCategory;
  })
  .sort((a, b) => {
    if (sortOption === "priceLowHigh") return a.price - b.price;
    if (sortOption === "priceHighLow") return b.price - a.price;
    if (sortOption === "nameAZ") return a.name.localeCompare(b.name);
    if (sortOption === "nameZA") return b.name.localeCompare(a.name);
    return 0;
  });


  return (
    <div className="menu-container">
      <h2 className="menu-title text-center">Our Menu</h2>
      <p className="menu-subtitle text-center">Browse our dishes</p>

      {/* 🔹 FILTER BAR */}
      <div className="container mt-4 mb-4">
        <div className="d-flex align-items-center gap-3 flex-wrap">

          {/* Search */}
          <div className="flex-grow-1">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          {/* Category */}
          <div style={{ minWidth: "220px" }}>
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          {/* Sort */}
          <div style={{ minWidth: "200px" }}>
            <SortDropdown
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>

        </div>
      </div>

      <DishGrid dishes={filteredAndSortedDishes} />
    </div>


  );
};

export default Menu;