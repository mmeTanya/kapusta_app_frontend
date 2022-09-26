import { Link } from 'react-router-dom';
import s from './ReportsItem.module.css';

export default function ReportsItem({ id, category, sum, children }) {
  return (
    <Link to={`/reports/${id}`} className={s.link} lang="en">
      <p className={`${s.sum} ${s.text}`} lang="en">
        {sum}
      </p>
      {children}
      <p className={`${s.category} ${s.text}`} lang="en" data-tip={category}>
        {category.toLowerCase()}
      </p>
    </Link>
  );
}
