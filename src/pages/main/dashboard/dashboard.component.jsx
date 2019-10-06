import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase/firebase.utils';

import Axios from 'axios';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReceiptIcon from '@material-ui/icons/Receipt';

import './dashboard.style.css';

const DashboardPage = ({ currentUser }) => {
  const [billHistory, setBillHistory] = useState([
    {
      date: '10/01/19 2:23pm',
      items: [{ name: 'Fries', price: 2.2 }, { name: 'Burger', price: 4.2 }],
      subtotal: 6.4
    },
    {
      date: '10/02/19 8:08am',
      items: [{ name: 'Fries', price: 2.2 }, { name: 'Burger', price: 4.2 }],
      subtotal: 6.4
    }
  ]);

  //GET BILL HISTORY DATA
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_SERVER_URL}/asdf`)
    .then(resp => {
      setBillHistory(resp.data)
      console.log(resp.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  const billCards = billHistory.map(bill => {
    const detailItems = bill.items.map(item => {
      return (
        <div className={'history__card__detail_item'}>
          <p>{item.name}</p><p>${item.price.toFixed(2)}</p>
        </div>
      )
    })
    return (
      <ExpansionPanel className={'history__card'}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ReceiptIcon/>
          <div className={'history__card__text_container'}>
            <p className={'history__card__upper_text'}>PLACEHOLDER ${bill.subtotal.toFixed(2)}</p>
            <p className={'history__card__lower_text'}>{bill.date}</p>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={'history__card__detail_container'}>
            {detailItems}
            <p className={'history__card__detail_subtotal'}>Subtotal: ${bill.subtotal.toFixed(2)}</p>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  });

  return (
    <div>
      <h1>Dashboard Page</h1>
      <button onClick={() => firebase.auth().signOut()}>Sign out</button>

      <section className={'history'}>
        <h2>History</h2>
        <div className={'history__cards'}>
          {billCards}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
