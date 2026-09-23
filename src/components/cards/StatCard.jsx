import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle = '',
  icon = '📊',
  trend = '',
  trendPositive = true,
  color = 'var(--primary-color)'
}) => {
  return (
    <div className="card glass-card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: 'var(--text-dark)' }}>
            {value}
          </div>
        </div>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem'
          }}
        >
          {icon}
        </div>
      </div>

      {(subtitle || trend) && (
        <div style={{ marginTop: '10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {trend && (
            <span style={{ color: trendPositive ? '#10B981' : '#EF4444', fontWeight: 700 }}>
              {trendPositive ? '↑' : '↓'} {trend}
            </span>
          )}
          {subtitle && <span style={{ color: 'var(--text-muted)' }}>{subtitle}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;
