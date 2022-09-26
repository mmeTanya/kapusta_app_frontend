import s from './TransactionForm.module.css';
import React, { forwardRef, useEffect, useState } from 'react';
import { ReactComponent as CalendarLogo } from 'images/icons/calendar.svg';
import calculator from '../../../images/icons/calculator.svg';
import Dropdown from 'modules/dropDownCategories/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { createUserTransaction } from 'redux/transactions/transactionsOperations';
import balanceOperations from 'redux/initialBalance/initialBalanceOperations';
import { toast } from 'react-toastify';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { formatDate } from 'utils/formatDate';

export const DatePickerCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button type="button" className={s.dateButton} onClick={onClick} ref={ref}>
    <CalendarLogo className={s.calendarIcon} />
    <span className={s.dateButtonText}>{value}</span>
  </button>
));

function TransactionForm({ date, setDate, type }) {
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    onHandleResetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const dispatch = useDispatch();
  const initialBalance = useSelector(state => state.balance.balance);
  const addInitialBalance = data =>
    dispatch(balanceOperations.addInitialBalance(data));

  const getUpdatedBalance = typeOfTransaction => {
    switch (typeOfTransaction) {
      case 'expenses':
        const resultOfExpenses = initialBalance - Math.abs(value);
        addInitialBalance({ balance: resultOfExpenses });
        return;
      case 'income':
        const resultOfIncome = initialBalance + Math.abs(value);
        addInitialBalance({ balance: resultOfIncome });
        return;
      default:
        return initialBalance;
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'description':
        setDescription(value);
        break;
      case 'amount':
        if (NaN) {
          return;
        }
        setValue(value);
        break;

      default:
        break;
    }
  };

  const onCategorySet = value => {
    setCategoryID(value._id);
    setCategoryName(value.name);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (description.length < 3) {
      toast.error('Too short description');
      return;
    }
    if (description.length > 20) {
      toast.error('Too long description');
      return;
    }
    if (value.match('-')) {
      toast.error('Еnter a number without a minus');
      return;
    }

    if (!categoryName) {
      toast.error('Select the category of transaction');
      return;
    }

    dispatch(
      createUserTransaction({
        date: formatDate(date),
        description,
        category: categoryID,
        value,
        type,
      })
    );
    getUpdatedBalance(type);
    setDescription('');
    setCategoryName('');
    setValue('');
  };

  const onHandleResetForm = () => {
    setDate(new Date());
    setDescription('');
    setCategoryName('');
    setValue('');
  };

  return (
    <form className={s.wrap} onSubmit={handleSubmit} autoComplete="off">
      <div className={s.wrapInput}>
        <div className={s.blockButton}>
          <div className={s.dateWrapper}>
            <DatePicker
              dateFormat="dd.MM.yyyy"
              selected={date}
              onChange={date => setDate(date)}
              customInput={<DatePickerCustomInput />}
            />
          </div>
          <div className={s.overlay}>
            <input
              aria-label="Text"
              onChange={handleChange}
              className={s.description}
              name="description"
              type="text"
              placeholder="Product description"
              value={description}
              required
            />
            <div>
              <Dropdown
                type={type}
                onCategorySet={onCategorySet}
                categoryName={categoryName}
                required
              />
            </div>
          </div>
          <div className={s.inputCountOverlay}>
            <input
              aria-label="Number"
              onChange={handleChange}
              type="number"
              name="amount"
              className={s.inputCount}
              placeholder="0.00"
              value={value}
              required
            />
            <span className={s.iconCalculator}>
              <img src={calculator} alt="calculator" className={s.calculator} />
            </span>
          </div>
        </div>
      </div>
      <div className={s.buttonWrap}>
        <button aria-label="Input" type="submit" className={s.btnInput}>
          input
        </button>
        <button
          aria-label="Clear"
          type="button"
          className={s.btnClear}
          onClick={onHandleResetForm}
        >
          clear
        </button>
      </div>
    </form>
  );
}
export default TransactionForm;
