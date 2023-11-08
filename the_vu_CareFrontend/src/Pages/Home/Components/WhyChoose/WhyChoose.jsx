import React from 'react'
import './whychoose.scss'
import Why from './../../../../Assets/Images/why.jpg'
import Trained from './../../../../Assets/Images/trained.svg'
import Paint from './../../../../Assets/Images/paint.svg'
import Guarantee from './../../../../Assets/Images/guarantee.svg'
import Price from './../../../../Assets/Images/price.svg'
import Warranty from './../../../../Assets/Images/warranty.svg'
import Contract from './../../../../Assets/Images/contract.svg'

export default function WhyChoose() {
  return (
    <section className='why_choose'>
      <div className="container">
        <div className="why_choose_wrapper">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <div className="why_img">
                <img src={Why} alt="" />
              </div>
            </div>
            <div className="col-lg-8 col-md-12">
              <div className="title">Why Choose Us ?</div>
              <div className="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident possimus quae adipisci quisquam distinctio nemo, tempora corrupti.</div>
              <div className="row">
                <div className="col-md-4 col-6"><div className="why_box"><img src={Trained} alt="" /> <div className="name">Trained Professional</div></div></div>
                <div className="col-md-4 col-6"><div className="why_box"><img src={Paint} alt="" /> <div className="name">Asian Paint Certified</div></div></div>
                <div className="col-md-4 col-6"><div className="why_box"><img src={Guarantee} alt="" /> <div className="name">100% Guarantee</div></div></div>
                <div className="col-md-4 col-6"><div className="why_box"><img src={Price} alt="" /> <div className="name">Best Price Best Work</div></div></div>
                <div className="col-md-4 col-6"><div className="why_box"><img src={Warranty} alt="" /> <div className="name">1 Year Service Warranty</div></div></div>
                <div className="col-md-4 col-6"><div className="why_box"><img src={Contract} alt="" /> <div className="name">No Subcontract</div></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
