export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  availability: boolean;
  slug: string;
}

export interface ProductFilters {
  searchQuery?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortByPrice?: "asc" | "desc";
}

export interface ProductCreateData {
  title: string;
  description: string;
  category: string;
  price: number;
  availability: boolean;
  image: File;
}
