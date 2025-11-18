import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase, validateMockCredentials, isInMockMode } from '@/lib/supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isInMockMode()) {
        // Mock mode validation
        const result = validateMockCredentials(email, password);
        if (result.success && result.user) {
          // Store mock session
          localStorage.setItem('session_token', JSON.stringify({
            user: result.user,
            token: 'mock-token-' + Date.now()
          }));
          navigate('/dashboard');
        } else {
          setError('Invalid credentials');
        }
      } else {
        // Supabase authentication
        const { data, error: authError } = await supabase!.auth.signInWithPassword({
          email,
          password
        });

        if (authError) {
          setError('Invalid credentials');
        } else if (data.session) {
          localStorage.setItem('session_token', JSON.stringify({
            user: data.user,
            token: data.session.access_token
          }));
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Doodle header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none" 
              className="text-primary"
            >
              <path 
                d="M24 4C13 4 4 13 4 24C4 35 13 44 24 44C35 44 44 35 44 24C44 13 35 4 24 4Z" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ strokeDasharray: '2, 4' }}
              />
              <circle cx="24" cy="24" r="8" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Placement Dashboard</h1>
          <p className="text-muted-foreground">Track sales and inventory with style</p>
        </div>

        {/* Login card */}
        <div className="bg-card rounded-2xl shadow-lg p-8 border-2 border-border card-hover">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="viewer@vite.co.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl border-2 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border-2 focus:border-primary"
              />
            </div>

            {error && (
              <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full rounded-xl h-12 text-base font-medium shadow-md hover:shadow-lg transition-all"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-xl border border-border">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo credentials:</strong> viewer@vite.co.in / pass123
            </p>
          </div>
        </div>

        {isInMockMode() && (
          <p className="text-center text-xs text-muted-foreground mt-4">
            Running in mock mode (no Supabase connection)
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
