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
            <div className="col-6 right ">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminMessage;
