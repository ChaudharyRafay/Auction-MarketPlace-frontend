import React from "react";
import "./hero.css";

const Hero = () => {
  return (
    <>
      <div className="hero-sec">
        <div
          id="carouselExampleCaptions"
          class="carousel slide "
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>
          <div className="overlay"></div>
          <div class="carousel-inner">
            <div class="carousel-item  active " data-bs-interval="40000">
              <img src="\asset\hero\1.png" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block slides-content">
                <h5 className="discover">Discover</h5>
                <h5 className="discover">Collect</h5>
                <h5 className="discover">Sell the Best Product</h5>

                <button className="explore">Explore</button>
                <button className="learn">Learn More</button>

                <p className="para para1">Built for collaboration.</p>
                <p className="para">
                  Design,create, store and trade Product easily.
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="\asset\hero\2.png" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5 className="discover">Discover</h5>
                <h5 className="discover">Collect</h5>
                <h5 className="discover">Sell the Best Product</h5>

                <button className="explore">Explore</button>
                <button className="learn">Learn More</button>

                <p className="para mt-4">Built for collaboration.</p>
                <p className="para">
                  Design,create, store and trade Product easily.
                </p>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
