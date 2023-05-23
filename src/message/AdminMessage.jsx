import React from "react";
import "./adminMessage.scss";
import { Icon } from "@iconify/react";
const AdminMessage = () => {
  return (
    <div>
      <section className="admin-message">
        <div className="admin-message-content">
          <div className="row">
            <div className="col-6 left">
              <h1>
                Good <br /> morning!
              </h1>

              <div className="message-content">
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
              </div>
            </div>

            <div className="col-6 right ">
              <div className="message-day ">
                <Icon
                  icon="mdi:clock-time-five-outline"
                  color="black"
                  width="22"
                  height="22"
                />
                <p>
                  <span>Week 24</span> -<span>Monday</span>
                </p>
              </div>

              <div className="message-notif">
                <h4>
                  <Icon
                    icon="mdi:envelope-outline"
                    color="black"
                    width="24"
                    height="24"
                    className="ico"
                  />
                  Notification
                </h4>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminMessage;
