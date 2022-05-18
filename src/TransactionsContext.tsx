import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "./services/api";

interface Transactions{
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

type TransactionInput = Pick<Transactions, 'title' | 'amount' | 'category' | 'type'> 

interface TransactionsProviderProps{
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transactions[],
  createTransaction: ( transaction: TransactionInput ) => void;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)


export function TransactionsProvider({ children }: TransactionsProviderProps){
  const [transactions, setTransactions] = useState<Transactions[]>([]);


  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data))
  }, [])


  function createTransaction(transaction: TransactionInput){
    api.post('/transactions', transaction)
  }

  return(
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      { children }
    </TransactionsContext.Provider>
  )
}