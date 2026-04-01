import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/login.php', credentials);
            const { user, token } = response.data.data;
            login(user, token);
            if (user.role === 'customer') {
                navigate('/cars');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-split-layout">
            {/* ── Left visual panel ── */}
            <div className="auth-visual-panel">
                {/* Decorative orbs */}
                <div className="auth-orb auth-orb-1" />
                <div className="auth-orb auth-orb-2" />
                <div className="auth-orb auth-orb-3" />

                {/* Content */}
                <div className="auth-visual-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <div className="auth-visual-badge">
                            <i className="bi bi-shield-check" />
                            <span>Secure & Trusted Platform</span>
                        </div>
                        <h1 className="auth-visual-heading">
                            Welcome back to <br />
                            <span className="auth-gradient-text">Rentify</span>
                        </h1>
                        <p className="auth-visual-sub">
                            Your premium fleet awaits. Log in to manage your rentals,
                            track bookings, and access your personalized dashboard.
                        </p>

                        <div className="auth-visual-stats">
                            <div className="auth-stat-item">
                                <span className="auth-stat-value">10,000+</span>
                                <span className="auth-stat-label">Happy Customers</span>
                            </div>
                            <div className="auth-stat-divider" />
                            <div className="auth-stat-item">
                                <span className="auth-stat-value">500+</span>
                                <span className="auth-stat-label">Premium Vehicles</span>
                            </div>
                            <div className="auth-stat-divider" />
                            <div className="auth-stat-item">
                                <span className="auth-stat-value">99.9%</span>
                                <span className="auth-stat-label">Uptime</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Abstract car silhouette */}
                    <div className="auth-car-silhouette">
                        <i className="bi bi-car-front-fill" />
                    </div>
                </div>
            </div>

            {/* ── Right form panel ── */}
            <div className="auth-form-panel">
                <motion.div
                    className="auth-form-container"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Brand */}
                    <Link to="/" className="auth-brand-link">
                        <div className="auth-brand-icon">
                            <i className="bi bi-car-front-fill" />
                        </div>
                        <span className="auth-brand-name">Rentify</span>
                    </Link>

                    <h2 className="auth-form-title">Log In</h2>
                    <p className="auth-form-subtitle">Enter your credentials to access your account</p>

                    {error && (
                        <motion.div
                            className="auth-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <i className="bi bi-exclamation-triangle-fill" />
                            <span>{error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-input-group">
                            <label className="auth-label">Email Address</label>
                            <div className="auth-input-wrapper">
                                <i className="bi bi-envelope auth-input-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    className="auth-input"
                                    placeholder="name@example.com"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <div className="auth-label-row">
                                <label className="auth-label">Password</label>
                                <button type="button" className="auth-forgot-link">Forgot password?</button>
                            </div>
                            <div className="auth-input-wrapper">
                                <i className="bi bi-lock auth-input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="auth-input"
                                    placeholder="Enter your password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="auth-password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`bi bi-eye${showPassword ? '-slash' : ''}`} />
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={loading || !credentials.email || !credentials.password}
                        >
                            {loading ? (
                                <>
                                    <span className="auth-spinner" />
                                    Logging in…
                                </>
                            ) : (
                                <>
                                    Log In
                                    <i className="bi bi-arrow-right" />
                                </>
                            )}
                        </button>
                    </form>



                    <div className="auth-footer-text">
                        <span>Don't have an account? </span>
                        <Link to="/register-customer" className="auth-link">Sign up as Customer</Link>
                        <span> or </span>
                        <Link to="/register-agency" className="auth-link">Agency</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
