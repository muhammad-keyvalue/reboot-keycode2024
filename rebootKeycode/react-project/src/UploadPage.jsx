import "./UploadPage.css";
import Button from "@mui/material/Button";
import uploadCloud from "./assets/uploadCloud.svg";
import { useState, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';

import AttachFileIcon from '@mui/icons-material/AttachFile';

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const UploadPage = () => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("");

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleCloseIcon = () => {
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    } 
    

  };

  const handleGenerateClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
                <AttachFileIcon className="file-icon" />
                <span className="folder">{fileName}</span>
                <CloseIcon onClick={handleCloseIcon}/>
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
