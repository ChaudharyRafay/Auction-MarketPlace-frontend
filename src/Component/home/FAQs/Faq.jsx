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
      <section className="faq" id="FAQ-section">
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
                    Can you provide a brief introduction to Auction Market?
                  </div>
                  {/* <img
                    src={setopen ? closeAccordian : openAccordian}
                    alt=""
                    className="onoff"
                  /> */}
                </Accordion.Header>
                <Accordion.Body>
                  An auction market is a platform where goods or services are
                  sold to the highest bidder. It involves participants placing
                  bids, and the highest bid at the end of the auction wins the
                  item.
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
                    How can I participate in an auction?
                  </div>
                  {/* <img
                    src={setopen ? closeAccordian : openAccordian}
                    alt=""
                    className="onoff"
                  /> */}
                </Accordion.Header>
                <Accordion.Body>
                  To participate in an auction, you need to create an account on
                  our website. Once registered, you can browse the available
                  auctions, place bids on items you're interested in, and
                  monitor the progress of the auction.
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
                    How does bidding work?
                  </div>
                  {/* <img
                    src={setopen ? closeAccordian : openAccordian}
                    alt=""
                    className="onoff"
                  /> */}
                </Accordion.Header>
                <Accordion.Body>
                  Bidding typically involves placing an initial bid on an item.
                  Other participants can then place higher bids until the
                  auction ends. If your bid is the highest when the auction
                  closes, you win the item. Some auctions may have specific
                  bidding rules, such as minimum bid increments or reserve
                  prices.
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
                    How do I know if I won an auction?
                  </div>
                  {/* <img
                    src={setopen ? closeAccordian : openAccordian}
                    alt=""
                    className="onoff"
                  /> */}
                </Accordion.Header>
                <Accordion.Body>
                  If you have the highest bid when the auction ends and it meets
                  or surpasses the reserve price (if applicable), you will be
                  notified as the winner. You will receive instructions on how
                  to proceed with payment and item collection.
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
                    How long do auctions typically last?
                  </div>
                  {/* <img
                    src={setopen ? closeAccordian : openAccordian}
                    alt=""
                    className="onoff"
                  /> */}
                </Accordion.Header>
                <Accordion.Body>
                  The duration of auctions can vary. Some may last for a few
                  hours, while others can run for several days. The specific
                  duration for each auction will be indicated on the listing.
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
