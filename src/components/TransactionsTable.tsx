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
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/50 card-hover relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 opacity-50"></div>
      <h2 className="text-xl font-bold text-foreground mb-4 relative z-10 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Recent Transactions</h2>
      <div className="overflow-x-auto relative z-10">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border/50">
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
                className={`border-b border-border/30 hover:bg-primary/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
                  index % 2 === 0 ? 'bg-muted/5' : ''
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="py-3 px-4 text-sm text-foreground">{transaction.date}</td>
                <td className="py-3 px-4 text-sm font-medium text-foreground">{transaction.product}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">
                  <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 text-foreground text-xs font-medium border border-secondary/30 transition-all duration-300 hover:scale-110">
                    {transaction.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm font-semibold text-right">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${transaction.amount.toLocaleString()}
                  </span>
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
