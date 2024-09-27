import "./resultPage.css";
import { Card, Typography, Grid } from "@mui/material";
import DownloadIcon from "./assets/Download.svg";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import CardMedia from "@mui/material/CardMedia";

const ResultPage = () => {
  const count = 3;

  const images = [
    "https://img.freepik.com/premium-vector/dog-silhouette-white-background_566661-3322.jpg",
    "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    "https://media.istockphoto.com/id/1014072986/vector/running-dog-silhouette-in-black-color-vector.jpg?s=612x612&w=0&k=20&c=hy04KurTViudxhc3yJxd7Ii2zAt1efB4U5EzViBhrmA=",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  const progressValues = [
    { value1: 30, value2: 50, value3: 30 },
    { value1: 40, value2: 60, value3: 80 },
    { value1: 90, value2: 20, value3: 40 },
    { value1: 60, value2: 80, value3: 100 },
    { value1: 70, value2: 90, value3: 100 },
  ];

  const getCardWidth = () => {
    if (count === 1) return 6;
    if (count === 2) return 6;
    return 4;
  };

  const getColor = (value) => {
    if (value > 50) return "#57A10C";
    if (value == 50) return "#C6C036";
    return "#C63636";
  };

  return (
    <div className="result-container">
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
                height: "700px",
                paddingTop: "20px",
                paddingBottom: "20px",
                borderRadius: "30px",
                background: "#74818FF0",
              }}
            >
              <Typography variant="h6" align="center">
                Card {index + 1}
                <div className="card-content">
                  <div className="card-image">
                    <CardMedia
                      component="img"
                      height="350"
                      image={images[index]}
                      alt={`Card ${index + 1}`}
                      sx={{ width: '80%', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="linear-progress">
                    <LinearProgress
                      variant="determinate"
                      value={progressValues[index].value1}
                      sx={{
                        marginTop: 2,
                        height: 20,
                        borderRadius: 5,
                        [`& .${linearProgressClasses.bar}`]: {
                          borderRadius: 5,
                          backgroundColor: getColor(
                            progressValues[index].value1
                          ),
                        },
                      }}
                    />
                    <LinearProgress
                      variant="determinate"
                      value={progressValues[index].value2}
                      sx={{
                        marginTop: 2,
                        height: 20,
                        borderRadius: 5,
                        [`& .${linearProgressClasses.bar}`]: {
                          borderRadius: 5,
                          backgroundColor: getColor(
                            progressValues[index].value2
                          ),
                        },
                      }}
                    />
                    <LinearProgress
                      variant="determinate"
                      value={progressValues[index].value3}
                      sx={{
                        marginTop: 2,
                        height: 20,
                        borderRadius: 5,
                        [`& .${linearProgressClasses.bar}`]: {
                          borderRadius: 5,
                          backgroundColor: getColor(
                            progressValues[index].value3
                          ),
                        },
                      }}
                    />
                  </div>
                  <div className="downloadIcon">
                    <img src={DownloadIcon} alt="download icon" />
                  </div>
                </div>
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ResultPage;
