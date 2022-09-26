import React, { useEffect, useState } from 'react';
import s from './TransactionTable.module.css';
import { useSelector } from 'react-redux';
import { getSortedTransactions } from '../../../redux/transactions/transactionsSelectors';
import { TransactionTableRow } from '../TransactionTableRow/TransactionTableRow';
import EmptyRows from './EmptyRows';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState();
  const sortedTransactions = useSelector(getSortedTransactions);
  useEffect(() => {
    setTransactions(sortedTransactions);
  }, [sortedTransactions]);

  return (
    <table className={s.table}>
      <thead className={s.tableHeader}>
        <tr>
          <th className={s.tableHeaderTitle}>date</th>
          <th className={s.tableHeaderTitle}>description</th>
          <th className={s.tableHeaderTitle}>category</th>
          <th className={s.tableHeaderTitle}>sum</th>
          <th className={s.tableHeaderTitle}></th>
        </tr>
      </thead>
      <tbody className={s.tableBody}>
        {transactions &&
          transactions.map(transaction => (
            <TransactionTableRow
              key={transaction._id}
              id={transaction._id}
              date={transaction.date.split('-').reverse().join('.')}
              description={transaction.description}
              type={transaction.type}
              value={transaction.value}
              category={transaction.category.name}
            />
          ))}
        <EmptyRows className={s.emptyRows} />
      </tbody>
    </table>
  );
};

export default TransactionTable;
