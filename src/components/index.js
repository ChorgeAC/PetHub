import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import axios from "axios";
import "./index.css";
import Header from "./Header";

let dogUrl = "https://dog.ceo/api/breeds/image/random";

const Index = () => {
  const [dog, setDog] = useState("");

  const getDogImages = async () => {
    try {
      const { data } = await axios.get(dogUrl);
      setDog(data.message);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getDogImages();
  }, []);

  return (
    <>
      <Header />
      <Typography variant="h3">Random Dog</Typography>
      <Box className="dogContainer">
        <img src={dog} alt="dog" />
      </Box>
      <Button variant="contained" onClick={getDogImages}>
        Click Me
      </Button>
    </>
  );
};

export default Index;
