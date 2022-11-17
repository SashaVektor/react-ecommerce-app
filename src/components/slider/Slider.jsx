import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { sliderData } from './slider-data'
import "./Slider.scss";

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;

    const authScroll = true
    let slideInterval;
    let intervalTime = 4000;


    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1
            ? 0 : currentSlide + 1)
    }

    const previusSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1)
    }

    useEffect(() => {
        setCurrentSlide(0);
    },[])

    /* const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime)
    } */

    useEffect(() => {
        if(authScroll) {
            const auto = () => {
                slideInterval = setInterval(nextSlide, intervalTime)
            }
            auto();
        }
        return () => clearInterval(slideInterval);
    },[authScroll, currentSlide, slideInterval])
    return (
        <div className='slider'>
            <AiOutlineArrowLeft className='arrow prev' onClick={previusSlide} />
            <AiOutlineArrowRight className='arrow next' onClick={nextSlide} />
            {sliderData.map((slide, index) => {
                return (
                    <div key={index}
                        className={index === currentSlide ? "slide current" : 'slide'}>
                        {index === currentSlide && (
                            <>
                                <img src={slide.image} alt="slide img" className='' />
                                <div className="content">
                                    <h2>{slide.heading}</h2>
                                    <p>{slide.desc}</p>
                                    <hr />
                                    <a href="#product" className='--btn --btn-primary'>
                                        Shop Now
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Slider
