import type { Car, EditField } from '../types/car';

class CarManager {
  private cars: Car[] = [];
  private nextId: number = 1;
  private storageKey: string = 'car_manager_data';

  constructor() {
    this.loadFromDB();
  }

  // -------------------- CRUD --------------------
  getAllCars(): Car[] {
    return [...this.cars];
  }

  getCarById(id: number): Car | null {
    const car = this.cars.find(c => c.id === id);
    return car || null;
  }

  addCar(car: Omit<Car, 'id'>): Car {
    const newCar: Car = {
      id: this.nextId++,
      ...car
    };
    this.cars.push(newCar);
    this.saveToDB();
    return newCar;
  }

  removeCarById(id: number): boolean {
    const index = this.cars.findIndex(c => c.id === id);
    if (index !== -1) {
      this.cars.splice(index, 1);
      this.saveToDB();
      return true;
    }
    return false;
  }

  editCar(id: number, field: EditField, value: string | number): boolean {
    const car = this.cars.find(c => c.id === id);
    if (!car) return false;

    switch (field) {
      case 'brand':
        car.brand = value as string;
        break;
      case 'model':
        car.model = value as string;
        break;
      case 'year':
        car.year = value as number;
        break;
      case 'price':
        car.price = value as number;
        break;
    }
    this.saveToDB();
    return true;
  }

  editCarFull(id: number, brand: string, model: string, year: number, price: number): boolean {
    const car = this.cars.find(c => c.id === id);
    if (!car) return false;
    
    car.brand = brand;
    car.model = model;
    car.year = year;
    car.price = price;
    this.saveToDB();
    return true;
  }

  // -------------------- Поиск --------------------
  findCarsByBrand(brand: string): Car[] {
    return this.cars.filter(c => c.brand.toLowerCase().includes(brand.toLowerCase()));
  }

  findCarsByModel(model: string): Car[] {
    return this.cars.filter(c => c.model.toLowerCase().includes(model.toLowerCase()));
  }

  findCarsByYear(year: number): Car[] {
    return this.cars.filter(c => c.year === year);
  }

  findCarsByYearRange(from: number, to: number): Car[] {
    return this.cars.filter(c => c.year >= from && c.year <= to);
  }

  findCarsByPrice(minPrice: number, maxPrice: number): Car[] {
    return this.cars.filter(c => c.price >= minPrice && c.price <= maxPrice);
  }

  // -------------------- Сортировка --------------------
  sortByPriceAscending(): Car[] {
    return [...this.cars].sort((a, b) => a.price - b.price);
  }

  sortByPriceDescending(): Car[] {
    return [...this.cars].sort((a, b) => b.price - a.price);
  }

  // -------------------- Статистика --------------------
  getStatistics() {
    if (this.cars.length === 0) {
      return {
        total: 0,
        averagePrice: 0,
        mostExpensive: null as Car | null,
        cheapest: null as Car | null,
        priceRange: { min: 0, max: 0 },
        yearRange: { min: 0, max: 0 }
      };
    }

    const prices = this.cars.map(c => c.price);
    const years = this.cars.map(c => c.year);
    const mostExpensive = this.cars.reduce((max, car) => car.price > max.price ? car : max);
    const cheapest = this.cars.reduce((min, car) => car.price < min.price ? car : min);

    return {
      total: this.cars.length,
      averagePrice: prices.reduce((a, b) => a + b, 0) / this.cars.length,
      mostExpensive,
      cheapest,
      priceRange: { min: Math.min(...prices), max: Math.max(...prices) },
      yearRange: { min: Math.min(...years), max: Math.max(...years) }
    };
  }

  // -------------------- Работа с хранилищем --------------------
  private loadFromDB(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.cars = data.cars || [];
        this.nextId = data.nextId || 1;
      } catch (e) {
        console.error('Failed to load data', e);
        this.loadDemoData();
      }
    } else {
      this.loadDemoData();
    }
  }

  private loadDemoData(): void {
    this.addCar({ brand: 'Toyota', model: 'Camry', year: 2020, price: 25000 });
    this.addCar({ brand: 'Honda', model: 'Civic', year: 2021, price: 22000 });
    this.addCar({ brand: 'BMW', model: 'X5', year: 2022, price: 60000 });
    this.addCar({ brand: 'Mercedes', model: 'E-Class', year: 2021, price: 55000 });
    this.addCar({ brand: 'Audi', model: 'A4', year: 2020, price: 35000 });
  }

  saveToDB(): void {
    localStorage.setItem(this.storageKey, JSON.stringify({
      cars: this.cars,
      nextId: this.nextId
    }));
  }

  clearAllData(): void {
    this.cars = [];
    this.nextId = 1;
    this.saveToDB();
  }
}

export const carManager = new CarManager();