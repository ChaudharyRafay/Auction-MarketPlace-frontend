import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import { Icon } from "@iconify/react";
import { io } from "socket.io-client";
import { BASEURL } from "../../../../BASEURL";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
const ChatBox = ({ setIsChatOpen, isChatOpen, recieverId }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [msg, setMsg] = useState("");
  const [conversation, setconversation] = useState(null);

  const socket = useRef();
  const handleSendMsg = (e) => {
    e.preventDefault();
    if (msg.trim().length) {
      socket.current.emit("sendMsg", {
        senderId: userInfo._id,
        receiverId: recieverId,
        text: msg,
      });
      setMsg("");
    }
  };
  const handleClose = () => {
    socket.current.disconnect();
    setIsChatOpen(false);
  };
  useEffect(() => {
    socket.current = io(BASEURL);
    if (userInfo._id) {
      let userId = userInfo._id;
      socket.current.emit("addUser", userId);
    }
    socket.current.on("getMessage", (data) => {
      setconversation(data.newMessages);
    });
  }, [userInfo]);
  const getMessages = async () => {
    try {
      const result = await axios.post(`${BASEURL}/api/message/getMessage`, {
        userId: userInfo._id,
        recieverId,
      });
      if (result.status == 200) {
        setconversation(result.data.messages);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMessages();
  }, [userInfo]);
  const chatMessagesRef = useRef(null);
  useEffect(() => {
    const chatMessagesContainer = chatMessagesRef.current;

    if (chatMessagesContainer) {
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
  }, [conversation]);

  return (
    <div>
      <div className=" bid-chart" style={{ width: "300px" }}>
        {/* <!-- DIRECT CHAT PRIMARY --> */}
        <div class="box box-primary direct-chat direct-chat-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Direct Chat</h3>

            <div class="box-tools pull-right">
              <span
                data-toggle="tooltip"
                title=""
                class="badge bg-light-blue"
                data-original-title="3 New Messages"
              >
                3
              </span>
              <button
                type="button"
                class="btn btn-box-tool"
                data-widget="collapse"
                onClick={handleClose}
              >
                <Icon
                  icon="iconamoon:close-bold"
                  color="black"
                  width="20"
                  height="20"
                />
              </button>
            </div>
          </div>
          {/* <!-- /.box-header --> */}
          <div class="box-body">
            {/* <!-- Conversatio/ns are loaded here --> */}
            <div class="direct-chat-messages" ref={chatMessagesRef}>
              {conversation?.messages?.map((item, index) => {
                return (
                  <div key={index}>
                    {item.sender._id == recieverId ? (
                      <div class="direct-chat-msg">
                        {/* Message. Default to the left  */}
                        <div class="direct-chat-info clearfix">
                          <span class="direct-chat-name pull-left">
                            {item.sender.username}
                          </span>
                          <span class="direct-chat-timestamp pull-right ms-2">
                            {moment(item.timestamp).format("DD MMM h:mm a")}
                            {/* {item.timestamp} */}
                          </span>
                        </div>
                        {/* <!-- /.direct-chat-info --> */}
                        <img
                          class="direct-chat-img"
                          src={
                            item?.sender?.image
                              ? `${BASEURL}/${item.sender.image}`
                              : null
                          }
                          alt="Message User Image"
                        />
                        {/* <!-- /.direct-chat-img --> */}
                        <div
                          class="direct-chat-text"
                          style={{ wordWrap: "break-word" }}
                        >
                          {item.text}
                        </div>
                        {/* <!-- /.direct-chat-text --> */}
                        {/* <!-- /.direct-chat-msg --> */}
                      </div>
                    ) : (
                      <div class="direct-chat-msg right">
                        {/* <!-- Message to the right --> */}
                        <div class="direct-chat-info clearfix">
                          <span class="direct-chat-name pull-right">
                            {item.sender.username}
                          </span>
                          <span class="direct-chat-timestamp pull-left ms-2">
                            {moment(item.timestamp).format("DD MMM h:mm a")}
                          </span>
                        </div>
                        {/* <!-- /.direct-chat-info --> */}
                        <img
                          class="direct-chat-img"
                          src={
                            item?.sender?.image
                              ? `${BASEURL}/${item.sender.image}`
                              : null
                          }
                          alt="Message User Image"
                        />
                        {/* <!-- /.direct-chat-img --> */}
                        <div
                          class="direct-chat-text"
                          style={{ wordWrap: "break-word" }}
                        >
                          {item.text}
                        </div>
                        {/* <!-- /.direct-chat-text --> */}
                        {/* <!-- /.direct-chat-msg --> */}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* <!--/.direct-chat-messages--> */}

            {/* <!-- Contacts are loaded here --> */}
            <div class="direct-chat-contacts">
              <ul class="contacts-list">
                <li>
                  <a href="#">
                    <img
                      class="contacts-list-img"
                      src="https://bootdey.com/img/Content/user_1.jpg"
                    />

                    <div class="contacts-list-info">
                      <span class="contacts-list-name">
                        Count Dracula
                        <small class="contacts-list-date pull-right">
                          2/28/2015
                        </small>
                      </span>
                      <span class="contacts-list-msg">
                        How have you been? I was...
                      </span>
                    </div>
                    {/* <!-- /.contacts-list-info --> */}
                  </a>
                </li>
                {/* <!-- End Contact Item --> */}
              </ul>
              {/* <!-- /.contatcts-list --> */}
            </div>
            {/* <!-- /.direct-chat-pane --> */}
          </div>
          {/* <!-- /.box-body --> */}
          <div class="box-footer">
            <form action="#" method="post">
              <div class="input-group">
                <textarea
                  rows={1}
                  type="text"
                  name="message"
                  value={msg}
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                  placeholder="Type Message ..."
                  className="form-controls"
                />
                <span class="input-group-btn">
                  <button
                    type="submit"
                    class="btn btn-primary btn-flat"
                    onClick={handleSendMsg}
                  >
                    Send
                  </button>
                </span>
              </div>
            </form>
          </div>
          {/* <!-- /.box-footer--> */}
        </div>
        {/* <!--/.direct-chat --> */}
      </div>
    </div>
  );
};

export default ChatBox;
