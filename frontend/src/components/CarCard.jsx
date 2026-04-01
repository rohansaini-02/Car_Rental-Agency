import React, { useState, useContext, useEffect } from 'react';
import { Badge, Button, Spinner } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const API_BASE = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/uploads/`;

const CarCard = ({ car, onBookSuccess }) => {
    const { isLoggedIn, role } = useContext(AuthContext);

    const [startDate, setStartDate] = useState('');
    const [days, setDays]           = useState('');
    const [loading, setLoading]     = useState(false);
    const [error, setError]         = useState('');
    const [isAvailable, setIsAvailable] = useState(true);

    // Active image index for the tiny thumbnail strip
    const [activeImg, setActiveImg] = useState(0);

    const today = new Date().toISOString().split('T')[0];

    // Build image list: main + extras
    const images = [car.main_image, ...Object.values(car.extra_images || {})].filter(Boolean);

    // Real-time overlap check
    useEffect(() => {
        if (!startDate || !days || !car.active_bookings?.length) {
            setIsAvailable(true);
            setError('');
            return;
        }
        const pickedStart = new Date(startDate);
        const pickedEnd   = new Date(startDate);
        pickedEnd.setDate(pickedEnd.getDate() + parseInt(days));

        const conflict = car.active_bookings.some(b => {
            const bStart = new Date(b.start_date);
            const bEnd   = new Date(b.start_date);
            bEnd.setDate(bEnd.getDate() + b.days);
            return bStart.getTime() < pickedEnd.getTime() && bEnd.getTime() > pickedStart.getTime();
        });

        setIsAvailable(!conflict);
        setError(conflict ? 'Car is already booked for these dates.' : '');
    }, [startDate, days, car.active_bookings]);

    const totalPrice = (days && isAvailable)
        ? (parseFloat(car.rent_per_day) * parseInt(days)).toFixed(2)
        : null;

    const handleBook = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post('/bookCar.php', { car_id: car.id, start_date: startDate, days: parseInt(days) });
            onBookSuccess(`🎉 ${car.model} booked for ${days} day${days > 1 ? 's' : ''}!`);
            setStartDate('');
            setDays('');
        } catch (err) {
            if (err.response?.status === 409) setIsAvailable(false);
            setError(err.response?.data?.message || 'Booking failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="car-card-v2">
            {/* ── Image Area ── */}
            <div className="car-card-img-wrap">
                <img
                    src={`${API_BASE}${images[activeImg]}`}
                    alt={car.model}
                    className="car-card-main-img"
                    onError={e => { e.target.src = ''; e.target.style.display = 'none'; }}
                />

                {/* Price badge */}
                <div className="car-card-price-badge">
                    <span className="car-price-amount">${car.rent_per_day}</span>
                    <span className="car-price-unit">/day</span>
                </div>

                {/* BOOKED overlay */}
                {!isAvailable && (
                    <div className="car-card-booked-overlay">
                        <span className="car-booked-label">
                            <i className="bi bi-x-circle-fill me-2" />BOOKED
                        </span>
                    </div>
                )}

                {/* Thumbnail strip (only if extra images exist) */}
                {images.length > 1 && (
                    <div className="car-card-thumbs">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                className={`car-card-thumb ${activeImg === i ? 'active' : ''}`}
                                onClick={() => setActiveImg(i)}
                            >
                                <img src={`${API_BASE}${img}`} alt="" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Body ── */}
            <div className="car-card-body">
                {/* Title row */}
                <div className="car-card-title-row">
                    <h3 className="car-card-model">{car.model}</h3>
                    <span className="car-card-plate">
                        <i className="bi bi-upc-scan me-1" />{car.vehicle_number}
                    </span>
                </div>

                {/* Meta chips */}
                <div className="car-card-meta">
                    <span className="car-meta-chip">
                        <i className="bi bi-people-fill" />{car.seating_capacity} Seats
                    </span>
                    <span className="car-meta-chip">
                        <i className="bi bi-gear-fill" />{car.transmission || 'Automatic'}
                    </span>
                    <span className="car-meta-chip">
                        <i className="bi bi-fuel-pump-fill" />{car.fuel_type || 'Petrol'}
                    </span>
                </div>

                <div className="car-card-divider" />

                {/* Booking section */}
                {!isLoggedIn && (
                    <div className="car-card-cta-wrap">
                        <p className="car-card-login-hint">
                            <i className="bi bi-lock-fill me-2 text-muted" />
                            Login to book this car
                        </p>
                        <a href="/login" className="btn btn-hero-primary w-100 py-2">
                            Login to Rent
                        </a>
                    </div>
                )}

                {isLoggedIn && role === 'agency' && (
                    <div className="car-card-cta-wrap">
                        <div className="car-agency-notice">
                            <i className="bi bi-info-circle me-2" />
                            Agencies cannot rent cars
                        </div>
                    </div>
                )}

                {isLoggedIn && role === 'customer' && (
                    <form onSubmit={handleBook} className="car-book-form">
                        <div className="car-book-inputs">
                            <div className="car-book-field">
                                <label className="car-book-label">
                                    <i className="bi bi-calendar3 me-1" />Start Date
                                </label>
                                <input
                                    type="date"
                                    className="car-book-input"
                                    value={startDate}
                                    min={today}
                                    onChange={e => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="car-book-field">
                                <label className="car-book-label">
                                    <i className="bi bi-clock me-1" />Days
                                </label>
                                <select
                                    className="car-book-input"
                                    value={days}
                                    onChange={e => setDays(e.target.value)}
                                    required
                                >
                                    <option value="">Select</option>
                                    {[1,2,3,4,5,6,7,14,30].map(d => (
                                        <option key={d} value={d}>{d} day{d > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {error && (
                            <div className="car-book-error">
                                <i className="bi bi-exclamation-triangle-fill me-2" />{error}
                            </div>
                        )}

                        {totalPrice && (
                            <div className="car-book-total">
                                <span className="car-total-label">Total</span>
                                <span className="car-total-price">${totalPrice}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="car-book-btn"
                            disabled={!startDate || !days || !isAvailable || loading}
                        >
                            {loading
                                ? <><span className="car-btn-spinner" />Booking…</>
                                : isAvailable
                                    ? <><i className="bi bi-check2-circle me-2" />Rent This Car</>
                                    : <><i className="bi bi-x-circle me-2" />Unavailable</>
                            }
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CarCard;
