import React from 'react';

export const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  const spinnerSize = size === 'small' ? '24px' : (size === 'large' ? '56px' : '40px');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', gap: '14px' }}>
      <div
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: '3px solid rgba(16, 185, 129, 0.15)',
          borderTopColor: 'var(--primary-color, #10B981)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}
      />
      {text && <div style={{ fontSize: '0.9rem', color: 'var(--text-muted, #64748B)', fontWeight: 600 }}>{text}</div>}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
