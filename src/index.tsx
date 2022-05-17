import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freela de site',
          type: 'deposit',
          category: 'Dev',
          amount: 2000,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 800,
          createdAt: new Date('2021-02-08 15:00:00')
        }
      ]
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('transactions', (schema) => {
      return schema.db.transactions
    })

    this.post('/transactions', (schema, request) =>{
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);