import React, { useRef } from 'react'
import './statistics.scss'
import ClientsLogo from './../../../../Assets/Images/clients.png'
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';

export default function Statistics() {
    const options = {
        items: 3,
        nav: true,
        rewind: false,
        dots: false,
        autoplay: true,
        responsive:{
            0:{
                items:3
            },
            600:{
                items:3
            },
            1000:{
                items:3
            }
        }
    };
    let refs = useRef();

    const Statistic = () => {
        return (
            <div className='statistics'>
                <div className="title">Some Facts about Vijay Home Service</div>
                <div className="row">
                    <div className="col-md-6 col-6">
                        <div className="statistics_box">
                            <div className="numbers"><span>40</span>M+</div>
                            <div className="names">Completed Jobs</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-6">
                        <div className="statistics_box">
                            <div className="numbers"><span>31</span>M+</div>
                            <div className="names">Satisfied Customers</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-6">
                        <div className="statistics_box">
                            <div className="numbers"><span>4</span>K+</div>
                            <div className="names"> Monthly Job Request</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-6">
                        <div className="statistics_box">
                            <div className="numbers"><span>95</span>%</div>
                            <div className="names">Repeat Customers</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const Clients = () => {
        return (
            <div className='clients'>
                <div className="title">Our Clients</div>
                <OwlCarousel options={options} >
                    <div className="client_container">
                        <div className="clients_box">
                            <img src={ClientsLogo} alt="" />
                        </div>
                        <div className="clients_box">
                            <img src={ClientsLogo} alt="" />
                        </div>
                    </div>
                    <div className="client_container">
                        <div className="clients_box">
                            <img src={ClientsLogo} alt="" />
                        </div>
                        <div className="clients_box">
                            <img src={ClientsLogo} alt="" />
                        </div>
                    </div>
                    <div className="client_container">
                        <div className="clients_box">
                            <img src={ClientsLogo} alt="" />
                        </div>
                        <div className="clients_box">
                            <img src={ClientsLogo} alt="" />
                        </div>
                    </div>
                </OwlCarousel>
            </div>
        )
    }


    return (
        <div className="statistics_container">
            <div className='container'>
                <div className="statistics_wrapper">
                    <div className="row">
                        <div className="col-lg-6 col-md-12"><Statistic /></div>
                        <div className="col-lg-6 col-md-12"><Clients /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
