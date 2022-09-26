import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import { useEffect } from 'react';
import { Button } from '../Buttons/Button';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onDeny, handleAgreeButtonClick, question }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onDeny();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onDeny();
    }
  };

  const handleButtonClick = () => {
    handleAgreeButtonClick();
    onDeny();
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <span className={s.modalClose} onClick={onDeny}>
          &#10005;
        </span>
        <div className={s.ModalContainer}>
          <div className={s.ModalItems}>
            <p className={s.Question}>{question} </p>
          </div>

          <ul className={s.ModalContainerBtn}>
            <li className={s.ModalBtn}>
              <Button type="exit" text="Yes" onClick={handleButtonClick} />
            </li>
            <li>
              <Button type="exit" text="No" onClick={handleBackdropClick} />
            </li>
          </ul>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
