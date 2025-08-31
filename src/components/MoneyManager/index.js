import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'
import './index.css'

const transactionTypeOptions = [
  {optionId: 'INCOME', displayText: 'Income'},
  {optionId: 'EXPENSES', displayText: 'Expenses'},
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    typeInput: transactionTypeOptions[0].optionId,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({typeInput: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput} = this.state
    const trimmedTitle = titleInput.trim()
    const amountValue = parseInt(amountInput, 10)

    if (trimmedTitle !== '' && !Number.isNaN(amountValue)) {
      const newTransaction = {
        id: uuidv4(),
        title: trimmedTitle,
        amount: amountValue,
        type: typeInput,
      }

      this.setState(prev => ({
        transactionsList: [...prev.transactionsList, newTransaction],
        titleInput: '',
        amountInput: '',
        typeInput: transactionTypeOptions[0].optionId,
      }))
    }
  }

  onDeleteTransaction = id => {
    this.setState(prev => ({
      transactionsList: prev.transactionsList.filter(each => each.id !== id),
    }))
  }

  getIncome = () => {
    const {transactionsList} = this.state
    return transactionsList
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0)
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    return transactionsList
      .filter(t => t.type === 'EXPENSES')
      .reduce((sum, t) => sum + t.amount, 0)
  }

  getBalance = () => this.getIncome() - this.getExpenses()

  render() {
    const {transactionsList, titleInput, amountInput, typeInput} = this.state
    const balance = this.getBalance()
    const income = this.getIncome()
    const expenses = this.getExpenses()

    return (
      <div className="money-manager">
        <div className="welcome-container">
          <p>
            Welcome back to your{' '}
            <span className="highlight">Money Manager</span>
          </p>
        </div>
        <MoneyDetails balance={balance} income={income} expenses={expenses} />

        <div className="transactions-section">
          <form className="transaction-form" onSubmit={this.onAddTransaction}>
            <h1>Add Transaction</h1>

            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              type="text"
              value={titleInput}
              onChange={this.onChangeTitle}
              placeholder="Title"
            />

            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              type="number"
              value={amountInput}
              onChange={this.onChangeAmount}
              placeholder="Amount"
            />

            <label htmlFor="type">TYPE</label>
            <select id="type" value={typeInput} onChange={this.onChangeType}>
              {transactionTypeOptions.map(opt => (
                <option key={opt.optionId} value={opt.optionId}>
                  {opt.displayText}
                </option>
              ))}
            </select>

            <button type="submit">Add</button>
          </form>

          <div className="history-section">
            <h1>History</h1>
            <div className="history-headings">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </div>
            <ul className="history-list">
              {transactionsList.map(each => (
                <TransactionItem
                  key={each.id}
                  transaction={each}
                  deleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
