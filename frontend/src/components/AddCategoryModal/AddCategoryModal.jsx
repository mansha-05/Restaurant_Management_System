import "./AddCategoryModal.css";
import { useState, useEffect } from "react";

export default function AddCategoryModal({ isOpen, onClose, onSave, editData }) {
  // Match backend DTO fields
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  // Populate fields if editing
  useEffect(() => {
    if (editData) {
      setCategoryName(editData.categoryName || "");
      setDescription(editData.description || "");
    } else {
      setCategoryName("");
      setDescription("");
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    // Send object exactly matching backend DTO
    onSave({
      categoryName: categoryName.trim(),
      description: description.trim()
    });
    onClose();
  };

  return (
    <div className="amm-overlay">
      <div className="amm-modal">
        {/* Header */}
        <div className="amm-header">
          <h2>{editData ? "Edit Category" : "Add Category"}</h2>
          <button className="amm-close" onClick={onClose}>×</button>
        </div>

        {/* Subtitle */}
        <p className="amm-subtitle">
          {editData ? "Update category details" : "Create a new category"}
        </p>

        {/* Form */}
        <form className="amm-form" onSubmit={handleSubmit}>
          <label>Category Name</label>
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            required
          />

          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />

          <button type="submit" className="amm-submit">
            {editData ? "Update Category" : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
}
