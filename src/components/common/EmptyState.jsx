import React from 'react';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon = '🏟️',
  title = 'No Data Found',
  description = 'There are no records matching your criteria.',
  actionText = '',
  actionLink = '',
  onAction = null
}) => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '60px 24px',
        background: 'var(--card-bg, #FFFFFF)',
        border: '1px solid var(--border-color, #E2E8F0)',
        borderRadius: '16px',
        margin: '20px 0'
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{icon}</div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark, #0F172A)', marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-muted, #64748B)', fontSize: '0.92rem', maxWidth: '420px', margin: '0 auto 20px auto' }}>
        {description}
      </p>

      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary">
          {actionText}
        </Link>
      )}

      {actionText && onAction && !actionLink && (
        <button onClick={onAction} className="btn btn-primary">
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
