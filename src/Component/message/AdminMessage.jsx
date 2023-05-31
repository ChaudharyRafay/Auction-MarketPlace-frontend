import React, { useEffect, useState } from "react";
import "./adminMessage.scss";
import { Icon } from "@iconify/react";
import axios from "axios";
import { BASEURL } from "../../../BASEURL";
import { useSelector } from "react-redux";
import moment from "moment";
import ChatBox from "../Chat/chat/chatBox";
const AdminMessage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [recentMessages, setrecentMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [otherUserId, setotherUserId] = useState(null);
  const handleClick = async (otherUserId, conversationId, unseenMsgs) => {
    setotherUserId(otherUserId);
    setIsChatOpen(true);
    if (unseenMsgs > 0) {
      try {
        const result = await axios.post(`${BASEURL}/api/message/seenMessages`, {
          conversationId,
          userId: userInfo._id,
        });
        if (result.status == 200) {
          getRecentMessages();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getRecentMessages = async () => {
    try {
      const result = await axios.post(`${BASEURL}/api/message/getrecentChat`, {
        userId: userInfo._id,
      });
      if (result.status == 200) {
        setrecentMessages(result.data.recentConversations);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRecentMessages();
  }, [userInfo]);

  return (
    <div>
      <section className="admin-message">
        <div className="admin-message-content">
          {isChatOpen ? (
            <ChatBox
              setIsChatOpen={setIsChatOpen}
              isChatOpen={isChatOpen}
              recieverId={otherUserId}
            />
          ) : (
            <></>
          )}
          <div className="row">
            {/* <div className="col-6 left">
              <h1>
                Good <br /> morning!
              </h1>

              <div className="message-content">
                <h3>@User Name</h3>
                <h2 className="">The company is pivoting to a new market</h2>
                <h6>4.4.2019; 13:44</h6>
                <div className="message-text">
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Turpis pharetra
                    pharetra purus nulla. Ornare sit rutrum amet vitae ipsum
                    risus malesuada consequat. Odio senectus turpis vulputate
                    neque amet. Mi et tempus nunc eu pulvinar massa quisque.
                    Aliquam dui purus nunc et euismod in. Penatibus lectus sit
                    urna vulputate risus massa cum. Augue egestas fermentum quam
                    aliquam blandit facilisis nulla.
                    <br />
                    Consequat id lorem rutrum malesuada donec fusce netus
                    viverra augue. Dignissim cras sed convallis tortor gravida
                    tristique. Aliquam morbi in risus tortor massa. Vitae auctor
                    vel vel tellus tortor. Non nisl pulvinar posuere morbi arcu
                    amet turpis metus volutpat. Id dictumst quis amet hendrerit
                    consequat ligula. Egestas cras morbi aliquet a. Viverra
                    euismod convallis orci sed enim quis in dignissim. Penatibus
                    amet a varius risus et. Fringilla nunc lectus sollicitudin
                    amet semper ut arcu sit dui.
                  </p>
                </div>
                <button
                  className="reply-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Reply
                </button>
              </div>
            </div>
            <div
              class="modal fade
             "
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                class="modal-dialog
               modal-dialog-centered
               message-modal
              "
              >
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Send Message
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="4"
                      placeholder="Write your message"
                    ></textarea>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="col-6 right ">
              {/* <div className="message-day ">
                <Icon
                  icon="mdi:clock-time-five-outline"
                  color="black"
                  width="22"
                  height="22"
                />
                <p>
                  <span>Week 24</span> -<span>Monday</span>
                </p>
              </div> */}

              <div className="message-notif">
                <h4>
                  <Icon
                    icon="mdi:envelope-outline"
                    color="black"
                    width="24"
                    height="24"
                    className="ico"
                  />
                  Messages
                </h4>
              </div>
              <div className="message-tabs">
                {recentMessages.length
                  ? recentMessages?.map((item, index) => {
                      return (
                        <div key={index}>
                          {item.unseenMsgs > 0 ? (
                            <div
                              className="unread-message"
                              onClick={() =>
                                handleClick(
                                  item.otherUserId,
                                  item.id,
                                  item.unseenMsgs
                                )
                              }
                            >
                              <div className="left d-flex align-items-center">
                                <img
                                  src={
                                    BASEURL ? `${BASEURL}/${item.image}` : null
                                  }
                                  class="rounded-circle me-2"
                                  style={{ width: "50px", height: "50px" }}
                                  alt="Avatar"
                                />
                                <h6>
                                  {item.lastMessage.message.length > 100
                                    ? `${item.lastMessage.message.slice(
                                        0,
                                        100
                                      )}...`
                                    : item.lastMessage.message}
                                </h6>

                                {/* <p>
                                More description goes here and it ca nbe very
                                long as this is....
                              </p> */}
                              </div>
                              <div className="right">
                                <div className=" d-flex justify-content-end">
                                  <span
                                    class="badge bg-danger mb-1"
                                    style={{ borderRadius: "13px" }}
                                  >
                                    {item.unseenMsgs}
                                  </span>
                                </div>

                                <p className="msgDate">
                                  {" "}
                                  {moment(item.lastMessage.time).format(
                                    "DD MMM h:mm a"
                                  )}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="read-message shadow-sm"
                              onClick={() =>
                                handleClick(
                                  item.otherUserId,
                                  item.id,
                                  item.unseenMsgs
                                )
                              }
                            >
                              <div className="left d-flex align-items-center">
                                <img
                                  src={
                                    BASEURL ? `${BASEURL}/${item.image}` : null
                                  }
                                  class="rounded-circle me-2"
                                  style={{ width: "50px", height: "50px" }}
                                  alt="Avatar"
                                />
                                <h6>
                                  {item.lastMessage.message.length > 100
                                    ? `${item.lastMessage.message.slice(
                                        0,
                                        100
                                      )}...`
                                    : item.lastMessage.message}
                                </h6>

                                {/* <p>
                                More description goes here and it ca nbe very
                                long as this is....
                              </p> */}
                              </div>
                              <div className="right">
                                <h6>Unread</h6>
                                <p className="msgDate">
                                  {" "}
                                  {moment(item.lastMessage.time).format(
                                    "DD MMM h:mm a"
                                  )}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  : null}
              </div>
              <div className="message-tabs">
                <div className="unread-message">
                  <div className="left">
                    <h6>The company is pivoting to a new market </h6>
                    <p>
                      More description goes here and it ca nbe very long as this
                      is....
                    </p>
                  </div>
                  <div className="right">
                    <h6>Unread</h6>
                    <p className="msgDate">4.4.2019; 13:44</p>
                  </div>
                </div>

                <div className="read-message">
                  <div className="left">
                    <h6>The company is pivoting to a new market </h6>
                    <p>
                      More description goes here and it ca nbe very long as this
                      is....
                    </p>
                  </div>
                  <div className="right">
                    <h6>Unread</h6>
                    <p className="msgDate">4.4.2019; 13:44</p>
                  </div>
                </div>

                <div className="unread-message">
                  <div className="left">
                    <h6>The company is pivoting to a new market </h6>
                    <p>
                      More description goes here and it ca nbe very long as this
                      is....
                    </p>
                  </div>
                  <div className="right">
                    <h6>Unread</h6>
                    <p className="msgDate">4.4.2019; 13:44</p>
                  </div>
                </div>

                <div className="unread-message">
                  <div className="left">
                    <h6>The company is pivoting to a new market </h6>
                    <p>
                      More description goes here and it ca nbe very long as this
                      is....
                    </p>
                  </div>
                  <div className="right">
                    <h6>Message Sent</h6>
                    <p className="msgDate">4.4.2019; 13:44</p>
                  </div>
                </div>
                <div className="unread-message">
                  <div className="left">
                    <h6>The company is pivoting to a new market </h6>
                    <p>
                      More description goes here and it ca nbe very long as this
                      is....
                    </p>
                  </div>
                  <div className="right">
                    <h6>Unread</h6>
                    <p className="msgDate">4.4.2019; 13:44</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminMessage;
