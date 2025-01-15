"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2 as Grid,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography
} from "@mui/material";

type ButtonVariant = "contained" | "outlined" | "text";
type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

const buttonVariants: ButtonVariant[] = ["contained", "outlined", "text"];
const buttonColors: ButtonColor[] = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error"
];

export default function Page() {
  return (
    <div>
      <h1>Components Showcase</h1>

      {/* Button Section */}
      <section>
        <Typography variant="h2">Button Types</Typography>
        <Grid container spacing={2}>
          {buttonColors.map((color: ButtonColor) => (
            <Grid size={4} key={color}>
              <Typography variant="h5">
                {color.charAt(0).toUpperCase() + color.slice(1)} Buttons
              </Typography>
              <Container>
                {[false, true].map((disabled) => {
                  return (
                    <Box key={disabled.toString()}>
                      {buttonVariants.map((variant: ButtonVariant) => (
                        <Box key={variant}>
                          <Button
                            color={color}
                            variant={variant}
                            disabled={disabled}
                          >
                            {variant.charAt(0).toUpperCase() + variant.slice(1)}{" "}
                            Button
                          </Button>
                        </Box>
                      ))}
                    </Box>
                  );
                })}
              </Container>
            </Grid>
          ))}
        </Grid>
      </section>

      {/* TextField Section */}
      <section>
        <h2>Text Fields</h2>
        <div>
          <div>
            <TextField label="Standard" variant="standard" fullWidth />
            <TextField label="Outlined" variant="outlined" fullWidth />
            <TextField label="Filled" variant="filled" fullWidth />
          </div>
        </div>
      </section>

      {/* Checkbox Section */}
      <section>
        <h2>Checkboxes</h2>
        <div>
          <FormControlLabel control={<Checkbox />} label="Checkbox 1" />
          <FormControlLabel control={<Checkbox />} label="Checkbox 2" />
          <FormControlLabel control={<Checkbox />} label="Checkbox 3" />
        </div>
      </section>

      {/* Radio Button Section */}
      <section>
        <h2>Radio Buttons</h2>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Choose One</FormLabel>
            <RadioGroup>
              <FormControlLabel
                value="option1"
                control={<Radio />}
                label="Option 1"
              />
              <FormControlLabel
                value="option2"
                control={<Radio />}
                label="Option 2"
              />
              <FormControlLabel
                value="option3"
                control={<Radio />}
                label="Option 3"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </section>

      {/* Switch Section */}
      <section>
        <h2>Switches</h2>
        <div>
          <FormControlLabel control={<Switch />} label="Switch 1" />
          <FormControlLabel control={<Switch />} label="Switch 2" />
          <FormControlLabel control={<Switch />} label="Switch 3" />
        </div>
      </section>

      {/* Typography Section */}
      <section>
        <h2>Typography</h2>
        <div>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="body1">Body 1 Text</Typography>
          <Typography variant="body2">Body 2 Text</Typography>
          <Typography variant="caption">Caption Text</Typography>
        </div>
      </section>
    </div>
  );
}
