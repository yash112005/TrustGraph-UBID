import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, ArrowLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ otp: '', new_password: '', confirm_password: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email') || '';

  const handleReset = async (e) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:8000/auth/reset-password', {
        email,
        otp: formData.otp,
        new_password: formData.new_password
      });

      setSuccess(true);
      toast.success('Password reset successful!');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      const msg = err.response?.data?.detail || 'Reset failed. Please check your OTP.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '3rem' }}>
          <CheckCircle size={64} color="var(--success)" style={{ marginBottom: '1.5rem', marginInline: 'auto' }} />
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Success!</h2>
          <p style={{ color: 'var(--text-muted)' }}>Your password has been reset. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '48px', height: '48px', background: 'var(--primary)', borderRadius: '12px', display: 'grid', placeItems: 'center', margin: '0 auto 1rem' }}>
            <Lock size={24} color="white" />
          </div>
          <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>New Password</h2>
          <p style={{ color: 'var(--text-muted)' }}>Set a secure password for your account</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.875rem' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleReset}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>OTP Code</label>
            <input 
              type="text" 
              className="btn btn-outline" 
              style={{ width: '100%', background: 'rgba(255,255,255,0.03)' }}
              placeholder="123456"
              value={formData.otp}
              onChange={(e) => setFormData({...formData, otp: e.target.value})}
              required
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>New Password</label>
            <input 
              type="password" 
              className="btn btn-outline" 
              style={{ width: '100%', background: 'rgba(255,255,255,0.03)' }}
              placeholder="••••••••"
              value={formData.new_password}
              onChange={(e) => setFormData({...formData, new_password: e.target.value})}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Confirm Password</label>
            <input 
              type="password" 
              className="btn btn-outline" 
              style={{ width: '100%', background: 'rgba(255,255,255,0.03)' }}
              placeholder="••••••••"
              value={formData.confirm_password}
              onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
              required
            />
          </div>

          <button className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} disabled={loading}>
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? 'Updating...' : 'Reset Password'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
