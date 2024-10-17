import React from "react";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <TextField
      type="text"
      value={quantity}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: "10px",
          height: {
            xs: 40,
            sm: 50,
            md: 60,
          },
          margin: 0,
        },
        margin: 0,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              onClick={onDecrease}
              sx={{
                borderRight: "1px solid #dddddd",
                borderRadius: "10px",
                marginRight: "-1px",
                height: {
                  xs: 40,
                  sm: 50,
                  md: 60,
                },
                width: {
                  xs: 40,
                  sm: 50,
                  md: 60,
                },
              }}
            >
              <Remove />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={onIncrease}
              sx={{
                // fontSize: {
                //   xs: "16px", 
                //   sm: "18px",
                //   md: "10px",
                // },
                borderLeft: "1px solid #dddddd",
                borderRadius: "10px 0 0 10px",
                height: {
                  xs: 40,
                  sm: 50,
                  md: 60,
                },
                width: {
                  xs: 40,
                  sm: 50,
                  md: 60,
                },
              }}
            >
              <Add />
            </IconButton>
          </InputAdornment>
        ),
        inputProps: {
          readOnly: true,
          style: {
            fontSize: {
              xs: "16px",
              sm: "18px",
              md: "20px",
            },
            fontWeight: 600,
            lineHeight: "26px",
            textAlign: "center",
          },
        },
      }}
      variant="outlined"
    />
  );
}

export default QuantitySelector;
