import React, { useState } from "react";
import "./faq.css";
import { Icon } from "@iconify/react";
import Accordion from "react-bootstrap/Accordion";

const Faq = () => {
  const [setopen, setclose] = useState(false);

  function changeimg() {
    setclose(!setopen);
  }

  return (
    <>
      <section className="faq">
        <div className="section-heading">
          <h2>FAQ</h2>
          <p>Maybe your question is have been answered, check this out</p>
        </div>
        <div className="container">
          <div className="section-content">
            {/* 1 */}
            <Accordion className="accord" defaultActiveKey="0">
              <Accordion.Item eventKey="5">
                <Accordion.Header onClick={changeimg}>
                  <div>
                    <img
                      src="..\asset\faqs\bulletFaq.svg"
                      alt=""
                      className="diamond"
                    />
                    Can your provide us with a brief introduction to MultiArt ?
                  </div>
                  {/* <img
                    src={setopen ? closeAccordian : openAccordian}
                    alt=""
                    className="onoff"
                  /> */}
                </Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Exercitationem debitis eligendi illo deleniti esse odit
                  voluptas! Et sit sunt, deserunt quos commodi quia beatae
                  iusto! Dolores corrupti excepturi soluta sunt?
                </Accordion.Body>
              </Accordion.Item>

              {/* 2 */}
              <Accordion.Item eventKey="1">
                <Accordion.Header onClick={changeimg}>
                  <div>
                    <img
                      src="..\asset\faqs\bulletFaq.svg"
                      alt=""
                      className="diamond"
                    />
                    What is the Mutliart like briefly ?
                  </div>
                  {/* <img
                    src={setopen ? closeAccordian : openAccordian}
                    alt=""
                    className="onoff"
                  /> */}
                </Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                  voluptates reprehenderit cupiditate ducimus atque ut,
                  dignissimos possimus dicta officia nisi totam natus
                  blanditiis, ratione beatae ea in laborum, exercitationem
                  corrupti.
                </Accordion.Body>
              </Accordion.Item>

              {/* 3 */}
              <Accordion.Item eventKey="2">
                <Accordion.Header onClick={changeimg}>
                  <div>
                    <img
                      src="..\asset\faqs\bulletFaq.svg"
                      alt=""
                      className="diamond"
                    />
                    Where can i learn more about the Multiart ?
                  </div>
                  {/* <img
                    src={setopen ? closeAccordian : openAccordian}
                    alt=""
                    className="onoff"
                  /> */}
                </Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Eveniet officiis distinctio est maxime id aut exercitationem
                  obcaecati dignissimos suscipit. Molestiae totam impedit
                  dolores architecto, praesentium sed eos animi magni. Facilis?
                </Accordion.Body>
              </Accordion.Item>

              {/* 4 */}
              <Accordion.Item eventKey="3">
                <Accordion.Header onClick={changeimg}>
                  <div>
                    <img
                      src="..\asset\faqs\bulletFaq.svg"
                      alt=""
                      className="diamond"
                    />
                    What are the different ways Artist can earn while they
                    Upload ?
                  </div>
                  {/* <img
                    src={setopen ? closeAccordian : openAccordian}
                    alt=""
                    className="onoff"
                  /> */}
                </Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                  eveniet exercitationem voluptatum repellendus incidunt
                  voluptates tenetur corrupti vel consequatur? Nam ipsa corrupti
                  est aliquid, laborum at dolorem sed quaerat porro.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header onClick={changeimg}>
                  <div>
                    <img
                      src="..\asset\faqs\bulletFaq.svg"
                      alt=""
                      className="diamond"
                    />
                    If I’m an influencer/content creator/partner, who should i
                    contact?
                  </div>
                  {/* <img
                    src={setopen ? closeAccordian : openAccordian}
                    alt=""
                    className="onoff"
                  /> */}
                </Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusantium debitis labore sunt perspiciatis nulla expedita
                  explicabo adipisci ipsam fuga. Provident voluptatibus ipsa
                  accusantium sed totam modi, laboriosam deleniti quod quae.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
