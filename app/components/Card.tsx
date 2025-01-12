import React from "react";
import { StaticImageData } from "next/image";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

type CardProps = {
  className: string;
  img: StaticImageData; // Static image data (from Next.js)
  title: string; // Title to display on the card
  onClick?: () => void; // Function to execute when card is clicked
};

export default function GameCard(props: CardProps): React.JSX.Element {
  return (
    <Box
      className={props.className}
      sx={{
        display: "inline-block",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out", // Smooth transition for the effect
        "&:hover": {
          boxShadow: 3, // Adds shadow when the card is hovered
          transform: "scale(1.05)" // Slight zoom effect
        }
      }}
      onClick={props.onClick}
    >
      <Card sx={{ maxWidth: 345 }}>
        {/* Image part */}
        <CardMedia
          component="img"
          alt={props.title}
          height="140"
          image={props.img.src} // Use the image source from StaticImageData
        />

        {/* Title part */}
        <CardContent>
          <Typography variant="h6" component="div">
            {props.title}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
