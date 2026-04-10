import React, { useState } from 'react';
import type { Car } from '../types/car';

interface FindMenuProps {
  onFindByBrand: (brand: string) => Car[];
  onFindByModel: (model: string) => Car[];
  onFindByYear: (year: number) => Car[];
  onFindByPrice: (min: number, max: number) => Car[];
  onFindById: (id: number) => Car | null;
  onResultsFound: (cars: Car[]) => void;
}

export const FindMenu: React.FC<FindMenuProps> = ({
  onFindByBrand,
  onFindByModel,
  onFindByYear,
  onFindByPrice,
  onFindById,
  onResultsFound
}) => {
  const [searchType, setSearchType] = useState<string>('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [id, setId] = useState('');

  const handleSearch = () => {
    let results: Car[] = [];
    
    switch (searchType) {
      case 'brand':
        results = onFindByBrand(brand);
        break;
      case 'model':
        results = onFindByModel(model);
        break;
      case 'year':
        results = onFindByYear(parseInt(year));
        break;
      case 'price':
        results = onFindByPrice(parseInt(minPrice), parseInt(maxPrice));
        break;
      case 'id':
        const car = onFindById(parseInt(id));
        results = car ? [car] : [];
        break;
    }
    
    onResultsFound(results);
  };

  return (
    <div style={menuStyle}>
      <h3>🔍 Поиск машин</h3>
      <div style={buttonGroupStyle}>
        <button onClick={() => setSearchType('brand')} style={searchButton}>По бренду</button>
        <button onClick={() => setSearchType('model')} style={searchButton}>По модели</button>
        <button onClick={() => setSearchType('year')} style={searchButton}>По году</button>
        <button onClick={() => setSearchType('price')} style={searchButton}>По цене</button>
        <button onClick={() => setSearchType('id')} style={searchButton}>По ID</button>
      </div>

      {searchType === 'brand' && (
        <div style={inputGroupStyle}>
          <input type="text" placeholder="Бренд" value={brand} onChange={(e) => setBrand(e.target.value)} style={inputStyle} />
          <button onClick={handleSearch} style={submitButton}>Найти</button>
        </div>
      )}

      {searchType === 'model' && (
        <div style={inputGroupStyle}>
          <input type="text" placeholder="Модель" value={model} onChange={(e) => setModel(e.target.value)} style={inputStyle} />
          <button onClick={handleSearch} style={submitButton}>Найти</button>
        </div>
      )}

      {searchType === 'year' && (
        <div style={inputGroupStyle}>
          <input type="number" placeholder="Год" value={year} onChange={(e) => setYear(e.target.value)} style={inputStyle} />
          <button onClick={handleSearch} style={submitButton}>Найти</button>
        </div>
      )}

      {searchType === 'price' && (
        <div style={inputGroupStyle}>
          <input type="number" placeholder="Мин. цена" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Макс. цена" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={inputStyle} />
          <button onClick={handleSearch} style={submitButton}>Найти</button>
        </div>
      )}

      {searchType === 'id' && (
        <div style={inputGroupStyle}>
          <input type="number" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} style={inputStyle} />
          <button onClick={handleSearch} style={submitButton}>Найти</button>
        </div>
      )}
    </div>
  );
};

const menuStyle: React.CSSProperties = {
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: '#e3f2fd',
  borderRadius: '8px'
};

const buttonGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginBottom: '15px',
  flexWrap: 'wrap'
};

const searchButton: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginTop: '10px'
};

const inputStyle: React.CSSProperties = {
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  flex: '1'
};

const submitButton: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};