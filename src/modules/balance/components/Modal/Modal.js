import s from './Modal.module.css';

export default function Modal() {
  return (
    <div className={s.common}>
      <h3>Hello! To get started, enter the current balance of your account!</h3>
      <p className={s.text}>You can't spend money until you have it :)</p>
      <div className={s.triangleUp}></div>
    </div>
  );
}
