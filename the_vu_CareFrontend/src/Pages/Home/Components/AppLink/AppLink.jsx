import React from 'react'
import './applink.scss'
import AppStore from './../../../../Assets/Images/appstore.svg';
import GooglePlay from './../../../../Assets/Images/playstore.svg';

export default function AppLink() {
  return (
    <section className='applink'>
        <div className="container">
            <div className="applink_wrapper">
                <div className="row">
                    <div className="col-xl-6 col-lg-5 col-md-6">
                        <div className="text">App is available for free on Google Play & App Store</div>
                    </div>
                    <div className="col-xl-6 col-lg-7 col-md-6">
                        <div className="buttons">
                            <a href="#"><img src={GooglePlay} alt="" /></a>
                            <a href="#"><img src={AppStore} alt="" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
