import './index.css'

const TYPE_LABEL = {
  INCOME: 'Income',
  EXPENSES: 'Expenses',
}

const TransactionItem = props => {
  const {transaction, deleteTransaction} = props
  const {id, title, amount, type} = transaction

  const onDelete = () => deleteTransaction(id)

  return (
    <li className="transaction-item" key={id}>
      <p className="cell title">{title}</p>
      <p className="cell amount">Rs {amount}</p>
      <p className="cell type">{TYPE_LABEL[type]}</p>

      <button
        type="button"
        className="delete-btn"
        onClick={onDelete}
        data-testid="delete"
        aria-label="delete transaction"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default TransactionItem
