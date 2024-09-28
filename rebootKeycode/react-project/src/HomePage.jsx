import "./homePage.css";
import logo from "./assets/logo.svg";

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import gif from "./assets/75lD.gif";
import { useState } from "react";

import Drawer from "@mui/material/Drawer";

const HomePage = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleFreeButtonClick = () => {
    navigate("/upload");
  };
  const handleLoginButtonClick = () => {
    navigate("/login");
  };
  const handleLoginInButtonClick = () => {
    navigate("/loginIn");
  };

  const handlePricingButtonClick = () => {
    navigate("/pricing");
  };

  const handlePricingClick = () => {
    setIsDrawerOpen(true);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <div className="homepage-container">
      <div className="header-container">
        <div className="header">
          <img src={logo} alt="logo" className="logo" />
          <div className="logo-text">
            <div className="logo-text1">Convince-AI</div>
            <div className="logo-text2">Redefining Image Privacy for the AI Age</div>
          </div>
        </div>
        <div className="homepage-button-container2">
          <Button
            variant="contained"
            onClick={handleLoginInButtonClick}
            sx={{
              marginLeft: "600px",
              borderRadius: "30px",
              backgroundColor: "#74818F",
              color: "white",
              width: "250px",
              fontWeight: "400",
              fontSize: "20px",
              textTransform: "none",
              transition: "outline 0.8 ease",
              "&:hover": {
                outline: "8px solid rgba(116, 129, 143, 0.5)", // Add red outline on hover
              },
            }}
          >
            Login Now
          </Button>
        </div>
      </div>
      <div className="content">
        <div className="content-left">
          <div>
            <div className="left1">Who Am I?</div>
            <div className="left2">
            Welcome to Convince.AI, your shield against unauthorised AI usage of personal images. Our mission is to protect your visuals from being used in AI training without consent.  we offer advanced technology to prevent image scraping and ensure your photos remain private. Join us in keeping personal images secure. With Convince.AI, your privacy is our priority.
            </div>
          </div>
          <div className="homepage-button-container1">
            <Button
              variant="contained"
              onClick={handleFreeButtonClick}
              sx={{
                borderRadius: "30px",
                backgroundColor: "#74818F",
                color: "white",
                width: "500px",
                fontWeight: "400",
                fontSize: "20px",
                textTransform: "none",
                "&:hover": {
                  outline: "8px solid rgba(116, 129, 143, 0.5)", // Add red outline on hover
                },
              }}
            >
              Why Wait? Try For Free!
            </Button>
          </div>
          <div className="homepage-button-container2">
            <Button
              variant="contained"
              onClick={handleLoginButtonClick}
              sx={{
                borderRadius: "30px",
                backgroundColor: "#74818F",
                color: "white",
                width: "500px",
                fontWeight: "400",
                fontSize: "20px",
                textTransform: "none",
                transition: "outline 0.8 ease",
                "&:hover": {
                  outline: "8px solid rgba(116, 129, 143, 0.5)", // Add red outline on hover
                },
              }}
            >
              Sign-in
            </Button>
          </div>
        </div>
        <div>
          <img src={gif} />
        </div>

        <div className="content-right">
          <div className="content-item">
            <span>About</span>
          </div>
          <div className="content-item"  onClick={handlePricingClick}>
            <span>Our Services</span>
          </div>
          <div className="content-item" onClick={handlePricingButtonClick} >
            <span>Pricing & Plans</span>
          </div>
          <div className="content-item">
            <span>Contact Us</span>
          </div>
        </div>
        <Drawer
          anchor="right"
          PaperProps={{
            sx: {
              backgroundColor: "transparent", // Make the drawer background transparent
            },
          }}
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          <div
            style={{
              width: "300px",
              backgroundColor: "#6E7B8A",
              height: "100%",
              color: "white",
              display: "flex",
              fontSize: "24px",
              paddingTop: "90px",
              paddingLeft: "40px",
            }}
          >
            <div>
              <div>We Provide</div>
              <div className="premium-price">
              <div>
                <ul>
                  <li>Unlimited Generation</li>
                  <li>Easy Usage</li>
                  <li>Report Generation</li>
                </ul>
              </div>
                
                <Button
                  variant="contained"
                  onClick={handleLoginInButtonClick}
                  sx={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    borderRadius: "30px",
                    backgroundColor: "black",
                    color: "white",
                    width: "200px",
                    fontWeight: "400",
                    fontSize: "20px",
                    textTransform: "none",
                    transition: "outline 0.8 ease",
                    "&:hover": {
                      outline: "8px solid rgba(116, 129, 143, 0.5)", // Add red outline on hover
                    },
                  }}
                >
                  Login Now
                </Button>
              </div>
              <br />
              <br />
              <div></div>
             
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default HomePage;
