import React, { useState } from 'react';
import type { Car } from '../types/car';

// Предопределенные данные для выпадающих списков
const BRANDS = [
  'Toyota',
  'Honda',
  'BMW',
  'Mercedes',
  'Audi',
  'Lexus',
  'Volkswagen',
  'Ford',
  'Chevrolet',
  'Nissan',
  'Hyundai',
  'Kia',
  'Mazda',
  'Subaru',
  'Volvo',
  'Porsche',
  'Ferrari',
  'Lamborghini'
];

const MODELS_BY_BRAND: Record<string, string[]> = {
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius', 'Land Cruiser', 'Supra'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit', 'HR-V'],
  'BMW': ['X5', 'X3', '3 Series', '5 Series', '7 Series', 'M3', 'M5', 'i8'],
  'Mercedes': ['E-Class', 'C-Class', 'S-Class', 'GLE', 'GLC', 'G-Class', 'AMG GT'],
  'Audi': ['A4', 'A6', 'A8', 'Q5', 'Q7', 'R8', 'e-tron'],
  'Lexus': ['RX', 'ES', 'NX', 'LS', 'LX', 'IS'],
  'Volkswagen': ['Golf', 'Passat', 'Tiguan', 'Jetta', 'Polo', 'ID.4'],
  'Ford': ['Focus', 'Mustang', 'F-150', 'Explorer', 'Mondeo'],
  'Chevrolet': ['Camaro', 'Corvette', 'Malibu', 'Silverado', 'Equinox'],
  'Nissan': ['Altima', 'Maxima', 'Rogue', 'Leaf', 'GT-R', '370Z'],
  'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona'],
  'Kia': ['Optima', 'Sorento', 'Sportage', 'Stinger', 'Telluride'],
  'Mazda': ['3', '6', 'CX-5', 'CX-9', 'MX-5 Miata'],
  'Subaru': ['Outback', 'Forester', 'Impreza', 'Legacy', 'WRX'],
  'Volvo': ['XC90', 'XC60', 'S60', 'S90', 'V60'],
  'Porsche': ['911', 'Cayenne', 'Panamera', 'Macan', 'Taycan'],
  'Ferrari': ['488 GTB', 'F8 Tributo', 'SF90 Stradale', 'Roma'],
  'Lamborghini': ['Huracán', 'Aventador', 'Urus', 'Revuelto']
};

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1990 + 2 }, (_, i) => 1990 + i).reverse();

interface CarFormProps {
  onAddCar: (car: Omit<Car, 'id'>) => void;
}

export const CarForm: React.FC<CarFormProps> = ({ onAddCar }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [customBrand, setCustomBrand] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [useCustomBrand, setUseCustomBrand] = useState(false);
  const [useCustomModel, setUseCustomModel] = useState(false);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [priceError, setPriceError] = useState('');

  const availableModels = selectedBrand ? MODELS_BY_BRAND[selectedBrand] || [] : [];

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setSelectedModel('');
    setUseCustomModel(false);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setSelectedPrice(value);
      setPriceError('');
    } else {
      setPriceError('Цена должна быть числом');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const brand = useCustomBrand ? customBrand.trim() : selectedBrand;
    const model = useCustomModel ? customModel.trim() : selectedModel;
    const price = parseInt(selectedPrice);

    if (!brand) {
      alert('Выберите или введите бренд');
      return;
    }
    
    if (!model) {
      alert('Выберите или введите модель');
      return;
    }
    
    if (selectedYear < 1885 || selectedYear > CURRENT_YEAR + 1) {
      alert(`Год должен быть от 1885 до ${CURRENT_YEAR + 1}`);
      return;
    }
    
    if (isNaN(price) || price <= 0) {
      alert('Введите корректную цену');
      return;
    }

    onAddCar({
      brand,
      model,
      year: selectedYear,
      price
    });

    setSelectedBrand('');
    setSelectedModel('');
    setCustomBrand('');
    setCustomModel('');
    setSelectedYear(CURRENT_YEAR);
    setSelectedPrice('');
    setUseCustomBrand(false);
    setUseCustomModel(false);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={{ color: '#333', marginBottom: '15px' }}>➕ Добавить машину</h3>
      
      <div style={gridStyle}>
        {/* Бренд */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Бренд:</label>
          <div style={radioGroupStyle}>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                checked={!useCustomBrand}
                onChange={() => setUseCustomBrand(false)}
              />
              <span style={{ marginLeft: '5px' }}>Выбрать из списка</span>
            </label>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                checked={useCustomBrand}
                onChange={() => setUseCustomBrand(true)}
              />
              <span style={{ marginLeft: '5px' }}>Свой вариант</span>
            </label>
          </div>
          
          {!useCustomBrand ? (
            <select
              value={selectedBrand}
              onChange={handleBrandChange}
              required
              style={selectStyle}
            >
              <option value="" style={{ color: '#999' }}>-- Выберите бренд --</option>
              {BRANDS.map(brand => (
                <option key={brand} value={brand} style={{ color: '#000' }}>
                  {brand}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder="Введите бренд"
              value={customBrand}
              onChange={(e) => setCustomBrand(e.target.value)}
              required
              style={inputStyle}
            />
          )}
        </div>

        {/* Модель */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Модель:</label>
          <div style={radioGroupStyle}>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                checked={!useCustomModel}
                onChange={() => setUseCustomModel(false)}
                disabled={!selectedBrand && !useCustomBrand}
              />
              <span style={{ marginLeft: '5px' }}>Выбрать из списка</span>
            </label>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                checked={useCustomModel}
                onChange={() => setUseCustomModel(true)}
              />
              <span style={{ marginLeft: '5px' }}>Свой вариант</span>
            </label>
          </div>
          
          {!useCustomModel ? (
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedBrand && !useCustomBrand}
              required
              style={selectStyle}
            >
              <option value="" style={{ color: '#999' }}>-- Выберите модель --</option>
              {availableModels.map(model => (
                <option key={model} value={model} style={{ color: '#000' }}>
                  {model}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder="Введите модель"
              value={customModel}
              onChange={(e) => setCustomModel(e.target.value)}
              required
              style={inputStyle}
            />
          )}
        </div>

        {/* Год */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Год выпуска:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            required
            style={selectStyle}
          >
            {YEARS.map(year => (
              <option key={year} value={year} style={{ color: '#000' }}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Цена */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Цена (₽):</label>
          <input
            type="text"
            placeholder="Введите цену"
            value={selectedPrice}
            onChange={handlePriceChange}
            required
            style={inputStyle}
          />
          {priceError && <span style={errorStyle}>{priceError}</span>}
        </div>
      </div>

      <button type="submit" style={submitButton}>➕ Добавить машину</button>
    </form>
  );
};

// Стили с улучшенной видимостью
const formStyle: React.CSSProperties = {
  marginBottom: '20px',
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  border: '1px solid #ddd'
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '15px',
  marginBottom: '20px'
};

const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
};

const labelStyle: React.CSSProperties = {
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '5px'
};

const radioGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '15px',
  marginBottom: '8px'
};

const radioLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#333'
};

const selectStyle: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
  backgroundColor: '#fff',
  color: '#000',
  cursor: 'pointer'
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
  backgroundColor: '#fff',
  color: '#000'
};

const submitButton: React.CSSProperties = {
  padding: '12px 24px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  width: '100%'
};

const errorStyle: React.CSSProperties = {
  color: '#f44336',
  fontSize: '12px',
  marginTop: '3px'
};