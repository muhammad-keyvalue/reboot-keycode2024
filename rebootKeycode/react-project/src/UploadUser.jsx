import "./UploadPage.css";
import Button from "@mui/material/Button";
import uploadCloud from "./assets/uploadCloud.svg";
import { useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import profile from "./assets/profile.png";
import crown from "./assets/premium-service.png";
import { CardMedia } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import logo from "./assets/logo.svg";

const UploadUser = () => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const [filePreview, setFilePreview] = useState(null);
  const navigate = useNavigate();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handlePricingButtonClick = () => {
    navigate("/pricing");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleCloseIcon = () => {
    setFileName("");
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGenerateClick = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const uuid = uuidv4();

    try {
      console.log("yes");
      const response = await axios.post(
        `http://localhost:3000/files/upload/${uuid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);

      const pollForImage = async () => {
        try {
          const pollResponse = await axios.get(
            `http://localhost:3000/files/processedData/${fileName}`
          );
          if (
            pollResponse.statusText === "OK" &&
            pollResponse.data.length !== 0
          ) {
            console.log("Image file received:", pollResponse.data);
            setTimeout(() => {
              setLoading(false);
              navigate("/result", { state: { data: pollResponse.data } });
            }, 1000);
            return;
          }
        } catch (error) {
          console.error("Error polling for image file:", error);
        }
        setTimeout(pollForImage, 3000); // Poll every 3 seconds
      };

      // Start polling
      pollForImage();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="user-landing-container">
      <div className="header-container">
        <div className="user-header">
          <img src={logo} alt="logo" className="logo" />
          <div className="logo-text">
            <div className="logo-text1">Convince-AI</div>
            <div className="logo-text2">Redefining Image Privacy for the AI Age </div>
          </div>
        </div>
        <div className="user-homepage-button-container2">
          <div className="profile-section">
            <div className="user-name">Roy Mathew</div>
            <Button
              variant="contained"
              onClick={handlePricingButtonClick }
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
            <img
              src={profile}
              alt="profile image"
              className="profile-image-icon"
            />
          </div>
        </div>
      </div>
      <div
        className="image-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {loading ? (
          <Box sx={{ position: "relative" }}>
            <CircularProgress
              className="upload"
              sx={{
                color: "white",
              }}
              size={200}
              thickness={2}
              value={100}
              variant="determinate"
            />
            <CircularProgress
              className="upload"
              sx={{
                color: "#161D6F",
                left: 0,
                position: "absolute",
              }}
              size={200}
              thickness={2}
              value={100}
              variant="indeterminate"
              disableShrink
            />
          </Box>
        ) : (
          <>
            {fileName ? (
              <div className="file-card-container">
                <Card
                  sx={{
                    width: 300,
                    height: 300,
                    marginTop: 2,
                    backgroundColor: "rgba(22, 29, 111, 0.5)", // Transparent background
                    color: "white",
                    position: "relative"
                  }}
                >
                   <IconButton
                      aria-label="close"
                      onClick={handleCloseIcon}
                      sx={{ color: "white", paddingLeft: "250px" }}
                    >
                      <CloseIcon />
                    </IconButton>
                  <CardMedia
                    component="img"
                   sx={{
                    height: "200px",
                    weight: "100%",
                    objectFit: "contain",
                    objectPosition: "center"
                   }}
                    image={filePreview}
                    alt="uploaded preview"
                    className="uploaded-image"
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{fontSize: "12px", textAlign:"center"}}>
                      {fileName}
                    </Typography>
                   
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                <img
                  src={uploadCloud}
                  alt="upload image"
                  className="upload"
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </>
            )}
          </>
        )}
        <div className="user-drag-drop">
          {loading ? "Processing" : "Drag & Drop | Choose File"}
        </div>
      </div>

      <div className="button-container">
        <Button
          variant="contained"
          onClick={handleGenerateClick}
          sx={{
            borderRadius: "30px",
            marginBottom: "20px",
            backgroundColor: "#74818F",
            color: "#",
            width: "400px",
            fontWeight: "400",
            fontSize: "20px",
            textTransform: "none",
            transition: "outline 0.8 ease",
            border: "1px solid white",
            "&:hover": {
              outline: "8px solid rgba(116, 129, 143, 0.5)", // Add red outline on hover
            },
          }}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

export default UploadUser;
