import React from 'react'
import './footer.scss'
export default function Footer() {
  return (
    <>
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="quick_links">
              <h4 className="title">Quick Links</h4>
              <a href="#" className="link">Home</a>
              <a href="#" className="link">About Us</a>
              <a href="#" className="link">Work with Us</a>
              <a href="#" className="link">Pricing</a>
              <a href="#" className="link">Contact Us</a>
            </div>
            <div className="services">
              <h4 className="title">Services</h4>
              <div className="row">
                <div className="col-md-4 col-6">
                  <a href="" className="links">House Cleaning</a>
                  <a href="" className="links">Apartment Cleaning</a>
                  <a href="" className="links">Estate Cleaning</a>
                  <a href="" className="links">Office Cleaning</a>
                  <a href="" className="links">End-of-Lease Cleaning</a>
                  <a href="" className="links">Construction Cleaning</a>
                  <div className="social_link">
                    <a href="">
                      <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.08665 19.2015V10.4441H10.025L10.4658 7.03016H7.08665V4.85088C7.08665 3.86278 7.35991 3.1894 8.77845 3.1894L10.5847 3.18866V0.135126C10.2724 0.0945323 9.2001 0.00146484 7.9521 0.00146484C5.34609 0.00146484 3.56197 1.59215 3.56197 4.51276V7.03016H0.614746V10.4441H3.56197V19.2015H7.08665Z" fill="white" />
                      </svg>
                    </a>
                    <a href="">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_122_5775)">
                          <path d="M14.3996 0.00195312H4.79988C2.16018 0.00195312 0 2.16213 0 4.80184V14.4021C0 17.0411 2.16018 19.202 4.79988 19.202H14.3996C17.0393 19.202 19.1995 17.0411 19.1995 14.4021V4.80184C19.1995 2.16213 17.0393 0.00195312 14.3996 0.00195312ZM17.5995 14.4021C17.5995 16.166 16.1646 17.6019 14.3996 17.6019H4.79988C3.03569 17.6019 1.60004 16.166 1.60004 14.4021V4.80184C1.60004 3.03741 3.03569 1.60199 4.79988 1.60199H14.3996C16.1646 1.60199 17.5995 3.03741 17.5995 4.80184V14.4021Z" fill="white" />
                          <path d="M14.8006 5.60209C15.4633 5.60209 16.0005 5.06484 16.0005 4.40212C16.0005 3.73939 15.4633 3.20215 14.8006 3.20215C14.1378 3.20215 13.6006 3.73939 13.6006 4.40212C13.6006 5.06484 14.1378 5.60209 14.8006 5.60209Z" fill="white" />
                          <path d="M9.59969 4.80176C6.94822 4.80176 4.7998 6.95041 4.7998 9.60164C4.7998 12.2519 6.94822 14.402 9.59969 14.402C12.2504 14.402 14.3996 12.2519 14.3996 9.60164C14.3996 6.95041 12.2504 4.80176 9.59969 4.80176ZM9.59969 12.802C7.83259 12.802 6.39984 11.3692 6.39984 9.60164C6.39984 7.83407 7.83259 6.4018 9.59969 6.4018C11.3668 6.4018 12.7995 7.83407 12.7995 9.60164C12.7995 11.3692 11.3668 12.802 9.59969 12.802Z" fill="white" />
                        </g>
                        <defs>
                          <clipPath id="clip0_122_5775">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                    <a href="">
                      <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.3025 4.98889C20.3169 5.18961 20.3169 5.39037 20.3169 5.59111C20.3169 11.7135 15.6505 18.7679 7.12168 18.7679C4.49412 18.7679 2.05323 18.0079 0 16.6888C0.373327 16.7318 0.732247 16.7461 1.11994 16.7461C3.288 16.7461 5.28382 16.015 6.87758 14.7675C4.83871 14.7245 3.13008 13.3911 2.54138 11.5558C2.82857 11.5988 3.11571 11.6274 3.41727 11.6274C3.83364 11.6274 4.25006 11.5701 4.63771 11.4697C2.5127 11.0396 0.918888 9.17563 0.918888 6.92455V6.86721C1.53627 7.21133 2.25423 7.4264 3.01517 7.45504C1.76601 6.62341 0.947616 5.20395 0.947616 3.59808C0.947616 2.73779 1.1773 1.94921 1.57936 1.26097C3.86232 4.07125 7.29396 5.90649 11.1419 6.10726C11.0701 5.76314 11.0271 5.40472 11.0271 5.04626C11.0271 2.49404 13.0947 0.415039 15.6648 0.415039C17.0001 0.415039 18.2062 0.974228 19.0533 1.87752C20.1014 1.6768 21.1065 1.28966 21.9967 0.759149C21.6521 1.83454 20.9198 2.73784 19.9579 3.31133C20.8911 3.21101 21.7958 2.95287 22.6284 2.59444C21.9969 3.51205 21.2071 4.32929 20.3025 4.98889Z" fill="white" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <a href="" className="links">NDIS Cleaning</a>
                  <a href="" className="links">Oven Cleaning</a>
                  <a href="" className="links">Tile Cleaning</a>
                  <a href="" className="links">Strata Cleaning</a>
                  <a href="" className="links">Residential Window</a>
                </div>
                <div className="col-md-4">
                  <a href="" className="links">Regular Cleaning</a>
                  <a href="" className="links">Deep Cleaning</a>
                  <a href="" className="links">Carpet Cleaning</a>
                  <a href="" className="links">Pressure Washing</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="rieght">
              <h4 className="popular title">Most Popular Service Locations</h4>
              <h4 className="title red">INDIA</h4>
              <div className="row">
                <div className="col-md-3 col-6">
                  <a href="" className="links">Bondi</a>
                  <a href="" className="links">Morrickville</a>
                  <a href="" className="links">Sutherland Shire</a>
                  <a href="" className="links">Drummoyne</a>
                  <a href="" className="links">Hunters Hill</a>
                  <a href="" className="links">Parramatta</a>
                  <a href="" className="links">Ryde</a>
                  <a href="" className="links">Inner West</a>
                </div>
                <div className="col-md-3 col-6">
                  <a href="" className="links">Epping</a>
                  <a href="" className="links">Botany</a>
                  <a href="" className="links">Castle Hill</a>
                  <a href="" className="links">Lane Cove</a>
                  <a href="" className="links">Punchbowl</a>
                  <a href="" className="links">Randwick</a>
                  <a href="" className="links">Paddington</a>
                  <a href="" className="links">Cronulla</a>
                </div>
                <div className="col-md-3 col-6">
                  <a href="" className="links">Birchgrove</a>
                  <a href="" className="links">Bellevue Hill</a>
                  <a href="" className="links">Neutral Bay</a>
                  <a href="" className="links">Dee Why</a>
                  <a href="" className="links">Manly</a>
                  <a href="" className="links">Blacktown</a>
                  <a href="" className="links">Glebe</a>
                  <a href="" className="links">Darlinghurst</a>
                </div>
                <div className="col-md-3 col-6">
                  <a href="" className="links">Leichhardt</a>
                  <a href="" className="links">Surry Hills</a>
                  <a href="" className="links">Newtown</a>
                  <a href="" className="links">Camperdown</a>
                  <a href="" className="links">Strathfield</a>
                  <a href="" className="links">Rockdale</a>
                  <a href="" className="links">Balmain</a>
                  <a href="" className="links">Hornsby</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
        <div className="copyright">
          <div className="container">
            <div className="copyright_wrapper">
              <span>© Copyright 2022 Vijay Home Services. All rights reserved.</span>
              <span>Terms and Conditions - Privacy Policy</span>
            </div>
          </div>
        </div>
        </>
  )
}
