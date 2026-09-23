import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

export const Contact = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your message has been sent to PlaySlot support team! ✉️', 'success');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div>
      <section style={{ background: '#0F172A', color: '#FFFFFF', padding: '50px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="badge badge-primary" style={{ marginBottom: '10px' }}>24/7 PLAYER SUPPORT</div>
          <h1 style={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: '900', marginBottom: '8px' }}>
            We're Here to Help
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Have a question regarding arena bookings, refund requests, or listing your sports property?
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {/* Contact Details */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '16px' }}>Get in Touch</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '24px' }}>
                Our team assists athletes and turf venue managers with reservations, timing changes, and billing queries.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    📞
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Helpline Phone</div>
                    <strong>+91 98765 43210 / +91 98201 23456</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--secondary-light)', color: 'var(--secondary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    ✉️
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Support Email</div>
                    <strong>support@playslot.com</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--accent-purple-light)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    🏢
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Headquarters</div>
                    <strong>PlaySlot Tech Park, Andheri West, Mumbai 400053</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiries Form */}
            <div className="summary-card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '16px' }}>Send Support Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label>Your Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Varun Kapoor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label>Email Address *</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label>Subject</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Slot cancellation, refund, venue partnership..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label>Your Message *</label>
                  <textarea
                    className="form-textarea"
                    rows="4"
                    placeholder="Write details of your inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Submit Inquiry ➔
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
