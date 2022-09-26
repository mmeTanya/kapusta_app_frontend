import React, { useState } from 'react';
import { ReactComponent as Delete } from '../../../images/icons/delete.svg';
import s from './TransactionTableRow.module.css';
import balanceOperations from 'redux/initialBalance/initialBalanceOperations';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransactionById } from '../../../redux/transactions/transactionsOperations';
import NumberFormat from 'react-number-format';
import Modal from '../../Modal/Modal';

const getSumTypeStyle = type => {
  switch (type) {
    case 'income':
      return {
        color: '#407946',
      };
    case 'expenses':
      return {
        color: '#E7192E',
      };
    default:
      return {};
  }
};

export function TransactionTableRow({
  id,
  date,
  description,
  category,
  value,
  type,
}) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const initialBalance = useSelector(state => state.balance.balance);
  const addInitialBalance = data =>
    dispatch(balanceOperations.addInitialBalance(data));

  const getUpdatedBalance = (typeOfTransaction, value) => {
    switch (typeOfTransaction) {
      case 'expenses':
        const resultOfExpenses = initialBalance + Math.abs(value);
        addInitialBalance({ balance: resultOfExpenses });
        return;
      case 'income':
        const resultOfIncome = initialBalance - Math.abs(value);
        addInitialBalance({ balance: resultOfIncome });
        return;
      default:
        return initialBalance;
    }
  };

  const onDelete = (id, type, value) => () => {
    getUpdatedBalance(type, value);
    dispatch(deleteTransactionById(id));
  };
  const sumStyle = getSumTypeStyle(type);

  return (
    <tr key={id} className={s.tableRow}>
      {showModal && (
        <Modal
          onDeny={() => {
            setShowModal(false);
          }}
          handleAgreeButtonClick={onDelete(id, type, value)}
          question="Are you sure you want to delete the transaction?"
        />
      )}
      <td className={s.tableDataDate}>{date}</td>
      <td title={description} className={s.tableDataDescription}>
        {description}
      </td>
      <td className={s.tableDataCategory}>{category}</td>
      <td className={s.tableDataSum} style={sumStyle}>
        <NumberFormat
          thousandSeparator={' '}
          fixedDecimalScale={'true'}
          decimalScale={'2'}
          value={value}
          placeholder={'00.00 UAH'}
          displayType={'text'}
          prefix={type === 'expenses' ? '- ' : ''}
          suffix={' UAH'}
          disabled={true}
        />
      </td>
      <td className={s.tableDataBtn}>
        <button
          type="button"
          className={s.button}
          onClick={() => setShowModal(true)}
        >
          <Delete className={s.svg} />
        </button>
      </td>
    </tr>
  );
}

export default TransactionTableRow;
