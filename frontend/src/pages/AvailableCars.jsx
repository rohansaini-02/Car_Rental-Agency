import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Spinner, Form, InputGroup } from 'react-bootstrap';
import api from '../services/api';
import CarCard from '../components/CarCard';
import AlertMessage from '../components/AlertMessage';

const AvailableCars = () => {
    const [cars, setCars]         = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Filters
    const [search, setSearch]     = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [seats, setSeats]       = useState('');

    useEffect(() => { fetchCars(); }, []);

    const fetchCars = async () => {
        try {
            const res = await api.get('/getCars.php');
            setCars(res.data.data || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load cars.');
        } finally {
            setLoading(false);
        }
    };

    const filtered = useMemo(() => {
        return cars.filter(c => {
            const matchSearch = !search || c.model.toLowerCase().includes(search.toLowerCase()) || c.vehicle_number.toLowerCase().includes(search.toLowerCase());
            const matchPrice  = !maxPrice || parseFloat(c.rent_per_day) <= parseFloat(maxPrice);
            const matchSeats  = !seats   || c.seating_capacity == seats;
            return matchSearch && matchPrice && matchSeats;
        });
    }, [cars, search, maxPrice, seats]);

    const handleBookSuccess = (msg) => {
        setSuccessMsg(msg);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Refresh so active_bookings is updated
        fetchCars();
    };

    return (
        <div className="cars-page">
            {/* ── Page Header ── */}
            <div className="cars-page-header">
                <Container>
                    <div className="cars-header-content">
                        <div>
                            <h1 className="cars-page-title">Available Cars</h1>
                            <p className="cars-page-sub">
                                {loading ? 'Loading...' : `${filtered.length} vehicle${filtered.length !== 1 ? 's' : ''} available for rent`}
                            </p>
                        </div>
                    </div>

                    {/* ── Search & Filter Bar ── */}
                    <div className="cars-filter-bar">
                        {/* Search */}
                        <div className="filter-search-wrap">
                            <i className="bi bi-search filter-search-icon" />
                            <input
                                type="text"
                                className="filter-input filter-input-search"
                                placeholder="Search by model or plate..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Max Price */}
                        <div className="filter-item-wrap">
                            <i className="bi bi-tag filter-item-icon" />
                            <select
                                className="filter-input"
                                value={maxPrice}
                                onChange={e => setMaxPrice(e.target.value)}
                            >
                                <option value="">Any Price</option>
                                <option value="50">Up to $50/day</option>
                                <option value="100">Up to $100/day</option>
                                <option value="150">Up to $150/day</option>
                                <option value="200">Up to $200/day</option>
                                <option value="500">Up to $500/day</option>
                            </select>
                        </div>

                        {/* Seats */}
                        <div className="filter-item-wrap">
                            <i className="bi bi-people filter-item-icon" />
                            <select
                                className="filter-input"
                                value={seats}
                                onChange={e => setSeats(e.target.value)}
                            >
                                <option value="">Any Seats</option>
                                <option value="2">2 Seats</option>
                                <option value="4">4 Seats</option>
                                <option value="5">5 Seats</option>
                                <option value="7">7 Seats</option>
                                <option value="8">8+ Seats</option>
                            </select>
                        </div>

                        {/* Clear */}
                        {(search || maxPrice || seats) && (
                            <button
                                className="filter-clear-btn"
                                onClick={() => { setSearch(''); setMaxPrice(''); setSeats(''); }}
                            >
                                <i className="bi bi-x-lg me-1" />Clear
                            </button>
                        )}
                    </div>
                </Container>
            </div>

            {/* ── Content ── */}
            <Container className="py-5">
                <AlertMessage variant="danger"  message={error}      onClose={() => setError('')} />
                <AlertMessage variant="success" message={successMsg} onClose={() => setSuccessMsg('')} />

                {loading ? (
                    <div className="cars-loading-state">
                        <div className="cars-loading-spinner" />
                        <p className="cars-loading-text">Fetching the best rides…</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="cars-empty-state">
                        <div className="cars-empty-icon">
                            <i className="bi bi-car-front" />
                        </div>
                        <h4 className="cars-empty-title">
                            {cars.length === 0 ? 'No cars listed yet' : 'No cars match your filters'}
                        </h4>
                        <p className="cars-empty-sub">
                            {cars.length === 0
                                ? 'Check back soon — agencies are adding cars daily.'
                                : 'Try adjusting your search or price filters.'}
                        </p>
                        {(search || maxPrice || seats) && (
                            <button
                                className="btn btn-hero-primary mt-3"
                                onClick={() => { setSearch(''); setMaxPrice(''); setSeats(''); }}
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                ) : (
                    <Row className="g-4">
                        {filtered.map(car => (
                            <Col key={car.id} xl={4} lg={4} md={6} xs={12}>
                                <CarCard car={car} onBookSuccess={handleBookSuccess} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default AvailableCars;
