import React, { useEffect, useState } from "react";
import { getAllMenuManager, saveMenuItem, updateMenuItem } from "../../../services/menu";
import { getCategories } from "../../../services/category";
import DishGrid from "../../../components/DishGrid/DishGrid";
import DishManagementCard from "../../../components/DishManagementCard/DishManagementCard";
import AddMenuModal from "../../../components/AddMenuModal/AddMenuModal";
import "./MenuManagement.css";
import { toast } from "react-toastify";


const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editDish, setEditDish] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Fetch menu and categories
    const fetchMenu = async () => {
    try {
        const menuData = await getAllMenuManager();
        const categoryData = await getCategories();

        const categoryMap = {};
        categoryData.forEach((cat) => {
        categoryMap[cat.id] = cat.categoryName;
        });

        const mappedMenu = (menuData || []).map((item) => ({
        ...item,
        categoryName: categoryMap[item.categoryId] || "Unknown",
        }));

        setMenuItems(mappedMenu);
        setCategories(categoryData);
    } catch (err) {
        toast.error("Failed to load menu");
        console.error(err);
    }
    };


  useEffect(() => {
    fetchMenu();
  }, []);

  const openAddForm = () => {
    setEditDish(null);
    setShowAddForm(true);
  };

  const openEditForm = (dish) => {
    setEditDish(dish);
    setShowAddForm(true);
  };

  // Filtered & searched menu
  const filteredMenu = menuItems.filter((dish) => {
    const matchesSearch =
      dish.item_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory
      ? dish.categoryId === Number(filterCategory)
      : true;
    const matchesStatus = filterStatus
      ? dish.status === filterStatus
      : true;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="menu-management-container">
      <div className="menu-management-header">
        <h2>Menu Management</h2>
        <button className="btn1" onClick={openAddForm}>
          + Add Menu Item
        </button>
      </div>

      {/* Filters & Search */}
      <div className="menu-filters">
        <input
          type="text"
          placeholder="Search by dish name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="ENABLED">Enabled</option>
          <option value="DISABLED">Disabled</option>
        </select>
      </div>

      {/* Add/Edit Modal */}
      {showAddForm && (
        <AddMenuModal
          categories={categories}
          editData={editDish}
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSave={async (data) => {
            try {
                if (editDish) {
                await updateMenuItem({ ...data, id: editDish.id });
                toast.success("Dish updated successfully");
                } else {
                await saveMenuItem(data);
                toast.success("Dish added successfully");
                }
                fetchMenu();
            } catch (err) {
                toast.error("Failed to save dish");
                console.error(err);
            }
           }}

        />
      )}

      {/* Menu Grid */}
      <DishGrid
        dishes={filteredMenu}
        ManagementCard={(dish) => (
          <DishManagementCard
            dish={dish}
            fetchMenu={fetchMenu}
            openEditForm={openEditForm}
          />
        )}
      />
    </div>
  );
};

export default MenuManagement;
