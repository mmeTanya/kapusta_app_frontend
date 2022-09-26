import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getDataByMonth } from 'redux/reports/reportsSelectors';
import ReportChartMobile from './ReportChartMobile';
import ReportChartDesktop from './ReportChartDesktop';
import screenRes from 'utils/mediaConstants';

const ReportChart = () => {
  const notMobile = useMediaQuery(screenRes.NOT_MOBILE);
  const isDesktop = useMediaQuery(screenRes.IS_DESKTOP);
  const { categoryId } = useParams();

  const reportFullMonth = useSelector(getDataByMonth);

  const arrOfTypes =
    reportFullMonth[0] && reportFullMonth[0].date
      ? reportFullMonth[0].arrOfTypes
      : [];

  const arrOfCategories = arrOfTypes.length
    ? arrOfTypes.reduce((acc, item) => {
        return acc.concat(item.arrOfCategories);
      }, [])
    : [];

  const arrOfTransaction = arrOfCategories.length
    ? arrOfCategories.reduce((acc, item) => {
        if (item.category._id === categoryId) {
          return acc.concat(item.arrOfTransactions);
        }
        return acc;
      }, [])
    : [];
  const data = arrOfTransaction;
  return (
    <>
      {notMobile
        ? data.length !== 0 && (
            <ReportChartDesktop isDesktop={isDesktop} data={data} />
          )
        : data.length !== 0 && <ReportChartMobile data={data} />}
    </>
  );
};

export default ReportChart;
