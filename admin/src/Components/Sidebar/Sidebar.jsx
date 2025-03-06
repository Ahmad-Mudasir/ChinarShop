import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus, FaList } from 'react-icons/fa'; // Import icons
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/add-product" className="sidebar-link">
            <FaPlus className="sidebar-icon" />
            Add Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/list-product" className="sidebar-link">
            <FaList className="sidebar-icon" />
            List Product
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
