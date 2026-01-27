import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
// import HeroSection from '../../components/HeroSection/HeroSection'
// import FeatureSection from '../../components/FeatureSection/FeatureSection'
// import PopularDishes from '../../components/PopularDishes/PopularDishes'
// import BrowseByCategory from '../../components/BrowseByCategory/BrowseByCategory'

function Home() {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Home