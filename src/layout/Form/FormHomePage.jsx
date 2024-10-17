import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../api";

import "./FormHomePage.css";

function FormHomePage() {
  const { t, i18n } = useTranslation();
  const [buttonState, setButtonState] = useState({ disabled: false, text: t('getDiscount'), className: "button-style btn" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setButtonState(prevState => ({
      ...prevState,
      text: prevState.disabled ? t('requestSubmitted') : t('getDiscount')
    }));
  }, [i18n.language, t]);

  const onSubmit = async (data) => {
    setButtonState({ disabled: true, text: t('requestSubmitted'), className: "button-style btn btn-blue" });

    try {
      console.log("Data to be sent:", data);
      const response = await axios.post(`${API_URL}/sale/send`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setButtonState({ disabled: false, text: t('getDiscount'), className: "button-style btn" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <div style={styles.inputContainer}>
        <input
          {...register("name", { required: true })}
          placeholder={t('name')}
          className="input-placeholder"
          style={styles.input}
        />
        {errors.name && (
          <span style={styles.error}>{t('nameError')}</span>
        )}
      </div>

      <div style={styles.inputContainer}>
        <input
          {...register("phone", { required: true, pattern: /^[0-9]/ })}
          placeholder={t('phoneNumber')}
          className="input-placeholder"
          style={styles.input}
        />
        {errors.phone && <span style={styles.error}>{t('phoneError')}</span>}
      </div>

      <div style={styles.inputContainer}>
        <input
          {...register("email", {
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          })}
          placeholder={t('email')}
          className="input-placeholder"
          style={styles.input}
        />
        {errors.email && <span style={styles.error}>{t('emailError')}</span>}
      </div>

      <button
        type="submit"
        className={buttonState.className}
        disabled={buttonState.disabled}
      >
        {buttonState.text}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    margin: "0 auto",
    padding: "1rem",
    backgroundColor: "transparent",
    borderRadius: "8px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "16px 32px",
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    fontSize: "20px",
    backgroundColor: "transparent",
    color: "#fff",
  },
  button: {
    padding: "16px 32px",
    backgroundColor: "#fff",
    color: "#282828",
    border: "none",
    borderRadius: "4px",
    fontSize: "20px",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
};

export default FormHomePage;
