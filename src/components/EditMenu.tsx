import React, { useState } from 'react';
import type { Car, EditField } from '../types/car';

interface EditMenuProps {
  car: Car;
  onEdit: (id: number, field: EditField, value: string | number) => void;
  onClose: () => void;
}

export const EditMenu: React.FC<EditMenuProps> = ({ car, onEdit, onClose }) => {
  const [editField, setEditField] = useState<EditField | null>(null);
  const [newBrand, setNewBrand] = useState(car.brand);
  const [newModel, setNewModel] = useState(car.model);
  const [newYear, setNewYear] = useState(car.year);
  const [newPrice, setNewPrice] = useState(car.price);

  const handleEdit = () => {
    if (editField) {
      let value: string | number;
      switch (editField) {
        case 'brand':
          value = newBrand;
          break;
        case 'model':
          value = newModel;
          break;
        case 'year':
          value = newYear;
          break;
        case 'price':
          value = newPrice;
          break;
      }
      onEdit(car.id, editField, value);
      onClose();
    }
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h3>✏️ Редактирование машины ID: {car.id}</h3>
        <p>Текущие данные: {car.brand} {car.model} ({car.year}) - {car.price}₽</p>
        
        <div style={buttonGroupStyle}>
          <button onClick={() => setEditField('brand')} style={editButton}>Изменить марку</button>
          <button onClick={() => setEditField('model')} style={editButton}>Изменить модель</button>
          <button onClick={() => setEditField('year')} style={editButton}>Изменить год</button>
          <button onClick={() => setEditField('price')} style={editButton}>Изменить цену</button>
        </div>

        {editField === 'brand' && (
          <div style={inputGroupStyle}>
            <input type="text" value={newBrand} onChange={(e) => setNewBrand(e.target.value)} style={inputStyle} />
            <button onClick={handleEdit} style={saveButton}>Сохранить</button>
          </div>
        )}

        {editField === 'model' && (
          <div style={inputGroupStyle}>
            <input type="text" value={newModel} onChange={(e) => setNewModel(e.target.value)} style={inputStyle} />
            <button onClick={handleEdit} style={saveButton}>Сохранить</button>
          </div>
        )}

        {editField === 'year' && (
          <div style={inputGroupStyle}>
            <input type="number" value={newYear} onChange={(e) => setNewYear(parseInt(e.target.value))} style={inputStyle} />
            <button onClick={handleEdit} style={saveButton}>Сохранить</button>
          </div>
        )}

        {editField === 'price' && (
          <div style={inputGroupStyle}>
            <input type="number" value={newPrice} onChange={(e) => setNewPrice(parseInt(e.target.value))} style={inputStyle} />
            <button onClick={handleEdit} style={saveButton}>Сохранить</button>
          </div>
        )}

        <button onClick={onClose} style={closeButton}>Закрыть</button>
      </div>
    </div>
  );
};

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  minWidth: '400px'
};

const buttonGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginBottom: '15px',
  flexWrap: 'wrap'
};

const editButton: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#FF9800',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginTop: '10px',
  marginBottom: '10px'
};

const inputStyle: React.CSSProperties = {
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  flex: '1'
};

const saveButton: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const closeButton: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '10px'
};