import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './summary.style.css'


const SummaryPage = () => {
  const obj = {
    1:{
      first_name: "ipsum",
      last_name: "janus",
      total: 10
    },
    2:{
      first_name: "yuier",
      last_name: "teayt",
      total: 3
    },
    3:{
      first_name: "12ef",
      last_name: "qwed",
      total: 15
    } 
  }

  const [summary, setSummary] = useState({userDetails: null})

  // useEffect(() => {
  //   Axios.get('')
  //     .then(res => setSummary({userDetails: res.data}))
  //     .catch(err => console.log(err))
  // },[]);

  const summaryKeys = Object.keys(obj); 
    const itemTotals = summaryKeys.map(key => {
      const { first_name, last_name, total } = obj[key];
      return (
      <Card>
        <CardContent>
          {first_name + last_name}<br/>
          Total: {total}
        </CardContent>
      </Card>
      )
    });

  return (
    <div className="summaryPage">
      <h1>Summary</h1>
      {itemTotals}
      <footer className="summaryPage__footer">
        
      </footer>      
    </div>  
  );
};

export default SummaryPage;