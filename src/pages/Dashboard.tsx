import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/DashboardCard';
import SalesChart from '@/components/SalesChart';
import TransactionsTable from '@/components/TransactionsTable';
import { supabase, mockSalesData, mockTransactions, isInMockMode } from '@/lib/supabaseClient';

const Dashboard = () => {
  const navigate = useNavigate();
  const [salesData, setSalesData] = useState(mockSalesData);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const sessionToken = localStorage.getItem('session_token');
    if (!sessionToken) {
      navigate('/login');
      return;
    }

    // Fetch data from Supabase if available
    const fetchData = async () => {
      if (!isInMockMode() && supabase) {
        try {
          // Fetch sales data
          const { data: salesResult } = await supabase
            .from('sales')
            .select('*')
            .order('month');
          
          if (salesResult) {
            setSalesData(salesResult);
          }

          // Fetch transactions
          const { data: transactionsResult } = await supabase
            .from('transactions')
            .select('*')
            .order('date', { ascending: false })
            .limit(8);
          
          if (transactionsResult) {
            setTransactions(transactionsResult);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('session_token');
    navigate('/login');
  };

  // Calculate summary stats from data
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = transactions.length;
  const inventoryCount = new Set(transactions.map(t => t.product)).size;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Placement Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your sales overview.
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="rounded-xl border-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
          >
            Logout
          </Button>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Total Sales"
            value={`$${totalSales.toLocaleString()}`}
            color="primary"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          />
          <DashboardCard
            title="Total Orders"
            value={totalOrders}
            color="secondary"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            }
          />
          <DashboardCard
            title="Inventory Count"
            value={inventoryCount}
            color="accent"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            }
          />
        </div>

        {/* Chart */}
        <div className="mb-8">
          <SalesChart data={salesData} />
        </div>

        {/* Transactions Table */}
        <TransactionsTable transactions={transactions} />

        {isInMockMode() && (
          <p className="text-center text-xs text-muted-foreground mt-6">
            Running in mock mode with sample data
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
