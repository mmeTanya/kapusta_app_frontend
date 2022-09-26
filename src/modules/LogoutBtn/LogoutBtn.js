import s from './LogoutBtn.module.css';
import logoutIcon from '../../images/icons/logout.svg';
import Modal from '../Modal/Modal';
import React, { useEffect, useState } from 'react';

import { authSelectors } from 'redux/auth';

import authOperations from '../../redux/auth/auth-operations';

import { useDispatch, useSelector } from 'react-redux';

const LogoutBtn = () => {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const dispatch = useDispatch();

  const email = useSelector(authSelectors.getUserEmail);

  useEffect(() => {
    if (email) {
      const name = email[0].toUpperCase() + email.slice(1).split('@')[0];
      setUserName(name);
      setUserEmail(email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutBtn = () => {
    dispatch(authOperations.logOut());
  };

  return (
    <div className={s.container}>
      {showModal && (
        <Modal
          onDeny={() => {
            setShowModal(false);
          }}
          handleAgreeButtonClick={logoutBtn}
          question="Are you sure you want to exit?"
        />
      )}
      <span className={s.avatar}>{userEmail[0]}</span>

      <p className={s.name}>{userName}</p>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className={s.btn}
        type="button"
      >
        <span className={s.logout}>Exit</span>
        <img src={logoutIcon} alt="logout button" className={s.logoutIcon} />
      </button>
    </div>
  );
};

export { LogoutBtn };
