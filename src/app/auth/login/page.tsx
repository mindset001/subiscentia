'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.login(formData.email, formData.password);
      
      if (response.success) {
        // Update auth context and store data
        login(response.token, response.user);
        
        // Show success message
        setSuccess(`Welcome back, ${response.user.name}!`);
        
        // Redirect based on role after 1.5 seconds
        setTimeout(() => {
          if (response.user.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/collections');
          }
        }, 1500);
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-purple-900 mb-2 font-sackers">
            SUBI SCENTIA
          </h1>
          <p className="text-gray-600 font-circular">Welcome back</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm font-circular">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-600 text-sm font-circular animate-pulse">
            {success}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-circular">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-circular"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 font-circular">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-circular"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              <span className="ml-2 text-sm text-gray-600 font-circular">Remember me</span>
            </label>
            <Link href="/auth/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 font-circular">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-900 text-white py-3 rounded-lg font-medium hover:bg-purple-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-circular"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500 font-circular">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 font-circular">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-purple-600 hover:text-purple-700 font-medium">
            Create an account
          </Link>
        </p>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 font-circular">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
