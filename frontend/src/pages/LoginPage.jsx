import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../utils/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      setToken(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-shell">
      <section className="login-image-panel">
        <div className="login-image-overlay">
          <div className="login-left-content">
            <div className="login-logo-brand">
              <img src="/images/logo.png" alt="EUTELIA logo" />
              <span>EUTELIA</span>
            </div>
            <blockquote>
              <span>&ldquo;</span>
              Exceptional billing is the foundation of premium hospitality.
              <span>&rdquo;</span>
            </blockquote>
            <div className="login-gold-bar" />
          </div>
        </div>
      </section>

      <section className="login-form-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <header className="login-form-header">
            <h1>Welcome Back!</h1>
            <p>SIGN IN TO CONTINUE TO YOUR ACCOUNT</p>
            <div className="login-divider"><span /></div>
          </header>

          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <div className="field-shell">
              <span className="field-icon">✉</span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
              />
            </div>
          </div>

          <div className="form-field password-field">
            <label htmlFor="password">Password</label>
            <button type="button" className="forgot-password">Forgot Password?</button>
            <div className="field-shell">
              <span className="field-icon">🔒</span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <label className="remember-me">
            <input type="checkbox" defaultChecked />
            <span>Remember Me</span>
          </label>

          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-submit">Sign In</button>

          <div className="login-register">
            <div className="login-divider"><span /></div>
            <p>Don&rsquo;t have an account? <button type="button">REGISTER</button></p>
          </div>
        </form>
      </section>
    </div>
  );
}
