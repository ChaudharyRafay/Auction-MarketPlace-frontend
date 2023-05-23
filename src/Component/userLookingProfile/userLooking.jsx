import React, { useEffect, useState, PureComponent } from "react";
import { Icon } from "@iconify/react";
import { Tab, Tabs } from "react-bootstrap";
import "./userLooking.scss";

const UserLooking = () => {
  const liveAuctionCard = [
    {
      name: "The Hammer",
      productID: 16,
      price: 0.33,
    },

    {
      name: "Iron Man",
      productID: 36,
      price: 0.3,
    },

    {
      name: "Iron Man",
      productID: 36,
      price: 0.3,
    },
    {
      name: "Iron Man",
      productID: 36,
      price: 0.3,
    },
  ];
  const [key, setKey] = useState("collection");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="userLookingWrap edit-profile">
      <div className="back-btn">
        <a href="#">back</a>
      </div>

      <div className="profile-banner">
        <img src="\profile\editBanner1.png" alt="" />
        <button style={{ color: "#fff", background: "#000" }}>Follow +</button>
      </div>

      <div className="profile-header">
        <div className="left">
          <div className="user-dp">
            <Icon
              icon="mdi:cloud-upload-outline"
              color="#979797"
              width="32"
              height="32"
            />
            <h6>
              Drop file to upload
              <br />
              Or <span>browse</span>
            </h6>
            <p>
              Supported file formated: .jepg, .png, and .gif <br /> Max File
              size is 10 MB
            </p>
            <label htmlFor="dp" style={{ zIndex: 3 }}></label>
            <input type="file" id="dp" accept=".jepg,png,.gif" />
            {/* onUploading dp following img will be shown */}
            <img
              src="\profile\profile.png"
              alt=""
              className="profile-dp"
              style={{ zIndex: 2 }}
            />
          </div>
          <div className="res-profile">
            <div className="user-details">
              <div className="user-name">
                <h6>Shan Jacks</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <h3>Description</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur. Diam cras mi mauris
            facilisis pharetra. Ipsum diam fames morbi. Laoreet nunc imperdiet
            pulvinar lacinia faucibus nibh dui.
          </p>
          <div className="social-ico">
            <a href="#" target="">
              <Icon
                icon="ant-design:twitter-circle-filled"
                color="#000"
                width="32"
                height="32"
                className="ico"
              />
            </a>
            <a href="#" target="">
              <Icon
                icon="ic:baseline-facebook"
                color="#000"
                width="32"
                height="32"
                className="ico"
              />
            </a>
            <a href="#" target="">
              <Icon
                icon="ic:baseline-telegram"
                color="#000"
                width="32"
                height="32"
                className="ico"
              />
            </a>
            <a href="#" target="">
              <Icon
                icon="majesticons:link-circle"
                color="#000"
                width="32"
                height="32"
                className="ico"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="profile-data ">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 userTabss "
        >
          {/* My Items */}

          {/* Collections */}
          <Tab eventKey="collection" title={<span>My Collection（3）</span>}>
            <div className="profile-collection ">
              <div className="p-card">
                <div className="multiArt-collections-card">
                  <div className="card-back">
                    <img src="\productcollection\collection.png" alt="" />
                  </div>
                  <div className="verify-badge">
                    <p>
                      Verified
                      <span>
                        <Icon
                          icon="material-symbols:verified-rounded"
                          color="#0487ff"
                          width="18"
                          height="18"
                        />
                      </span>
                    </p>
                    <div style={{ cursor: "pointer" }}>
                      <Icon
                        icon="material-symbols:delete"
                        color="white"
                        width="20"
                        height="20"
                      />
                    </div>
                  </div>

                  <div className="collection-thumbnail">
                    <div>
                      <img src="\productcollection\thumbnail.png" alt="" />
                    </div>
                    <div>
                      <img src="\productcollection\thumbnail1.png" alt="" />
                    </div>
                    <div>
                      <img src="\productcollection\thumbnail2.png" alt="" />
                    </div>
                    <div>
                      <img src="\productcollection\thumbnail3.png" alt="" />
                    </div>
                  </div>
                </div>

                <h1>Abstract cat</h1>
                <h3>
                  16 artworks <span>|</span> 3 collectors
                </h3>
                <p className="detail">
                  Lorem ipsum dolor sit amet consectetur. Diam cras mi mauris
                  facilisis pharetra. Ipsum diam fames morbi. Laoreet nunc
                  imperdiet pulvinar lacinia faucibus nibh dui.
                </p>
              </div>

              <div className="p-card">
                <div className="multiArt-collections-card">
                  <div className="card-back">
                    <img src="\productcollection\collection.png" alt="" />
                  </div>
                  <div className="verify-badge">
                    <p>
                      Verified
                      <span>
                        <Icon
                          icon="material-symbols:verified-rounded"
                          color="#0487ff"
                          width="18"
                          height="18"
                        />
                      </span>
                    </p>
                    <div style={{ cursor: "pointer" }}>
                      <Icon
                        icon="material-symbols:delete"
                        color="white"
                        width="20"
                        height="20"
                      />
                    </div>
                  </div>

                  <div className="collection-thumbnail">
                    <div>
                      <img src="\productcollection\thumbnail.png" alt="" />
                    </div>
                    <div>
                      <img src="\productcollection\thumbnail1.png" alt="" />
                    </div>
                    <div>
                      <img src="\productcollection\thumbnail2.png" alt="" />
                    </div>
                    <div>
                      <img src="\productcollection\thumbnail3.png" alt="" />
                    </div>
                  </div>
                </div>

                <h1>Space</h1>
                <h3>
                  16 artworks <span>|</span> 3 collectors
                </h3>
                <p className="detail">
                  Lorem ipsum dolor sit amet consectetur. Diam cras mi mauris
                  facilisis pharetra. Ipsum diam fames morbi. Laoreet nunc
                  imperdiet pulvinar lacinia faucibus nibh dui.
                </p>
              </div>

              <div className="p-card">
                <div className="multiArt-collections-card">
                  <div className="card-back">
                    <img src="\productcollection\collection.png" alt="" />
                  </div>
                  <div className="verify-badge">
                    <p>
                      Verified
                      <span>
                        <Icon
                          icon="material-symbols:verified-rounded"
                          color="#0487ff"
                          width="18"
                          height="18"
                        />
                      </span>
                    </p>
                    <div style={{ cursor: "pointer" }}>
                      <Icon
                        icon="material-symbols:delete"
                        color="white"
                        width="20"
                        height="20"
                      />
                    </div>
                  </div>

                  <div className="collection-thumbnail">
                    <div>
                      <img src="\productcollection\thumbnail.png" alt="" />
                    </div>
                    <div>
                      <img src="\productcollection\thumbnail1.png" alt="" />
                    </div>
                    <div>
                      <img src="\productcollection\thumbnail2.png" alt="" />
                    </div>
                    <div>
                      <img src="\productcollection\thumbnail3.png" alt="" />
                    </div>
                  </div>
                </div>

                <h1>Abstract cat</h1>
                <h3>
                  16 artworks <span>|</span> 3 collectors
                </h3>
                <p className="detail">
                  Lorem ipsum dolor sit amet consectetur. Diam cras mi mauris
                  facilisis pharetra. Ipsum diam fames morbi. Laoreet nunc
                  imperdiet pulvinar lacinia faucibus nibh dui.
                </p>
              </div>
            </div>
          </Tab>

          {/* Favorites */}
          <Tab eventKey="fav" title={<span>Favorites（3）</span>}>
            <div className="fav-profile-card">
              <div className="fav-card">
                <div className="fav-card-head">
                  <img src="\profile\favCard.png" alt="" />
                  <Icon
                    icon="material-symbols:favorite-rounded"
                    color="white"
                    width="24"
                    height="24"
                    className="fav"
                  />
                </div>
                <div className="fav-card-thumb">
                  <img src="\profile\favCardThumb.png" alt="" />
                  <img src="\profile\favCardThumb.png" alt="" />
                  <img src="\profile\favCardThumb.png" alt="" />
                </div>
                <div className="fav-name">
                  <h1>The start</h1>
                  <h2>
                    23<span> items</span>
                  </h2>
                </div>
              </div>

              <div className="fav-card">
                <div className="fav-card-head">
                  <img src="\profile\favCard.png" alt="" />
                  <Icon
                    icon="material-symbols:favorite-rounded"
                    color="white"
                    width="24"
                    height="24"
                    className="fav"
                  />
                </div>
                <div className="fav-card-thumb">
                  <img src="\profile\favCardThumb.png" alt="" />
                  <img src="\profile\favCardThumb.png" alt="" />
                  <img src="\profile\favCardThumb.png" alt="" />
                </div>
                <div className="fav-name">
                  <h1>The start</h1>
                  <h2>
                    23<span> items</span>
                  </h2>
                </div>
              </div>

              <div className="fav-card">
                <div className="fav-card-head">
                  <img src="\profile\favCard.png" alt="" />
                  <Icon
                    icon="material-symbols:favorite-rounded"
                    color="white"
                    width="24"
                    height="24"
                    className="fav"
                  />
                </div>
                <div className="fav-card-thumb">
                  <img src="\profile\favCardThumb.png" alt="" />
                  <img src="\profile\favCardThumb.png" alt="" />
                  <img src="\profile\favCardThumb.png" alt="" />
                </div>
                <div className="fav-name">
                  <h1>The start</h1>
                  <h2>
                    23<span> items</span>
                  </h2>
                </div>
              </div>

              <div className="fav-card">
                <div className="fav-card-head">
                  <img src="\profile\favCard.png" alt="" />
                  <Icon
                    icon="material-symbols:favorite-rounded"
                    color="white"
                    width="24"
                    height="24"
                    className="fav"
                  />
                </div>
                <div className="fav-card-thumb">
                  <img src="\profile\favCardThumb.png" alt="" />
                  <img src="\profile\favCardThumb.png" alt="" />
                  <img src="\profile\favCardThumb.png" alt="" />
                </div>
                <div className="fav-name">
                  <h1>The start</h1>
                  <h2>
                    23<span> items</span>
                  </h2>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default UserLooking;
