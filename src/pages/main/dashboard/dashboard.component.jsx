import React, { useState, useEffect } from 'react';
import ProfileHeader from '../../../components/ProfileHeader/profile-header.component';
import BillHistoryList from '../../../components/BillHistoryList/bill-history-list.component';
import Card from '@material-ui/core/Card';

import Axios from 'axios';

import './dashboard.style.css';

const DashboardPage = ({ currentUser }) => {
  const [billHistory, setBillHistory] = useState([
    {
      date: '10/01/19 2:23pm',
      items: [{ id: 1, name: 'Fries', price: 2.2 }, { id: 2, name: 'Burger', price: 4.2 }],
      subtotal: 6.4,
      id: 1,
      hostId: 'dsalkdajs',
      splitBy: 4
    },
    {
      date: '10/02/19 8:08am',
      items: [{ id: 3, name: 'Fries', price: 2.2 }, { id: 4, name: 'Burger', price: 4.2 }],
      subtotal: 6.4,
      id: 2,
      hostId: 'dsalkdajdsfsds',
      splitBy: 4
    }
  ]);

  //GET BILL HISTORY DATA
  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_API_SERVER_URL}/users/${currentUser.uid}/bills`
    )
      .then(resp => {
        setBillHistory(resp.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [currentUser]);

  return (
    <div className={'dashboard'}>
      <h1>Dashboard</h1>
      <ProfileHeader currentUser={currentUser}/>
      <section className={'history'}>
        <h2>
          <span>Receipts Split</span>
        </h2>
        {billHistory.length === 0 ? (
          <Card className={'history__cards history__cards--none'}>
            <p>No receipts split yet!</p>
          </Card>
        ) : (
          <div className={'history__cards'}>
            <BillHistoryList billHistory={billHistory} />
          </div>
        )}

      </section>
    </div>
  );
};

export default DashboardPage;
