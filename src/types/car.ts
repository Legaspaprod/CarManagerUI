export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
}

export type EditField = 'brand' | 'model' | 'year' | 'price';


export interface CarFilters {
  brand?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  priceMin?: number;
  priceMax?: number;
}