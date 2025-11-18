# Placement Dashboard

A playful, doodle-inspired sales and inventory dashboard built with React, Vite, TailwindCSS, and Supabase.

## Features

- 🎨 **Doodle-inspired UI** with soft pastels and playful animations
- 📱 **Fully responsive** - works beautifully on mobile and desktop
- 🔐 **Authentication** with email/password
- 📊 **Interactive charts** using Recharts
- 📋 **Transaction tracking** with sortable tables
- 🌐 **Mock mode** - runs without Supabase setup
- ♿ **Accessible** with semantic HTML and proper ARIA labels

## Tech Stack

- **React** (Vite)
- **TypeScript**
- **TailwindCSS** for styling
- **Recharts** for data visualization
- **Supabase** for backend (optional)
- **React Router** for navigation

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev
```

The app will open at `http://localhost:8080`

### Mock Mode (Default)

By default, the app runs in **mock mode** without requiring Supabase setup. Use these demo credentials:

- **Email:** viewer@vite.co.in
- **Password:** pass123

Mock mode uses local JSON data for sales and transactions.

### Supabase Setup (Optional)

To use Supabase backend:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL in `seed.sql` to create tables and insert sample data
3. Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Restart the dev server

The app will automatically detect Supabase credentials and switch from mock mode.

### Force Mock Mode

To explicitly run in mock mode even with Supabase credentials:

```env
VITE_MOCK=true
```

## Project Structure

```
src/
├── components/
│   ├── Login.tsx              # Authentication page
│   ├── DashboardCard.tsx      # Summary stat cards
│   ├── SalesChart.tsx         # Line chart component
│   └── TransactionsTable.tsx  # Transaction list table
├── pages/
│   ├── Dashboard.tsx          # Main dashboard page
│   └── NotFound.tsx           # 404 page
├── lib/
│   └── supabaseClient.ts      # Supabase client & mock data
└── App.tsx                    # Routes configuration
```

## Features Overview

### Authentication
- Email/password login
- Session management via localStorage
- Mock credentials for demo
- Automatic redirect after login/logout

### Dashboard
- **Summary Cards**: Total Sales, Total Orders, Inventory Count
- **Sales Chart**: Interactive line chart showing monthly sales (Jan-Jun)
- **Transactions Table**: Recent transactions with hover effects

### Responsive Design
- Mobile-first approach
- Cards stack vertically on small screens
- Grid layout on tablets and desktop
- Scrollable table on mobile

## Security Notes

⚠️ **For Demo Purposes Only**

This project uses plaintext passwords for demonstration. In production:
- Use Supabase Auth with proper hashing
- Enable Row Level Security (RLS)
- Use environment variables for secrets
- Implement HTTPS

## Database Schema

See `seed.sql` for the complete schema. Tables include:
- `users` - User credentials
- `sales` - Monthly sales data
- `transactions` - Individual transaction records

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

### Colors
Edit design tokens in `src/index.css`:
- `--primary`: Soft coral/peach (15 85% 65%)
- `--secondary`: Mint green (160 55% 70%)
- `--accent`: Soft purple (270 50% 75%)

### Mock Data
Edit mock data in `src/lib/supabaseClient.ts`:
- `mockSalesData`: Monthly sales figures
- `mockTransactions`: Transaction records
- `mockUsers`: Login credentials

## Accessibility

- Semantic HTML elements
- Proper ARIA labels for forms
- Keyboard navigation support
- Color contrast ratios meet WCAG standards
- Focus-visible states on interactive elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning or as a template for your own dashboards!

## Credits

Built with ❤️ using Lovable
