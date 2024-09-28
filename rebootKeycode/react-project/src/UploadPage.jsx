import "./UploadPage.css";
import Button from "@mui/material/Button";
import uploadCloud from "./assets/uploadCloud.svg";
import { useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const [filePreview, setFilePreview] = useState(null);
  const navigate = useNavigate();

  const handleImageClick = () => {
    fileInputRef.current.click();
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
      console.log("yes")
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
          const pollResponse = await axios.get("http://localhost:3000/files/processedData/sample.jpeg");
          if (pollResponse.statusText === "OK" && pollResponse.data.length !== 0) {
            console.log("Image file received:", pollResponse.data);
            setTimeout(() => {
              setLoading(false);
              navigate('/result', { state: { data: pollResponse.data } });
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
    <div className="landing-container">
      <div className="image-container">
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
                color: "#65558F",
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
            {fileName && (
              <div className="file-info">
                <img src={filePreview} className="uploaded-image"/>
                <span className="folder">{fileName}</span>
                <CloseIcon onClick={handleCloseIcon} />
              </div>
            )}
          </>
        )}
        <div className="drag-drop">
          {loading ? "Processing" : "Drag & Drop | Choose File"}
        </div>
      </div>
      <div className="button-container">
        <Button
          variant="contained"
          onClick={handleGenerateClick}
          style={{
            borderRadius: "30px",
            backgroundColor: "#74818F",
            color: " #343D47",
            width: "700px",
            fontWeight: "400",
            fontSize: "20px",
            textTransform: "none",
          }}
          disabled={loading}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

export default UploadPage;
