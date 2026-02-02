import React, { useEffect, useState } from "react";
import "./CategoryManagement.css";
import { getAllCategoriesAdmin, toggleCategoryStatus, addCategory, updateCategory } from "../../../services/category";
import AddCategoryModal from "../../../components/AddCategoryModal/AddCategoryModal";
import { toast } from "react-toastify";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const load = async () => {
    try {
      const categoriesData = await getAllCategoriesAdmin();
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error("Failed to load categories", err);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (payload) => {
    try {
      if (!selectedCategory) {
        // Check duplicate category name
        const exists = categories.some(
          (cat) => cat.categoryName.toLowerCase() === payload.categoryName.toLowerCase()
        );
        if (exists) {
          toast.error("Category already exists!");
          return;
        }
      }

      if (selectedCategory) {
        await updateCategory(selectedCategory.id, payload);
        toast.success("Category updated successfully!");
      } else {
        await addCategory(payload);
        toast.success("Category added successfully!");
      }

      setOpen(false);
      load();
    } catch (err) {
      if (err.response?.data) {
        toast.error(err.response.data);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleCategoryStatus(id);
      toast.success("Category status updated!");
      load();
    } catch (error) {
      console.log(error)
      toast.error("Failed to update status");
    }
  };

  const onEdit = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  return (
    <div className="category-page">
      <div className="category-header">
        <div>
          <h1>Category Management</h1>
          <p>Manage menu categories and classifications</p>
        </div>
        <button
          className="add-category-btn"
          onClick={() => {
            setSelectedCategory(null);
            setOpen(true);
          }}
        >
          + Add Category
        </button>
      </div>

      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.id} className={`category-card ${cat.status === "DISABLED" ? "disabled" : ""}`}>
            <h3>{cat.categoryName}</h3>
            <p>{cat.description}</p>

            <div className="actions">
              <button className="edit-btn" onClick={() => onEdit(cat)}>Edit</button>
              <button
                className={cat.status === "ENABLED" ? "disable-btn" : "enable-btn"}
                onClick={() => handleToggle(cat.id)}
              >
                {cat.status === "ENABLED" ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddCategoryModal
        isOpen={open}
        editData={selectedCategory}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

export default CategoryManagement;
