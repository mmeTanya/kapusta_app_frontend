import s from '../Summary/summary.module.css';
import reportsOperations from 'redux/reports/reportsOperations';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTotalSunByMonthlyExpenses,
  getTotalSunByMonthlyIncome,
} from 'redux/reports/reportsSelectors';
import NumberFormat from 'react-number-format';
export const Summary = ({ year, month }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      reportsOperations.getReportsMonthlyExpenses({
        year,
        month,
      })
    );

    dispatch(
      reportsOperations.getReportsMonthlyIncome({
        year,
        month,
      })
    );
  }, [dispatch, month, year]);

  const monthlyExpenses = useSelector(getTotalSunByMonthlyExpenses);
  const monthlyIncome = useSelector(getTotalSunByMonthlyIncome);

  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        {monthlyExpenses ? (
          <li className={s.listItem}>
            <p className={s.transactionType}>Expenses:</p>
            {
              <NumberFormat
                className={s.expenses}
                allowNegative={false}
                thousandSeparator={' '}
                fixedDecimalScale={'true'}
                decimalScale={'2'}
                value={monthlyExpenses}
                placeholder={'00.00 UAH'}
                displayType={'text'}
                prefix={'- '}
                suffix={' UAH'}
                disabled={true}
              />
            }
          </li>
        ) : (
          <li className={s.listItem}>
            {<div className={s.expenses}> No expenses yet</div>}
          </li>
        )}
        {monthlyIncome ? (
          <li className={s.listItem}>
            <p className={s.transactionType}>Income:</p>
            {
              <NumberFormat
                className={s.income}
                thousandSeparator={' '}
                fixedDecimalScale={'true'}
                decimalScale={'2'}
                value={monthlyIncome}
                placeholder={'00.00 UAH'}
                prefix={'+ '}
                displayType={'text'}
                suffix={' UAH'}
                disabled={true}
              />
            }
          </li>
        ) : (
          <li className={s.listItem}>
            {<div className={s.income}> No income yet</div>}
          </li>
        )}
      </ul>
    </div>
  );
};
