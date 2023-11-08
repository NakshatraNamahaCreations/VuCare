import React from 'react'
import './awards.scss'
import AwardsImg from './../../../../Assets/Images/awards.jpg'

export default function Awards() {
  return (
    <section className='awards'>
        <div className="container">
            <div className="awards_wrapper">
                <div className="main_heading">
                    <h2>Awards and Recognition</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident possimus quae adipisci quisquam distinctio nemo, tempora corrupti.</p>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-12 mb-3">
                        <div className="awards_box">
                            <img src={AwardsImg} alt="awards" />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12 mb-3">
                        <div className="awards_box">
                            <img src={AwardsImg} alt="awards" />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12 mb-3">
                        <div className="awards_box">
                            <img src={AwardsImg} alt="awards" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
