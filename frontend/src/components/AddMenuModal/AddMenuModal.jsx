import "./AddMenuModal.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddMenuModal({
  isOpen,
  onClose,
  onSave,
  editData,
  categories,
}) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (editData) {
      setItemName(editData.item_name || "");
      setDescription(editData.description || "");
      setPrice(editData.price || "");
      setCategoryId(editData.categoryId || "");
      setPreview(editData.imageUrl || "");
      setImageFile(null);
    } else {
      setItemName("");
      setDescription("");
      setPrice("");
      setCategoryId("");
      setImageFile(null);
      setPreview("");
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.warning("Please upload a valid image");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemName.trim() || !price || !categoryId) {
      toast.warning("Please fill all required fields");
      return;
    }

    if (!editData && !imageFile) {
      toast.warning("Image is required");
      return;
    }

    onSave({
      item_name: itemName.trim(),
      description: description.trim(),
      price: Number(price),
      categoryId: Number(categoryId),
      imageFile,
    });

    onClose();
  };

  return (
    <div className="amm-overlay">
      <div className="amm-modal">
        <div className="amm-header">
          <h2>{editData ? "Edit Menu Item" : "Add Menu Item"}</h2>
          <button className="amm-close" onClick={onClose}>×</button>
        </div>

        <p className="amm-subtitle">
          {editData ? "Update dish details" : "Create a new dish"}
        </p>

        <form className="amm-form" onSubmit={handleSubmit}>
          <label>Dish Name</label>
          <input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter dish name"
            required
          />

          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />

          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />

          <label>Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <div className="amm-preview-box">
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="amm-image-preview"
              />
            )}
          </div>

          <button type="submit" className="amm-submit">
            {editData ? "Update Dish" : "Add Dish"}
          </button>
        </form>
      </div>
    </div>
  );
}
