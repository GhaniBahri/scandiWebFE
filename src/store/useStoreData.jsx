import { GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCT_BY_ID, CREATE_ORDER } from './queries';
import { useQuery, useMutation } from '@apollo/client';

export const useStoreData = () => {

  const [createOrderMutation, { data, loading, error}] = useMutation(CREATE_ORDER)

  const AllProducts = () => useQuery(GET_PRODUCTS);
  // const Categories = () => useQuery(GET_CATEGORIES);
  const ProductsByCategory = (category) => useQuery(GET_PRODUCTS_BY_CATEGORY, { variables: {category}});
  const ProductById = (id) => useQuery(GET_PRODUCT_BY_ID, {variables: {id}})
  const NewOrder = (input) => { return createOrderMutation({ variables: { input } })}
  
  return { 
    AllProducts, 
    ProductsByCategory, 
    ProductById, 
    NewOrder, 
    orderData: data, 
    orderLoading: loading, 
    orderError: error 
  };
}