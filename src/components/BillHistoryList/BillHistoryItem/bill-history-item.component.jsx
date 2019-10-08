import React from 'react';

import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import EventIcon from '@material-ui/icons/Event';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Divider from '@material-ui/core/Divider';
import BillHistoryDetailItem from './bill-history-detail-items.component';

const BillHistoryItem = ({
  date,
  items,
  subtotal,
  hostId,
  groupSize,
  currentUser
}) => {
  const detailItems = items.map(item => {
    const { id, name, price } = item;
    return <BillHistoryDetailItem key={id} name={name} price={price} />;
  });

  let partySize = '';
  if (groupSize > 1) {
    partySize += `with ${groupSize - 1} other`
  }

  if (groupSize > 2) {
    partySize += 's'
  }

  return (
    <Card className={'history__card'}>
      <List>
        <ListItem>
          <div className={'history__card__header'}>
            <div className={'history__card__primary'}>
              <p className={'history__card__primary_text'}>Split bill as:</p>
              <p className={'history__card__primary_text'}>Total</p>
            </div>
            <div className={'history__card__secondary'}>
              <p className={'history__card__secondary_text'}>
                {currentUser.uid === hostId ? (
                  <>Host {partySize}</>
                ) : (
                  <>Borrowee {partySize}</>
                )}
              </p>
              <p className={'history__card__secondary_text history__card__secondary_text--price'}>
                ${(subtotal * 1.13).toFixed(2)}
              </p>
            </div>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EventIcon />
            </Avatar>
          </ListItemAvatar>
          <div className={'history__card__header'}>
            <div className={'history__card__primary'}>
              <p className={'history__card__primary_text'}>On:</p>
            </div>
            <div className={'history__card__secondary'}>
              <p className={'history__card__secondary_text'}>{date}</p>
            </div>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ReceiptIcon />
            </Avatar>
          </ListItemAvatar>
          <div className={'history__card__header'}>
            <div className={'history__card__primary'}>
              <p className={'history__card__primary_text'}>Your items:</p>
            </div>
            {detailItems}
          </div>
        </ListItem>
      </List>
    </Card>
  );
};

export default BillHistoryItem;
