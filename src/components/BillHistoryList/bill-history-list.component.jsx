import React from 'react';
import BillHistoryItem from './BillHistoryItem/bill-history-item.component';

import './bill-history-list.style.css';

const BillHistoryList = ({ billHistory }) => {
  const billCards = billHistory.map(bill => {
    const { date, items, subtotal, id, hostId, splitBy } = bill;
    return (
      <BillHistoryItem
        key={id}
        date={date}
        items={items}
        subtotal={subtotal}
        hostId={hostId}
        splitBy={splitBy}
        bill={bill}
      />
    );
  });

  return <div>{billCards}</div>;
};

export default BillHistoryList;
