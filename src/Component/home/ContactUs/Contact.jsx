import * as React from "react";
import "./contact.css";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Icon } from "@iconify/react";
import axios from "axios";
import { BASEURL } from "../../../../BASEURL";
import { toast } from "react-toastify";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Remove error for the field if it has a value
    setErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };
  const handleSubmit = async (e) => {
    console.log("-----------");
    e.preventDefault();

    // Check for empty fields
    const fieldErrors = {};
    let hasErrors = false;

    for (const key in formData) {
      if (!formData[key]) {
        fieldErrors[key] = true;
        hasErrors = true;
      }
    }

    setErrors(fieldErrors);

    // If any field is empty, return without submitting the form
    if (hasErrors) {
      return;
    }
    try {
      const result = await axios.post(
        `${BASEURL}/api/user/contactUs`,
        formData
      );
      if (result.status == 200) {
        toast.success("Mesaage sent successfully... ");
      }
    } catch (error) {
      toast.error("Server error.Try again...");
    }
  };

  return (
    <div className="c-main" id="contact-section">
      <div className="c-inner row">
        <div className="col-lg-6 col-sm-12">
          <h1 className="c-title">CONTACT US</h1>
          <form onSubmit={handleSubmit}>
            <div className="email-input">
              <Box sx={{ "& > :not(style)": { m: 1 } }}>
                <FormControl variant="standard">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Email
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    endAdornment={
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    }
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className="text-danger mt-1">
                      * Email is a required field
                    </p>
                  )}
                </FormControl>
              </Box>
            </div>

            <div className="name-input">
              <Box sx={{ "& > :not(style)": { m: 1 } }}>
                <FormControl variant="standard">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Name
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    endAdornment={
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    }
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <p className="text-danger mt-1">
                      * Name is a required field
                    </p>
                  )}
                </FormControl>
              </Box>
            </div>

            <div className="message-input">
              <Box sx={{ "& > :not(style)": { m: 1 } }}>
                <FormControl variant="standard">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Message
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    endAdornment={
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    }
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                  {errors.message && (
                    <p className="text-danger mt-1">
                      * Message is a required field
                    </p>
                  )}
                </FormControl>
              </Box>
            </div>
            <div className="btn">
              <button type="submit">Get in Touch</button>
            </div>
          </form>
        </div>
        <div className="col-lg-6 col-sm-12 c-content-r">
          <div className="c-para">
            <p>For discussions and our latest updates follow us on</p>
            <p>Twitter： @bidauction</p>
          </div>
          <div className="c-para mt-5">
            <p>For cooperation , please contact us at </p>
            <p>Email： hello@bidauction.io.</p>
          </div>

          <div className="c-social-icon">
            <div className="mycircle">
              <Icon
                icon="typcn:social-twitter"
                className="icos"
                width="40"
                height="40"
              />
            </div>
            <div className="mycircle">
              <Icon
                icon="ic:round-discord"
                className="icos"
                width="40"
                height="40"
              />
            </div>
            <div className="mycircle">
              <Icon
                icon="ic:sharp-telegram"
                className="icos"
                width="40"
                height="40"
              />
            </div>
            <div className="mycircle">
              <Icon
                icon="ri:medium-fill"
                className="icos"
                width="40"
                height="40"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
