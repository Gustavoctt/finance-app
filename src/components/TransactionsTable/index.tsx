import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Continer } from "./styles";

interface Transactions{
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

export function TrasactionsTable(){
  const [transactions, setTransactions] = useState<Transactions[]>([]);


  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data))
  }, [])

  return(
    <Continer>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => {
            return (
              <tr key={transaction.id} >
                <td> { transaction.title } </td>
                <td className={ transaction.type }> 
                  { new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(transaction.amount) } 
                </td>
                <td> { transaction.category } </td>
                <td> 
                  { new Intl.DateTimeFormat('pt-BR').format(
                    new Date(transaction.createdAt)
                  ) }  
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Continer>
  )
}