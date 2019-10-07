import React from 'react';
import BillHistoryItem from './BillHistoryItem/bill-history-item.component';

import './bill-history-list.style.css';

const BillHistoryList = ({ billHistory, currentUser }) => {
  const billCards = billHistory.map(bill => {
    const { date, items, subtotal, id, host, group_size } = bill;
    return (
      <BillHistoryItem
        key={id}
        date={date}
        items={items}
        subtotal={subtotal}
        hostId={host}
        groupSize={group_size}
        bill={bill}
        currentUser={currentUser}
      />
    );
  });

  return <div>{billCards}</div>;
};

export default BillHistoryList;
