import { Formik, Form } from 'formik';
import { Button } from '../Buttons/Button';
import s from './AuthForm.module.css';
import google from '../../images/icons/google.svg';

export default function AuthForm({
  email,
  password,
  handleChange,
  handleRegister,
  handleLogin,
  validateByFormik,
  errorsSubmit,
}) {
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={validateByFormik}
      >
        {formik => {
          const { errors, touched, handleBlur } = formik;
          return (
            <Form className={s.form}>
              <h2 className={s.form__title_first}>
                You can log in with your Google Account:
              </h2>
              <a
                className={s.googleImage__background}
                href={`${process.env.REACT_APP_BASE_API_URL}/auth/google`}
              >
                <img className={s.googleImage} src={google} alt="google" />
              </a>
              <h3 className={s.form__title}>
                Or log in using an email and password, after registering:
              </h3>
              <div className={s.form_field}>
                <label className={s.form__label} htmlFor="email">
                  Email:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="your@email.com"
                  className={
                    (errors.email && touched.email) ||
                    errorsSubmit.email !== '' ||
                    errorsSubmit.password !== ''
                      ? s.form__input_error
                      : s.form__input
                  }
                />
                {errors.email &&
                  touched.email &&
                  errorsSubmit.email === '' &&
                  errorsSubmit.password === '' && (
                    <span className={s.form__error}>{errors.email}</span>
                  )}
                {errorsSubmit.email === 'required' && (
                  <span className={s.form__error}>Email is required</span>
                )}
                {errorsSubmit.email === 'wrong' && (
                  <span className={s.form__error}>Invalid email</span>
                )}
              </div>

              <div className={s.form_field}>
                <label className={s.form__label} htmlFor="password">
                  Password:
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  className={
                    (errors.password && touched.password) ||
                    errorsSubmit.email !== '' ||
                    errorsSubmit.password !== ''
                      ? s.form__input_error
                      : s.form__input
                  }
                />
                {errors.password &&
                  touched.password &&
                  errorsSubmit.email === '' &&
                  errorsSubmit.password === '' && (
                    <span className={s.form__error}>{errors.password}</span>
                  )}
                {errorsSubmit.password === 'required' && (
                  <span className={s.form__error}>Password is required</span>
                )}
                {errorsSubmit.password === 'wrong' && (
                  <span className={s.form__error}>
                    Password must have minimum eight characters, at least one
                    letter and one number
                  </span>
                )}
              </div>
              <ul className={s.form__list}>
                <li className={s.form__item}>
                  <Button text={'Log in'} type="submit" onClick={handleLogin} />
                </li>
                <li className={s.form__item}>
                  <Button
                    text={'Registration'}
                    type="submit"
                    onClick={handleRegister}
                  />
                </li>
              </ul>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
