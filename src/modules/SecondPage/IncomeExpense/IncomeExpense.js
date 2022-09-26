import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import s from './IncomeExpense.module.css';
import screenRes from 'utils/mediaConstants';

const setActive = ({ isActive }) => {
  return {
    color: isActive ? '#FF751D' : '#000000',
  };
};
function IncomeExpense() {
  const isMobile = useMediaQuery(screenRes.IS_MOBILE);
  return (
    <nav className={s.nav}>
      {isMobile ? (
        <NavLink to="/add_expenses" className={s.mobLink} style={setActive}>
          <span className={s.mobLinkText}>Expenses</span>
        </NavLink>
      ) : (
        <button className={s.button_first}>
          <NavLink to="/home/expenses" className={s.link} style={setActive}>
            Expenses
          </NavLink>
        </button>
      )}

      {isMobile ? (
        <NavLink to="/add_income" className={s.mobLink} style={setActive}>
          <span className={s.mobLinkText}>Income</span>
        </NavLink>
      ) : (
        <button className={s.button}>
          <NavLink to="/home/income" className={s.link} style={setActive}>
            Income
          </NavLink>
        </button>
      )}
    </nav>
  );
}

export default IncomeExpense;
