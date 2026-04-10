import React from 'react';
import type { Car } from '../types/car';

interface StatisticsProps {
  stats: {
    total: number;
    averagePrice: number;
    mostExpensive: Car | null;
    cheapest: Car | null;
    priceRange: { min: number; max: number };
    yearRange: { min: number; max: number };
  };
}

export const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  if (stats.total === 0) {
    return (
      <div style={statsStyle}>
        <h3>📊 Статистика</h3>
        <p>Нет данных для статистики</p>
      </div>
    );
  }

  return (
    <div style={statsStyle}>
      <h3>📊 Статистика</h3>
      <div style={gridStyle}>
        <div style={statCardStyle}>
          <span style={statLabel}>Всего машин:</span>
          <span style={statValue}>{stats.total}</span>
        </div>
        <div style={statCardStyle}>
          <span style={statLabel}>Средняя цена:</span>
          <span style={statValue}>{Math.round(stats.averagePrice).toLocaleString()} ₽</span>
        </div>
        <div style={statCardStyle}>
          <span style={statLabel}>Диапазон цен:</span>
          <span style={statValue}>{stats.priceRange.min.toLocaleString()} - {stats.priceRange.max.toLocaleString()} ₽</span>
        </div>
        <div style={statCardStyle}>
          <span style={statLabel}>Диапазон годов:</span>
          <span style={statValue}>{stats.yearRange.min} - {stats.yearRange.max}</span>
        </div>
        <div style={statCardStyle}>
          <span style={statLabel}>Самая дорогая:</span>
          <span style={statValue}>{stats.mostExpensive?.brand} {stats.mostExpensive?.model} ({stats.mostExpensive?.price.toLocaleString()} ₽)</span>
        </div>
        <div style={statCardStyle}>
          <span style={statLabel}>Самая дешёвая:</span>
          <span style={statValue}>{stats.cheapest?.brand} {stats.cheapest?.model} ({stats.cheapest?.price.toLocaleString()} ₽)</span>
        </div>
      </div>
    </div>
  );
};

const statsStyle: React.CSSProperties = {
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: '#e8f5e9',
  borderRadius: '8px'
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '10px'
};

const statCardStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px',
  backgroundColor: 'white',
  borderRadius: '4px'
};

const statLabel: React.CSSProperties = {
  fontWeight: 'bold'
};

const statValue: React.CSSProperties = {
  color: '#4CAF50'
};