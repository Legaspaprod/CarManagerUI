import React from 'react';
import type { Car } from '../types/car';

interface CarStatsProps {
  cars: Car[];
}

export const CarStats: React.FC<CarStatsProps> = ({ cars }) => {
  const total = cars.length;
  const avgPrice = total > 0 ? cars.reduce((sum, c) => sum + c.price, 0) / total : 0;
  const mostExpensive = total > 0 ? cars.reduce((max, c) => c.price > max.price ? c : max) : null;
  const cheapest = total > 0 ? cars.reduce((min, c) => c.price < min.price ? c : min) : null;

  return (
    <div style={statsContainer}>
      <div style={statCard}>
        <h3>📊 Статистика</h3>
        <p>Всего машин: <strong>{total}</strong></p>
        <p>Средняя цена: <strong>{avgPrice.toLocaleString()} ₽</strong></p>
        {mostExpensive && (
          <p>💰 Самая дорогая: {mostExpensive.brand} {mostExpensive.model} - {mostExpensive.price.toLocaleString()} ₽</p>
        )}
        {cheapest && (
          <p>🪙 Самая дешёвая: {cheapest.brand} {cheapest.model} - {cheapest.price.toLocaleString()} ₽</p>
        )}
      </div>
    </div>
  );
};

const statsContainer: React.CSSProperties = {
  marginBottom: '20px'
};

const statCard: React.CSSProperties = {
  padding: '15px',
  backgroundColor: '#e9ecef',
  borderRadius: '8px'
};