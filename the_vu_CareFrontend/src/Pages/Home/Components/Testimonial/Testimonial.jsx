import React from 'react'
import './testimonial.scss'
import Thumbnail from './../../../../Assets/Images/thumbnail.jpg'
import PlyBtn from './../../../../Assets/Images/ply.svg'
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.theme.default.css';

export default function Testimonial() {
    const options = {
        items: 3,
        nav: false,
        rewind: false,
        dots: false,
        autoplay: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:3
            }
        }
    };

    return (
        <section className='testimonial'>
            <div className="container">
                <div className="trust">Don’t Trust Us?</div>
                <div className="main_heading">
                    <h2>Hear What They Say About Us</h2>
                </div>
                <div className="testi_wrapper">
                    <OwlCarousel options={options} >
                        <div className="testi_box">
                            <div className="video"><div className="thumbnail"><img src={Thumbnail} alt="" /></div><div className="ply_btn"><img src={PlyBtn} alt="" /></div></div>
                            <div className="content"> "He was searching for good painting works in Bangalore. We were among the 10 other service providers he sorted out from google result. Impressed by our punctuality, professionalism and ability to understand their requirements, we wereawarded this project. Let's check the video what else he said."</div>
                            <div className="name">Mr. Chakradhar GS</div>
                            <div className="service">Deep Cleaning & Interior Painting</div>
                        </div>
                        <div className="testi_box">
                            <div className="video"><div className="thumbnail"><img src={Thumbnail} alt="" /></div><div className="ply_btn"><img src={PlyBtn} alt="" /></div></div>
                            <div className="content"> "He was searching for good painting works in Bangalore. We were among the 10 other service providers he sorted out from google result. Impressed by our punctuality, professionalism and ability to understand their requirements, we wereawarded this project. Let's check the video what else he said."</div>
                            <div className="name">Mr. Chakradhar GS</div>
                            <div className="service">Deep Cleaning & Interior Painting</div>
                        </div>
                        <div className="testi_box">
                            <div className="video"><div className="thumbnail"><img src={Thumbnail} alt="" /></div><div className="ply_btn"><img src={PlyBtn} alt="" /></div></div>
                            <div className="content"> "He was searching for good painting works in Bangalore. We were among the 10 other service providers he sorted out from google result. Impressed by our punctuality, professionalism and ability to understand their requirements, we wereawarded this project. Let's check the video what else he said."</div>
                            <div className="name">Mr. Chakradhar GS</div>
                            <div className="service">Deep Cleaning & Interior Painting</div>
                        </div>
                        <div className="testi_box">
                            <div className="video"><div className="thumbnail"><img src={Thumbnail} alt="" /></div><div className="ply_btn"><img src={PlyBtn} alt="" /></div></div>
                            <div className="content"> "He was searching for good painting works in Bangalore. We were among the 10 other service providers he sorted out from google result. Impressed by our punctuality, professionalism and ability to understand their requirements, we wereawarded this project. Let's check the video what else he said."</div>
                            <div className="name">Mr. Chakradhar GS</div>
                            <div className="service">Deep Cleaning & Interior Painting</div>
                        </div>
                    </OwlCarousel>
                </div>
            </div>

        </section>
    )
}
