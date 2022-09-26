import s from './ReportsList.module.css';
import ReportsItem from '../ReportsItem';
import icons from '../../../../images/icons/category/reports/categoryIcons';
import { useParams } from 'react-router-dom';

export default function ExpensesList({ expenses, header }) {
  const { categoryId } = useParams();
  return (
    <ul className={s.list}>
      {expenses ? (
        expenses.map(item => {
          return (
            <li
              className={
                item.category._id !== categoryId ? s.item : s.itemActive
              }
              key={item.category.name}
              lang="en"
              data-title={item.category.name}
            >
              <ReportsItem
                id={item.category._id}
                category={item.category.name}
                sum={item.totalSum}
              >
                <img
                  src={
                    icons[
                      `${item.category.name
                        .split(', ')
                        .join('')
                        .split(' ')
                        .join('')
                        .toLowerCase()}`
                    ]
                  }
                  alt={`${item.category.name}`}
                  className={s.icon}
                />
              </ReportsItem>
            </li>
          );
        })
      ) : header === 'expenses' ? (
        <p className={s.noData}>No expenses in this month</p>
      ) : (
        <p className={s.noData}>No income in this month</p>
      )}
    </ul>
  );
}
