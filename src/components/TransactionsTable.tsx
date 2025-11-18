interface Transaction {
  id: number;
  date: string;
  product: string;
  category: string;
  amount: number;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-md border-2 border-border card-hover">
      <h2 className="text-xl font-bold text-foreground mb-4">Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Product</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Category</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr 
                key={transaction.id} 
                className={`border-b border-border hover:bg-muted/30 transition-colors ${
                  index % 2 === 0 ? 'bg-muted/10' : ''
                }`}
              >
                <td className="py-3 px-4 text-sm text-foreground">{transaction.date}</td>
                <td className="py-3 px-4 text-sm font-medium text-foreground">{transaction.product}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-xs font-medium">
                    {transaction.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm font-semibold text-right text-foreground">
                  ${transaction.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
