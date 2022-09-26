import { Outlet, useNavigate } from 'react-router-dom';
import { Summary } from '../../modules/Summary/Summary';
import s from './ReportPage.module.css';
import { ButtonGoMain } from 'modules/Buttons/ButtonGoMain';
import Balance from 'modules/balance/components/Balance';
import Categories from './Categories';
import { CurrentPeriod } from '../../modules/CurrentPeriod/CurrentPeriod.jsx';
import { useEffect, useState } from 'react';
import Container from 'modules/Container';
import { useDispatch, useSelector } from 'react-redux';
import reportsOperations from 'redux/reports/reportsOperations';
import { setReportsDate } from 'redux/reports/reportsSlice';
import { getIsRefreshingReportsFull } from 'redux/reports/reportsSelectors';
import { ARRAY_OF_MONTHS } from 'utils/arrayOfMonth';

const QUERY_PARAMS = {}; //{year:2022, month:9, limit: 10 };
const SetQueryParams = (year, month, limit) => {
  if (year) QUERY_PARAMS.year = year;
  if (month) QUERY_PARAMS.month = month;
  if (limit) QUERY_PARAMS.limit = limit;
};
export default function ReportPage() {
  const date = new Date();
  let currentYear = date.getFullYear();
  let currentMonth = ARRAY_OF_MONTHS[date.getMonth()];
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const navigate = useNavigate();
  const isRefreshing = useSelector(getIsRefreshingReportsFull);

  const dispatch = useDispatch();

  const onPreviousMonth = () => {
    navigate('/reports');
    if (ARRAY_OF_MONTHS.indexOf(month) < 1) {
      setYear(year - 1);
    }
    if (
      ARRAY_OF_MONTHS.indexOf(month) === -1 ||
      ARRAY_OF_MONTHS.indexOf(month) === 0
    ) {
      dispatch(
        setReportsDate({ year, month: ARRAY_OF_MONTHS.indexOf(month) + 12 })
      );

      SetQueryParams(year, ARRAY_OF_MONTHS.indexOf(month) + 12);
      dispatch(reportsOperations.getReportsFull(QUERY_PARAMS));
      return setMonth(ARRAY_OF_MONTHS[11]);
    }
    dispatch(setReportsDate({ year, month: ARRAY_OF_MONTHS.indexOf(month) }));
    SetQueryParams(year, ARRAY_OF_MONTHS.indexOf(month));
    dispatch(reportsOperations.getReportsFull(QUERY_PARAMS));
    setMonth(
      prevState => ARRAY_OF_MONTHS[ARRAY_OF_MONTHS.indexOf(prevState) - 1]
    );
  };

  const onNextMonth = () => {
    navigate('/reports');
    if (month === 'December') {
      setYear(year + 1);
    }
    if (ARRAY_OF_MONTHS.indexOf(month) > 10) {
      dispatch(
        setReportsDate({ year, month: ARRAY_OF_MONTHS.indexOf(month) - 10 })
      );
      SetQueryParams(year, ARRAY_OF_MONTHS.indexOf(month) - 10);
      dispatch(reportsOperations.getReportsFull(QUERY_PARAMS));
      return setMonth(ARRAY_OF_MONTHS[0]);
    }

    dispatch(
      setReportsDate({ year, month: ARRAY_OF_MONTHS.indexOf(month) + 2 })
    );
    SetQueryParams(year, ARRAY_OF_MONTHS.indexOf(month) + 2);
    dispatch(reportsOperations.getReportsFull(QUERY_PARAMS));
    setMonth(ARRAY_OF_MONTHS[ARRAY_OF_MONTHS.indexOf(month) + 1]);
  };

  useEffect(() => {
    dispatch(
      setReportsDate({ year, month: ARRAY_OF_MONTHS.indexOf(month) + 1 })
    );
    SetQueryParams(year, ARRAY_OF_MONTHS.indexOf(month) + 1);
    dispatch(reportsOperations.getReportsFull(QUERY_PARAMS));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <Container>
        <section className={s.section}>
          <div className={s.inlineBlock}>
            <ButtonGoMain />
            <div className={s.inlineBalanceBlock}>
              <CurrentPeriod
                onPreviousMonth={onPreviousMonth}
                onNextMonth={onNextMonth}
                month={month}
                year={year}
              />
              <Balance type="report" />
            </div>
          </div>
          {!isRefreshing && (
            <>
              <Summary year={year} month={ARRAY_OF_MONTHS.indexOf(month) + 1} />
              <Categories />
              <Outlet />
            </>
          )}
        </section>
      </Container>
    </>
  );
}
