import "./BrowseByCategory.css";
import pizzaImg from '../../assets/images/category/pizzaLogo.webp'
import pastaImg from '../../assets/images/category/pastaLogo.jpg'
import burgerImg from '../../assets/images/category/BurgerLogo.png'
import saladImg from '../../assets/images/category/saladLogo.png'
import sushiImg from '../../assets/images/category/sushiLogo.jpg'
import dessertImg from '../../assets/images/category/dessertLogo.webp'
import beverageImg from '../../assets/images/category/beveragesLogo.jpg'
import parathaImg from '../../assets/images/category/parathaLogo.jpg'


function BrowseByCategory() {
  const categories = [
    { name: "Pizza", items: 8, img: pizzaImg },
    { name: "Pasta", items: 12, img: pastaImg },
    { name: "Burgers", items: 6, img: burgerImg },
    { name: "Sushi", items: 15, img:sushiImg },
    { name: "Parathas", items: 7, img: parathaImg },
    { name: "Salads", items: 9, img: saladImg },
    { name: "Desserts", items: 10, img:dessertImg },
    { name: "Beverages", items: 20, img:beverageImg },
   
  ];

  return (
    <div className="browse-container">
      <h2>Browse by Category</h2>
      <p className="subtitle">
        Explore our diverse menu organized by your favorite cuisines
      </p>

      <div className="category-grid">
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <img src={cat.img} alt={cat.name} className="category-icon" />
            <h3>{cat.name}</h3>
            <p>{cat.items} items</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseByCategory;
