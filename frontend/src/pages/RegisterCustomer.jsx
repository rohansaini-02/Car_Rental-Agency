import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const RegisterCustomer = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/register.php', formData);
            const { user, token } = response.data.data;
            login(user, token);
            navigate('/cars');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-split-layout">
            {/* ── Left visual panel ── */}
            <div className="auth-visual-panel">
                <div className="auth-orb auth-orb-1" />
                <div className="auth-orb auth-orb-2" />
                <div className="auth-orb auth-orb-3" />

                <div className="auth-visual-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <div className="auth-visual-badge">
                            <i className="bi bi-person-check-fill" />
                            <span>Join 10,000+ customers</span>
                        </div>
                        <h1 className="auth-visual-heading">
                            Start your journey<br />
                            with <span className="auth-gradient-text">Rentify</span>
                        </h1>
                        <p className="auth-visual-sub">
                            Discover and book premium vehicles from trusted agencies.
                            Your perfect ride is just a few clicks away.
                        </p>

                        <div className="auth-visual-features">
                            <div className="auth-feature-item">
                                <div className="auth-feature-icon">
                                    <i className="bi bi-lightning-charge-fill" />
                                </div>
                                <div>
                                    <strong>Instant Booking</strong>
                                    <span>Reserve vehicles in seconds</span>
                                </div>
                            </div>
                            <div className="auth-feature-item">
                                <div className="auth-feature-icon">
                                    <i className="bi bi-shield-lock-fill" />
                                </div>
                                <div>
                                    <strong>Secure Payments</strong>
                                    <span>Bank-grade encryption</span>
                                </div>
                            </div>
                            <div className="auth-feature-item">
                                <div className="auth-feature-icon">
                                    <i className="bi bi-star-fill" />
                                </div>
                                <div>
                                    <strong>Premium Fleet</strong>
                                    <span>500+ verified vehicles</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

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
                    <Link to="/" className="auth-brand-link">
                        <div className="auth-brand-icon">
                            <i className="bi bi-car-front-fill" />
                        </div>
                        <span className="auth-brand-name">Rentify</span>
                    </Link>

                    {/* Role toggle */}
                    <div className="auth-role-toggle">
                        <Link to="/register-customer" className="auth-role-btn active">
                            <i className="bi bi-person-fill" />
                            Customer
                        </Link>
                        <Link to="/register-agency" className="auth-role-btn">
                            <i className="bi bi-building" />
                            Agency
                        </Link>
                    </div>

                    <h2 className="auth-form-title">Create Account</h2>
                    <p className="auth-form-subtitle">Fill in the details to get started as a customer</p>

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
                            <label className="auth-label">Full Name</label>
                            <div className="auth-input-wrapper">
                                <i className="bi bi-person auth-input-icon" />
                                <input
                                    type="text"
                                    name="name"
                                    className="auth-input"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                />
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <label className="auth-label">Email Address</label>
                            <div className="auth-input-wrapper">
                                <i className="bi bi-envelope auth-input-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    className="auth-input"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <label className="auth-label">Password</label>
                            <div className="auth-input-wrapper">
                                <i className="bi bi-lock auth-input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="auth-input"
                                    placeholder="Min. 6 characters"
                                    minLength="6"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
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
                            disabled={loading || !formData.email || !formData.password || !formData.name}
                        >
                            {loading ? (
                                <>
                                    <span className="auth-spinner" />
                                    Creating account…
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <i className="bi bi-arrow-right" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="auth-terms">
                        By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                    </p>

                    <div className="auth-divider">
                        <span>or sign up with</span>
                    </div>

                    <div className="auth-social-row">
                        <button type="button" className="auth-social-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                            Google
                        </button>
                        <button type="button" className="auth-social-btn">
                            <i className="bi bi-apple" />
                            Apple
                        </button>
                    </div>

                    <div className="auth-footer-text">
                        <span>Already have an account? </span>
                        <Link to="/login" className="auth-link">Log in</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RegisterCustomer;
