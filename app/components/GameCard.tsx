import React from "react";
import { StaticImageData } from "next/image";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

type CardProps = {
  className?: string;
  img: StaticImageData; // Static image data (from Next.js)
  title: string; // Title to display on the card
  onClick?: () => void; // Function to execute when card is clicked
};

export default function GameCard(props: CardProps): React.JSX.Element {
  return (
    <Box
      className={props.className}
      sx={{
        display: "inline-block"
      }}
      onClick={props.onClick}
    >
      <Card
        sx={{
          transition: "all 0.3s ease-in-out",
          maxWidth: 320,
          cursor: "pointer",
          "&:hover": {
            boxShadow: 3,
            transform: "scale(1.05)"
          }
        }}
      >
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
