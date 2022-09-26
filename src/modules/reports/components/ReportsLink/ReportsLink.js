import { Link } from 'react-router-dom';
import s from './ReportsLink.module.css';
import { ReactComponent as ReactLogo } from '../../../../images/svg/reports.svg';

export default function ReportsLink() {
  return (
    <div className={s.commonReportBlock}>
      <Link to="/reports/" className={s.link}>
        <h2 className={s.name}>Reports</h2>
        <ReactLogo />
      </Link>
    </div>
  );
}
