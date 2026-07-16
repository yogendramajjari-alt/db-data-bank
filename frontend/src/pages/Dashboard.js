import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard({ onLogout }) {
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [tab, setTab] = useState('contacts');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: ''
  });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (tab === 'contacts') {
      fetchContacts();
    } else {
      fetchDeals();
    }
  }, [tab]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/crm/contacts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(response.data);
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/crm/deals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeals(response.data);
    } catch (err) {
      console.error('Failed to fetch deals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/crm/contacts', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ first_name: '', last_name: '', email: '', phone: '', company: '' });
      fetchContacts();
    } catch (err) {
      console.error('Failed to add contact:', err);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>CRM Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div className="tabs">
        <button
          className={`tab ${tab === 'contacts' ? 'active' : ''}`}
          onClick={() => setTab('contacts')}
        >
          Contacts
        </button>
        <button
          className={`tab ${tab === 'deals' ? 'active' : ''}`}
          onClick={() => setTab('deals')}
        >
          Deals
        </button>
      </div>

      <div className="content">
        {tab === 'contacts' && (
          <div className="contacts-section">
            <form onSubmit={handleAddContact} className="form">
              <input
                type="text"
                placeholder="First Name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <input
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
              <button type="submit">Add Contact</button>
            </form>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.first_name} {contact.last_name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.company}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === 'deals' && (
          <div className="deals-section">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal) => (
                    <tr key={deal.id}>
                      <td>{deal.title}</td>
                      <td>${deal.value}</td>
                      <td>{deal.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;