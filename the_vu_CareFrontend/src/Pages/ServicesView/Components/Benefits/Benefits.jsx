import React from 'react'
import './benefits.scss'
import Benefit from './../../../../Assets/Images/benefit.svg'

export default function Benefits() {
    const Benefits = [
        {
            id: 1,
            img : '',
            title: 'Lowest Price in Market | ISO Certified Company'
        },
        {
            id: 2,
            img : '',
            title: 'Trained Professionals | No Sub Contract'
        },
        {
            id: 3,
            img : '',
            title: '100% Satisfaction or FREE Rework*'
        },
        {
            id: 4,
            img : '',
            title: 'Trusted by 31+ Lakh customers | 15+ Years'
        }
    ]
    return (
        <section className='benefit'>
            <div className="container">
                <div className="row">
                    {
                        Benefits.map((item, id)=>(
                            <div className="col-lg-3 col-md-6 col-sm-6 mb-3">
                                <div className="benefit_box">
                                    <div className="icon">
                                        <img src={Benefit} alt="" />
                                    </div>
                                    <div className="text">{item.title}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
