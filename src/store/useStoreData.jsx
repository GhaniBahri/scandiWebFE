import { GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCT_BY_ID } from './queries';
import { useQuery } from '@apollo/client';

export const useStoreData = () => {

  const AllProducts = () => useQuery(GET_PRODUCTS);
  // const Categories = () => useQuery(GET_CATEGORIES);
  const ProductsByCategory = (category) => useQuery(GET_PRODUCTS_BY_CATEGORY, { variables: {category}});
  const ProductById = (id) => useQuery(GET_PRODUCT_BY_ID, {variables: {id}})
  
  return { AllProducts, ProductsByCategory, ProductById };
}