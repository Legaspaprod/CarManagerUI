import React from 'react';
import type { Car } from '../types/car';

interface CarListProps {
  cars: Car[];
  onDelete: (id: number) => void;
  onEdit: (car: Car) => void;
}

export const CarList: React.FC<CarListProps> = ({ cars, onDelete, onEdit }) => {
  if (cars.length === 0) {
    return <p>📭 Нет машин в базе данных</p>;
  }

  return (
    <div style={containerStyle}>
      <h3>📋 Список машин ({cars.length})</h3>
      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th>ID</th>
            <th>Бренд</th>
            <th>Модель</th>
            <th>Год</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id} style={rowStyle}>
              <td style={cellStyle}>{car.id}</td>
              <td style={cellStyle}>{car.brand}</td>
              <td style={cellStyle}>{car.model}</td>
              <td style={cellStyle}>{car.year}</td>
              <td style={cellStyle}>{car.price.toLocaleString()} ₽</td>
              <td style={cellStyle}>
                <button onClick={() => onEdit(car)} style={editButton}>✏️ Редактировать</button>
                <button onClick={() => onDelete(car.id)} style={deleteButton}>🗑️ Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
       </table>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  marginTop: '20px'
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

const headerRowStyle: React.CSSProperties = {
  backgroundColor: '#4CAF50',
  color: 'white'
};

const rowStyle: React.CSSProperties = {
  borderBottom: '1px solid #ddd'
};

const cellStyle: React.CSSProperties = {
  padding: '12px',
  textAlign: 'left'
};

const editButton: React.CSSProperties = {
  marginRight: '8px',
  padding: '5px 10px',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const deleteButton: React.CSSProperties = {
  padding: '5px 10px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};