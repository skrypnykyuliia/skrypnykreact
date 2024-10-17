import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import { closeModal } from "../../redux/modalSlice";
import styles from "./Modal.module.css";

const ConnectedModal = () => {
  const { t } = useTranslation();
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <Modal className={styles.modal_flex} isOpen={isOpen} onClose={() => dispatch(closeModal())}>
      <h2 className={styles.modalH2}>{t('Congratul')}</h2>
      <p className={`${styles.modalP} ${styles.modal_Par}`}>
        {t('orderSuccessMessage')}
      </p>
      <p className={`${styles.modalP} ${styles.modal_Par}`}>
        {t('orderSuccessMessage1')}
      </p>
    </Modal>
  );
};

export default ConnectedModal;
