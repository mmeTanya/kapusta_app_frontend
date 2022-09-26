import { useState } from 'react';
import authOperations from '../../redux/auth/auth-operations';
import { useDispatch } from 'react-redux';
import AuthForm from '../AuthForm/AuthForm';
import s from './AuthComponent.module.css';

export default function AuthComponent() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorsSubmit, setErrorsSubmit] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setErrorsSubmit({ email: '', password: '' });
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };
  // eslint-disable-next-line
  const regexEmail = /^\w([\.-]?\w+)*(\@\w{1,})*(\.\w{2,})$/;
  const errorEmail =
    !regexEmail.test(email) ||
    email.length < 10 ||
    email.length > 63 ||
    email.slice(0, email.indexOf('@')).length < 2;
  const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,63}$/;

  const validateByFormik = values => {
    let errors = {};
    values.email = email;
    values.password = password;
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (
      !regexEmail.test(values.email) ||
      values.email.length < 10 ||
      values.email.length > 63 ||
      values.email.slice(0, values.email.indexOf('@')).length < 2
    ) {
      errors.email = 'Invalid email';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!regexPass.test(values.password)) {
      errors.password =
        'Password must have minimum eight characters, at least  one letter and one number';
    }
    return errors;
  };

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  const handleRegister = e => {
    e.preventDefault();
    if (email === '' && password === '') {
      setErrorsSubmit({ email: 'required', password: 'required' });
      return;
    } else if (email === '' && !regexPass.test(password)) {
      setErrorsSubmit({ email: 'required', password: 'wrong' });
      return;
    } else if (errorEmail && password === '') {
      setErrorsSubmit({ email: 'wrong', password: 'required' });
      return;
    } else if (errorEmail && !regexPass.test(password)) {
      setErrorsSubmit({ email: 'wrong', password: 'wrong' });
      return;
    } else if (email === '') {
      setErrorsSubmit({ email: 'required', password: '' });
      return;
    } else if (errorEmail) {
      setErrorsSubmit({ email: 'wrong', password: '' });
      return;
    } else if (password === '') {
      setErrorsSubmit({ email: '', password: 'required' });
      return;
    } else if (!regexPass.test(password)) {
      setErrorsSubmit({ email: '', password: 'wrong' });
      return;
    }
    dispatch(authOperations.register({ email, password }));
    reset();
  };

  const handleLogin = e => {
    e.preventDefault();
    if (email === '' && password === '') {
      setErrorsSubmit({ email: 'required', password: 'required' });
      return;
    } else if (email === '' && !regexPass.test(password)) {
      setErrorsSubmit({ email: 'required', password: 'wrong' });
      return;
    } else if (errorEmail && password === '') {
      setErrorsSubmit({ email: 'wrong', password: 'required' });
      return;
    } else if (errorEmail && !regexPass.test(password)) {
      setErrorsSubmit({ email: 'wrong', password: 'wrong' });
      return;
    } else if (email === '') {
      setErrorsSubmit({ email: 'required', password: '' });
      return;
    } else if (errorEmail) {
      setErrorsSubmit({ email: 'wrong', password: '' });
      return;
    } else if (password === '') {
      setErrorsSubmit({ email: '', password: 'required' });
      return;
    } else if (!regexPass.test(password)) {
      setErrorsSubmit({ email: '', password: 'wrong' });
      return;
    }
    dispatch(authOperations.logIn({ email, password }));
    reset();
  };

  return (
    <>
      <nav>
        <div className={s.container}>
          <AuthForm
            email={email}
            password={password}
            handleChange={handleChange}
            handleRegister={handleRegister}
            handleLogin={handleLogin}
            validateByFormik={validateByFormik}
            errorsSubmit={errorsSubmit}
          />
        </div>
      </nav>
    </>
  );
}
