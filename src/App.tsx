import React, { useState } from 'react';
import { useCarManager } from './hooks/useCarManager';
import { CarList } from './components/CarList';
import { CarForm } from './components/CarForm';
import { FindMenu } from './components/FindMenu';
import { EditMenu } from './components/EditMenu';
import { Statistics } from './components/Statistics';
import { SortMenu } from './components/SortMenu';
import type { Car } from './types/car';

function App() {
  const {
    cars,
    loading,
    addCar,
    removeCar,
    editCar,
    findCarsByBrand,
    findCarsByModel,
    findCarsByYear,
    findCarsByPrice,
    getCarById,
    sortByPriceAscending,
    sortByPriceDescending,
    getStatistics,
    saveToDB,
    refreshData
  } = useCarManager();

  const [searchResults, setSearchResults] = useState<Car[] | null>(null);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'search' | 'stats'>('list');

  const stats = getStatistics();
  const displayCars = searchResults !== null ? searchResults : cars;

  const handleResultsFound = (results: Car[]) => {
    setSearchResults(results);
    setActiveTab('search');
  };

  const handleClearSearch = () => {
    setSearchResults(null);
    setActiveTab('list');
  };

  const handleSave = () => {
    saveToDB();
    alert('Данные сохранены!');
  };

  const handleLoad = () => {
    refreshData();
    alert('Данные загружены!');
  };

  if (loading) {
    return <div style={containerStyle}>Загрузка...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🚗 Car Manager v1.0</h1>

      {/* Меню навигации */}
      <div style={navStyle}>
        <button onClick={() => setActiveTab('list')} style={navButton(activeTab === 'list')}>📋 Список</button>
        <button onClick={() => setActiveTab('search')} style={navButton(activeTab === 'search')}>🔍 Поиск</button>
        <button onClick={() => setActiveTab('stats')} style={navButton(activeTab === 'stats')}>📊 Статистика</button>
        <button onClick={handleSave} style={actionButton}>💾 Сохранить</button>
        <button onClick={handleLoad} style={actionButton}>📂 Загрузить</button>
      </div>

      {/* Форма добавления */}
      <CarForm onAddCar={addCar} />

      {/* Сортировка */}
      <SortMenu 
        onSortAscending={() => { sortByPriceAscending(); handleClearSearch(); }}
        onSortDescending={() => { sortByPriceDescending(); handleClearSearch(); }}
      />

      {/* Поиск */}
      {activeTab === 'search' && (
        <FindMenu
          onFindByBrand={findCarsByBrand}
          onFindByModel={findCarsByModel}
          onFindByYear={findCarsByYear}
          onFindByPrice={findCarsByPrice}
          onFindById={getCarById}
          onResultsFound={handleResultsFound}
        />
      )}

      {/* Статистика */}
      {activeTab === 'stats' && <Statistics stats={stats} />}

      {/* Список машин */}
      {(activeTab === 'list' || activeTab === 'search') && (
        <>
          {searchResults !== null && (
            <div style={searchInfoStyle}>
              <p>🔍 Найдено машин: {displayCars.length}</p>
              <button onClick={handleClearSearch} style={clearButton}>Показать все</button>
            </div>
          )}
          <CarList cars={displayCars} onDelete={removeCar} onEdit={setEditingCar} />
        </>
      )}

      {/* Модальное окно редактирования */}
      {editingCar && (
        <EditMenu car={editingCar} onEdit={editCar} onClose={() => setEditingCar(null)} />
      )}
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#4CAF50',
  marginBottom: '20px'
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginBottom: '20px',
  flexWrap: 'wrap'
};

const navButton = (isActive: boolean): React.CSSProperties => ({
  padding: '10px 20px',
  backgroundColor: isActive ? '#4CAF50' : '#f0f0f0',
  color: isActive ? 'white' : '#333',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
});

const actionButton: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const searchInfoStyle: React.CSSProperties = {
  padding: '10px',
  backgroundColor: '#e3f2fd',
  borderRadius: '4px',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const clearButton: React.CSSProperties = {
  padding: '5px 10px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default App;