import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getTransactionsByDate,
  getTransactionsByTypeAndDate,
} from 'redux/transactions/transactionsOperations';
import { useEffect, useState } from 'react';
import s from './HomePage.module.css';
import DatePicker from 'react-datepicker';
import { useMediaQuery } from 'react-responsive';
import 'react-datepicker/dist/react-datepicker.css';
import Balance from '../../modules/balance/components/Balance';
import ReportsLink from '../../modules/reports/components/ReportsLink';
import Container from 'modules/Container';
import IncomeExpense from '../../modules/SecondPage/IncomeExpense/IncomeExpense';
import TransactionTable from '../../modules/SecondPage/TransactionTable/TransactionTable';
import TransactionForm, {
  DatePickerCustomInput,
} from '../../modules/SecondPage/TransactionForm/TransactionForm';
import Summary from '../../modules/SecondPage/Summary/Summary';
import { formatDate } from 'utils/formatDate';
import screenRes from 'utils/mediaConstants';

export default function HomePage() {
  const notMobile = useMediaQuery(screenRes.NOT_MOBILE);
  const isMobile = useMediaQuery(screenRes.IS_MOBILE);

  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [type, setType] = useState('');

  useEffect(() => {
    if (notMobile && location.pathname !== '/home/income') {
      navigation('/home/expenses');
    }
    if (isMobile) {
      setType('expenses-income');
      navigation('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, notMobile]);

  useEffect(() => {
    setDate(new Date());
    if (location.pathname === '/home/expenses') {
      setType('expenses');
    }
    if (location.pathname === '/home/income') {
      setType('income');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (notMobile) {
      if (type === 'expenses' && location.pathname === '/home/expenses') {
        dispatch(
          getTransactionsByTypeAndDate({
            date: formatDate(date),
            type,
          })
        );
      }
      if (type === 'income' && location.pathname === '/home/income') {
        dispatch(
          getTransactionsByTypeAndDate({
            date: formatDate(date),
            type,
          })
        );
      }
    }
    if (isMobile) {
      dispatch(
        getTransactionsByDate({
          date: formatDate(selectedDate),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, dispatch, isMobile, navigation, notMobile, selectedDate, type]);

  return (
    <div className={s.pageWrapper}>
      <div className={s.content}>
        <Container>
          <section>
            <div className={s.c}>
              <div>
                <div className={s.rel}>
                  <h1 className={s.pageName}>Page for Revenue and Expenses</h1>
                  <p className={s.pageName}>
                    Welcome to the best resource for managing budget
                  </p>
                  <div className={s.balanceBlock}>
                    <ReportsLink />
                    <Balance type="home" />
                    {isMobile && (
                      <div className={s.dateWrapper}>
                        <DatePicker
                          dateFormat="dd.MM.yyyy"
                          selected={selectedDate}
                          onChange={date => setSelectedDate(date)}
                          customInput={<DatePickerCustomInput />}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {notMobile ? (
                  <div className={s.buttonCont}>
                    <div className={s.ab}>
                      <IncomeExpense />
                    </div>
                    <div className={s.container}>
                      <TransactionForm
                        date={date}
                        setDate={setDate}
                        type={type}
                      />
                      <div className={s.overlaySummery}>
                        <TransactionTable />
                        <div className={s.summary}>
                          <Summary />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <TransactionTable />
                )}
              </div>
            </div>
          </section>

          <div className={s.sammaryTablet}>
            <Summary />
          </div>
        </Container>
      </div>
      {isMobile && (
        <div className={s.buttonCont}>
          <IncomeExpense />
        </div>
      )}
    </div>
  );
}
