import React from 'react';

interface SortMenuProps {
  onSortAscending: () => void;
  onSortDescending: () => void;
}

export const SortMenu: React.FC<SortMenuProps> = ({ onSortAscending, onSortDescending }) => {
  return (
    <div style={menuStyle}>
      <h3>🔄 Сортировка по цене</h3>
      <div style={buttonGroupStyle}>
        <button onClick={onSortAscending} style={sortButton}>По возрастанию ↑</button>
        <button onClick={onSortDescending} style={sortButton}>По убыванию ↓</button>
      </div>
    </div>
  );
};

const menuStyle: React.CSSProperties = {
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: '#fff3e0',
  borderRadius: '8px'
};

const buttonGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px'
};

const sortButton: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#FF9800',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};