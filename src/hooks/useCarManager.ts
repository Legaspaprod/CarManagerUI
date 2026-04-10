import { useState, useEffect, useCallback } from 'react';
import type { Car, EditField } from '../types/car';
import { carManager } from '../core/CarManager';

export const useCarManager = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(() => {
    setCars(carManager.getAllCars());
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const addCar = useCallback((car: Omit<Car, 'id'>) => {
    const newCar = carManager.addCar(car);
    refreshData();
    return newCar;
  }, [refreshData]);

  const removeCar = useCallback((id: number) => {
    const result = carManager.removeCarById(id);
    refreshData();
    return result;
  }, [refreshData]);

  const editCar = useCallback((id: number, field: EditField, value: string | number) => {
    const result = carManager.editCar(id, field, value);
    refreshData();
    return result;
  }, [refreshData]);

  const editCarFull = useCallback((id: number, brand: string, model: string, year: number, price: number) => {
    const result = carManager.editCarFull(id, brand, model, year, price);
    refreshData();
    return result;
  }, [refreshData]);

  const findCarsByBrand = useCallback((brand: string) => {
    return carManager.findCarsByBrand(brand);
  }, []);

  const findCarsByModel = useCallback((model: string) => {
    return carManager.findCarsByModel(model);
  }, []);

  const findCarsByYear = useCallback((year: number) => {
    return carManager.findCarsByYear(year);
  }, []);

  const findCarsByPrice = useCallback((minPrice: number, maxPrice: number) => {
    return carManager.findCarsByPrice(minPrice, maxPrice);
  }, []);

  const sortByPriceAscending = useCallback(() => {
    const sorted = carManager.sortByPriceAscending();
    setCars(sorted);
  }, []);

  const sortByPriceDescending = useCallback(() => {
    const sorted = carManager.sortByPriceDescending();
    setCars(sorted);
  }, []);

  const getStatistics = useCallback(() => {
    return carManager.getStatistics();
  }, []);

  const saveToDB = useCallback(() => {
    carManager.saveToDB();
  }, []);

  return {
    cars,
    loading,
    addCar,
    removeCar,
    editCar,
    editCarFull,
    findCarsByBrand,
    findCarsByModel,
    findCarsByYear,
    findCarsByPrice,
    sortByPriceAscending,
    sortByPriceDescending,
    getStatistics,
    saveToDB,
    refreshData
  };
};