import "./homePage.css";
import logo from "./assets/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const LoginInPage = () => {
  const [checked, setChecked] = useState(false);
  const handleLoginButtonClick = () => {
    navigate("/login");
  };
  const navigate = useNavigate();
  const handleGoButtonClick = () => {
    navigate("/uploadUser");
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
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
            onClick={handleLoginButtonClick}
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
            Get Started
          </Button>
        </div>
      </div>
      <div className="content">
        <div className="login-content-left">
          <div>
            <div className="login-left1">Welcome Back!</div>
          </div>
          <div className="homepage-button-container2">
            <input
              className="custom-input"
              type="email"
              placeholder="Email"
              style={{
                borderRadius: "10px",
                backgroundColor: "#74818F",
                color: "white",
                width: "500px",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "15px",
                fontWeight: "400",
                fontSize: "20px",
                textTransform: "none",
                border: "none",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="homepage-button-container3">
            <input
              className="custom-input"
              type="password"
              placeholder="Password"
              style={{
                borderRadius: "10px",
                backgroundColor: "#74818F",
                color: "white",
                width: "500px",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "15px",
                fontWeight: "400",
                fontSize: "20px",
                textTransform: "none",
                border: "none",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="terms">
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                    name="termsCheckbox"
                    sx={{
                      color: "#74818F",
                      "&.Mui-checked": {
                        color: "#74818F", // Change this to your desired color
                      },
                    }}
                  />
                }
              />
            </div>
            <div className="label-terms">
              <div className="label-term1">Terms & Condition</div>
              <div className="label-term2">Its just a formality</div>
            </div>
          </div>
          <div className="login-button-container1">
            <Button
              variant="contained"
              onClick={handleGoButtonClick}
              sx={{
                borderRadius: "30px",
                backgroundColor: "#74818F",
                color: "white",
                width: "400px",
                fontWeight: "400",
                fontSize: "20px",
                textTransform: "none",
                transition: "outline 0.8 ease",
                "&:hover": {
                  outline: "8px solid rgba(116, 129, 143, 0.5)", // Add red outline on hover
                },
              }}
            >
              Lets Go
            </Button>
          </div>
        </div>

        <div className="vertical-line"></div>
        <div className="content-right">
          <div>
            <div className="left1">Did You Know ?</div>
            <div className="left2">
            A curious but eerie fact about AI training images is that they can include invisible alterations called adversarial examples. These tweaks can trick AI into seeing something different, like mistaking a stop sign for a yield sign. This highlights AI's vulnerability but is mainly used in research to enhance security, not misuse personal data.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInPage;
