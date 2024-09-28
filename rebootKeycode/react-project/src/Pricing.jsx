import "./UploadPage.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import logo from "./assets/logo.svg";
import StarIcon from "@mui/icons-material/Star";

const Pricing = () => {
  const navigate = useNavigate();

  const handleLoginInButtonClick = () => {
    navigate("/loginIn");
  };

  const handleFreeButtonClick = () => {
    navigate("/upload");
  };

  return (
    <div className="user-landing-container">
      <div className="header-container">
        <div className="user-header">
          <img src={logo} alt="logo" className="logo" />
          <div className="logo-text">
            <div className="logo-text1">Convince-AI</div>
            <div className="logo-text2">
              Redefining Image Privacy for the AI Age{" "}
            </div>
          </div>
        </div>
        <div className="user-homepage-button-container2">
          <div className="profile-section">
            <Button
              variant="contained"
              onClick={handleFreeButtonClick}
              sx={{
                marginBottom: "10px",
                marginLeft: "600px",
                borderRadius: "30px",
                backgroundColor: "#74818F",
                color: "white",
                width: "210px",
                fontWeight: "400",
                fontSize: "20px",
                textTransform: "none",
                transition: "outline 0.8 ease",
                "&:hover": {
                  outline: "8px solid rgba(116, 129, 143, 0.5)", // Add red outline on hover
                },
              }}
            >
              Try Free
            </Button>
            <Button
              variant="contained"
              onClick={handleLoginInButtonClick}
              sx={{
                marginLeft: "600px",
                borderRadius: "30px",
                backgroundColor: "#74818F",
                color: "white",
                width: "210px",
                fontWeight: "400",
                fontSize: "20px",
                textTransform: "none",
                transition: "outline 0.8 ease",
                "&:hover": {
                  outline: "8px solid rgba(116, 129, 143, 0.5)", // Add red outline on hover
                },
              }}
            >
              SignIn
            </Button>
          </div>
        </div>
      </div>
      <div className="pricing-card-container">
        <Grid
          container
          spacing={3}
          justifyContent="center"
          style={{ marginTop: "10px" }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card
              variant="outlined"
              sx={{
                height: "550px",
                width: "500px",
                paddingTop: "20px",
                paddingBottom: "20px",
                borderRadius: "30px",
                background: "#74818FF0",
              }}
            >
              <CardContent className="pricing-content">
                <StarIcon sx={{ fontSize: 50, color: "#FDCC0D" }} />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: "white",
                    fontSize: "40px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  Free
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    fontSize: "30px",
                    width: "400px",
                    textAlign: "center",
                    borderRadius: "20px",
                    border: "2px solid #161D6F",
                    background: "rgba(22,29,111,0.1)",
                  }}
                >
                  $0 /month
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontSize: "17px" }}
                >
                  <ul>
                    <li>25 image generations</li>
                    <li>Output quality limited to 244px</li>
                    <li>Email support</li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              variant="outlined"
              sx={{
                height: "550px",
                paddingTop: "20px",
                width: "500px",
                paddingBottom: "20px",
                borderRadius: "30px",
                background: "#74818FF0",
                border: "1px solid white",
              }}
            >
              <CardContent className="pricing-content">
                <div>
                  <StarIcon sx={{ fontSize: 50, color: "#FDCC0D" }} />
                  <StarIcon sx={{ fontSize: 50, color: "#FDCC0D" }} />
                </div>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: "white",
                    fontSize: "40px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  Pro Plan
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    fontSize: "30px",
                    width: "400px",
                    textAlign: "center",
                    borderRadius: "20px",
                    background: "#161D6F",
                  }}
                >
                  $149.99 /month
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontSize: "17px" }}
                >
                  <ul>
                    <li>Up-to 5000 image generations per month</li>
                    <li>Retain original image quality</li>
                    <li>High-speed generation processing</li>
                    <li>24*7 chat support</li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              variant="outlined"
              sx={{
                height: "550px",
                paddingTop: "20px",
                width: "500px",
                paddingBottom: "20px",
                borderRadius: "30px",
                background: "#74818FF0",
              }}
            >
              <CardContent className="pricing-content">
                <div>
                  <StarIcon sx={{ fontSize: 50, color: "#FDCC0D" }} />
                  <StarIcon sx={{ fontSize: 50, color: "#FDCC0D" }} />
                  <StarIcon sx={{ fontSize: 50, color: "#FDCC0D" }} />
                </div>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: "white",
                    fontSize: "40px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  Enterprise Plan
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    fontSize: "30px",
                    width: "400px",
                    textAlign: "center",
                    borderRadius: "20px",
                    border: "2px solid #161D6F",
                    background: "rgba(22,29,111,0.1)",
                  }}
                >
                  Custom Pricing
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontSize: "17px" }}
                >
                  <ul>
                    <li>Up-to 50000 image generations per month</li>
                    <li>Encrypted file storage system</li>
                    <li>API access for seamless integration</li>
                    <li>Up-to-date data protection</li>
                    <li>Dedicated customer support (24/7 priority support)</li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Pricing;
