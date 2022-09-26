import arrowLeft from '../../images/icons/arrow-left.svg';
import arrowRight from '../../images/icons/arrow-right.svg';
import s from './currentPeriod.module.css';

export const CurrentPeriod = ({
  onPreviousMonth,
  onNextMonth,
  month,
  year,
}) => {
  return (
    <div className={s.container}>
      <p className={s.currentPeriod}>Current period:</p>
      <div className={s.dataWrapper}>
        <button
          type="button"
          className={s.arrowButton}
          onClick={onPreviousMonth}
        >
          <img className={s.img} src={arrowLeft} alt="" />
        </button>
        <div className={s.date}>
          <p className={s.month}>{month}</p>
          <p className={s.year}>{year}</p>
        </div>
        <button type="button" className={s.arrowButton} onClick={onNextMonth}>
          <img className={s.img} src={arrowRight} alt="" />
        </button>
      </div>
    </div>
  );
};
