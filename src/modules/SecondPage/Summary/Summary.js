import s from './Summary.module.css';
import { useSelector, useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import { ARRAY_OF_MONTHS } from 'utils/arrayOfMonth';
import { useParams } from 'react-router-dom';
import reportsOperations from 'redux/reports/reportsOperations';
import { useEffect } from 'react';
import { getTransactions } from 'redux/transactions/transactionsSelectors';

function Summary() {
  const dispatch = useDispatch();
  const transaction = useSelector(getTransactions);

  useEffect(() => {
    dispatch(reportsOperations.getReportsMonthlyExpenses({ limit: 6 }));
    dispatch(reportsOperations.getReportsMonthlyIncome({ limit: 6 }));
  }, [dispatch, transaction.length]);
  const date = new Date();
  const year = date.getFullYear();
  const { type } = useParams();

  const getReportsMonthlyExpenses = useSelector(
    state => state.reports.monthExpenses
  );
  const getReportsMonthlyIncome = useSelector(
    state => state.reports.monthIncome
  );
  return (
    <div className={s.container}>
      <p className={s.title}> Summary</p>
      {type === 'expenses' && (
        <ul className={s.list}>
          {getReportsMonthlyExpenses &&
            getReportsMonthlyExpenses
              .filter(
                getReportsMonthlyExpenses =>
                  getReportsMonthlyExpenses.date.split('-')[0] ===
                  year.toString()
              )
              .map(getReportsMonthlyExpenses => (
                <li className={s.item} key={getReportsMonthlyExpenses._id}>
                  <p>
                    {
                      ARRAY_OF_MONTHS[
                        parseInt(
                          10,
                          getReportsMonthlyExpenses.date.split('-')[1]
                        ) - 1
                      ]
                    }
                  </p>
                  <NumberFormat
                    className={s.expenses}
                    allowNegative={false}
                    thousandSeparator={' '}
                    fixedDecimalScale={'true'}
                    decimalScale={'2'}
                    value={getReportsMonthlyExpenses.totalSum}
                    displayType={'text'}
                    disabled={true}
                  ></NumberFormat>
                </li>
              ))}
        </ul>
      )}
      {type === 'income' && (
        <ul className={s.list}>
          {getReportsMonthlyIncome &&
            getReportsMonthlyIncome
              .filter(
                getReportsMonthlyIncome =>
                  getReportsMonthlyIncome.date.split('-')[0] === year.toString()
              )
              .map(getReportsMonthlyIncome => (
                <li className={s.item} key={getReportsMonthlyIncome._id}>
                  <p>
                    {
                      ARRAY_OF_MONTHS[
                        parseInt(
                          10,
                          getReportsMonthlyIncome.date.split('-')[1]
                        ) - 1
                      ]
                    }
                  </p>
                  <NumberFormat
                    className={s.expenses}
                    allowNegative={false}
                    thousandSeparator={' '}
                    fixedDecimalScale={'true'}
                    decimalScale={'2'}
                    value={getReportsMonthlyIncome.totalSum}
                    displayType={'text'}
                    disabled={true}
                  ></NumberFormat>
                </li>
              ))}
        </ul>
      )}
    </div>
  );
}

export default Summary;
