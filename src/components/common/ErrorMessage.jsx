import React from 'react';

export const ErrorMessage = ({ message = 'An error occurred while processing your request.', onRetry = null }) => {
  return (
    <div
      style={{
        padding: '16px 20px',
        background: 'rgba(239, 68, 68, 0.08)',
        border: '1px solid rgba(239, 68, 68, 0.25)',
        borderRadius: '12px',
        color: '#DC2626',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '16px 0',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '1.2rem' }}>⚠️</span>
        <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-sm"
          style={{ background: '#DC2626', color: '#FFF', fontSize: '0.8rem' }}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
