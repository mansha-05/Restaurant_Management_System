import React from 'react'
import img1 from '../../assets/images/heroSection/img1.jpeg';
import "./HeroSection.css"
import { useNavigate } from 'react-router-dom';
function HeroSection() {
  const navigate=useNavigate()
  return (
    // <div>
    //   n<h1>Experience Culinary Excellence</h1>
    // </div>
    <div className='hero'>
        <div className='hero-text'>
            <span className='tag'>Welcome to Food Nova Restaurant</span>
            <h1>Experience Culinary Excellence</h1>
            <p>Indulge in a delightful dining experience with our carefully crafted menu, featuring fresh ingredients and authentic flavors from around the world </p>
              <div className='buttons'>
           <button type="button" className="btn btn-primary" onClick={()=>navigate("menu")}>View Menu</button>
           <button type="button" className="btn btn-primary" onClick={()=>navigate("reserve")}>Reserve Tables</button>
        </div>
        </div>
        <div className='hero-img'>
            <img src={img1} alt="sample" width="300"/>
        </div>
      
        
    </div>
  )
}
export default HeroSection