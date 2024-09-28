import "./resultPage.css";
import { Card, Typography, Grid } from "@mui/material";
import DownloadIcon from "./assets/Download.svg";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import logo from "./assets/logo.svg";

import crown from "./assets/premium-service.png";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import profile from "./assets/profile.png";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const count = data.length;

  const getCardWidth = () => {
    if (count === 1) return 6;
    if (count === 2) return 6;
    return 4;
  };

  const projName = ["Siamese cat","Hamster","West Highland white terrier"]

  const handlePricingButtonClick = () => {
    navigate("/pricing");
  };

  const getColor = (value) => {
    if (value == 17.8) return "#3A6D8C";
    if (value === 20) return "#57A10C";
    return "#57A10C";
  };

  const handleDownloadClick = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = url.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <div className="result-container">
      <div className="header-container">
        <div className="user-header">
          <img src={logo} alt="logo" className="logo" />
          <div className="logo-text">
            <div className="logo-text1">Convince-AI</div>
            <div className="logo-text2">Redefining Image Privacy for the AI Age</div>
          </div>
        </div>
        <div className="user-homepage-button-container2">
          <div className="profile-section">
          <div className="user-name">Roy Mathew</div>
            <Button
              variant="contained"
              onClick={handlePricingButtonClick}
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
               <img
                src={crown}
                style={{
                  width: "22px",
                  paddingRight: "10px",
                  paddingBottom: "4px",
                }}
                alt="premium icon"
              />
              Upgrade
            </Button>
          </div>
          <div className="profile-image">
            <img src={profile} alt="profile image" className="profile-image-icon" />
          </div>
        </div>
      </div>
      <div className="result-cards">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ padding: 2 }}
        >
          {Array.from({ length: count }).map((_, index) => (
            <Grid
              item
              xs={12}
              sm={getCardWidth()}
              md={getCardWidth()}
              key={index}
            >
              <Card
                className="result-card"
                variant="outlined"
                sx={{
                  height: "600px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  borderRadius: "30px",
                  background: "#74818FF0",
                }}
              >
                <Typography variant="h6" align="center" sx={{ color: "white" }}>
                  <div className="card-content">
                    <div className="card-image">
                      <CardMedia
                        component="img"
                        height="350"
                        image={data[index].url}
                        alt={`Card ${index + 1}`}
                        sx={{ width: "80%", objectFit: "contain" }}
                      />
                    </div>
                    <div className="detection-text">{index === 0 ?"Original Image: ": "Detected As: " }<span>{projName[index]}</span> </div> 
                    <div className="linear-progress">
                      <LinearProgress
                        variant="determinate"
                        value={data[index].detectionRate}
                        sx={{
                          marginTop: 2,
                          height: 20,
                          borderRadius: 5,
                          [`& .${linearProgressClasses.bar}`]: {
                            borderRadius: 5,
                            backgroundColor: getColor(
                              data[index].detectionRate
                            ),
                          },
                        }}
                      />
                    </div>
                    <div
                      className="downloadIcon"
                      onClick={() => handleDownloadClick(data[index].url)}
                    >
                      <img src={DownloadIcon} alt="download icon" className="icon" />
                    </div>
                  </div>
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ResultPage;
