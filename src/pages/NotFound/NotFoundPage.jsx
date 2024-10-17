import React, { useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imgDog from "../../assets/images/mage.png";
import img4 from "../../assets/svg/4.svg";
import styles from "./NotFound.module.css";
import ThemeContext from "../../ThemeContext";

const theme = createTheme();

function NotFoundPage() {
  const { t } = useTranslation();
  const { theme: currentTheme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <div className={`${styles.notFound} ${currentTheme}`}>
        <Container sx={{ textAlign: "center", p: 5, fontFamily: "Montserrat" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-block",
                width: 200,
                height: 200,
                backgroundImage: `url(${img4})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            />
            <Box
              component="span"
              sx={{
                display: "inline-block",
                width: 300,
                height: 300,
                backgroundImage: `url(${imgDog})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            />
            <Box
              component="span"
              sx={{
                display: "inline-block",
                width: 200,
                height: 200,
                backgroundImage: `url(${img4})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: 24, sm: 36, md: 48, lg: 60 },
              fontFamily: "Montserrat",
              color: currentTheme === "dark" ? "#ffffff" : "#282828",
            }}
          >
            {t("pageNotFound")}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              fontFamily: "Montserrat",
              maxWidth: "600px",
              m: "0 auto",
              fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
              color: currentTheme === "dark" ? "#bfbfbf" : "#8b8b8b",
            }}
          >
            {t("pageNotFoundMessage")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{
              mt: 3,
              padding: "8px 40px",
              backgroundColor: "#0d50ff",
              fontFamily: "Montserrat",
            }}
          >
            {t("goHome")}
          </Button>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default NotFoundPage;
