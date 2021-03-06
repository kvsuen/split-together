import React, { useEffect, useState } from 'react';
import { useParams, Route } from 'react-router-dom';
import Axios from 'axios';
import './summary.style.css'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const SummaryPage = () => {

  const [summary, setSummary] = useState([])
  const roomId = useParams().id
  
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_SERVER_URL}/room/${roomId}/summary`)
      .then(res => {
        setSummary(res.data)
      })
      .catch(err => console.log(err))
  },[roomId]);

    const itemTotals = summary.map(user => {
      const { amount, name } = user;

      return (
        <main className="summary__itemwrapper">
          <Card>
            <CardContent>
              <div className="summary__name">
                {name}
              </div>
              <div className="summary__amount">
                ${Number(amount * 1.13).toFixed(2)}
              </div>
              <div className="summary__item__bottom"><br/></div>
            </CardContent>
          </Card>
        </main>
      )
    });

  return (
    <div className="summaryPage">
      <div id="summaryPage__header__container">
        <h1>Summary</h1>
          <Route render={({ history }) => (
            <ArrowForwardIcon onClick={() => { history.push('/main')}}/>
          )}/>
      </div> 
      <div><br></br></div>
      {/* <div id="room_icon">
        <img src={require("./icons/summary.png")} width="120px" alt="fail"/>
      </div> */}
      <div className="summary__itemcontainer">
        {itemTotals}
      </div>
    </div>  
  );
};

export default SummaryPage;