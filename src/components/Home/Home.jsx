import React from 'react'
import Style from './Home.module.css'
import Products from '../Products/Products'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'


export default function Home() {

    return (
        <>
            <MainSlider />
            <CategorySlider />
            <Products />
            <Helmet>
                <title>Fresh Market Home</title>
            </Helmet>
        </>
    )
}
