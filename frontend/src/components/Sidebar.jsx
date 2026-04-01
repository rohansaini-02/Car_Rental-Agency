import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/* ── Nav items ── */
const NAV_ITEMS = [
    { to: '/dashboard',     icon: 'bi-speedometer2',        label: 'Dashboard'        },
    { to: '/my-cars',       icon: 'bi-car-front-fill',      label: 'Fleet Management' },
    { to: '/view-bookings', icon: 'bi-calendar-check-fill', label: 'Bookings'         },
    { to: '/add-car',       icon: 'bi-plus-circle-fill',    label: 'Add New Car'      },
];

/* ═════════════════════════════════════
   Sidebar
 ═════════════════════════════════════ */
const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/login');
    };

    return (
        <aside className="agency-sidebar">
            {/* Brand */}
            <div className="sidebar-brand">
                <div className="sidebar-brand-icon">
                    <i className="bi bi-car-front-fill" />
                </div>
                <div>
                    <div className="sidebar-brand-title">Agency Portal</div>
                    <div className="sidebar-brand-sub">Premium Concierge</div>
                </div>
            </div>

            {/* Nav */}
            <nav className="sidebar-nav-list">
                {NAV_ITEMS.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/dashboard'}
                        className={({ isActive }) =>
                            `sidebar-nav-item${isActive ? ' active' : ''}`
                        }
                    >
                        <i className={`bi ${item.icon} sidebar-nav-icon`} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom section */}
            <div className="sidebar-bottom">
                <NavLink to="/add-car" className="sidebar-add-btn">
                    <i className="bi bi-plus-lg me-2" />
                    Add New Car
                </NavLink>

                <div className="sidebar-user">
                    <div className="sidebar-user-avatar">
                        <i className="bi bi-person-fill" />
                    </div>
                    <div className="sidebar-user-info">
                        <div className="sidebar-user-name">{user?.name || 'Agency'}</div>
                        <div className="sidebar-user-role">Super Admin</div>
                    </div>
                    <button className="sidebar-logout-btn" onClick={handleLogout} title="Logout">
                        <i className="bi bi-box-arrow-right" />
                    </button>
                </div>
            </div>
        </aside>
    );
};

/* ═════════════════════════════════════
   AgencyLayout wrapper
 ═════════════════════════════════════ */
export const AgencyLayout = ({ children }) => {
    return (
        <div className="agency-layout">
            <Sidebar />
            <main className="agency-main">
                {children}
            </main>
        </div>
    );
};

export default AgencyLayout;
