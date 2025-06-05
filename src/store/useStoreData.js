import { useState, useEffect } from 'react';
import { GET_PRODUCTS, GET_CATEGORIES, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCT_BY_ID } from './queries';

export const useStoreData = (client) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const getCategoryProducts = async (category) => {
    try{
      const {data} = await client.query({
        query: GET_PRODUCTS_BY_CATEGORY,
        variables: {category}
      });
      setProductCategory(data.products)
    } catch (err){
      console.error(err)
    }
  }

  const getProductDetails = async (id) => {
    try{
      const {data} = await client.query({
        query: GET_PRODUCT_BY_ID,
        variables: {id}
      });
      setProductDetails(data.product)
    } catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await client.query({
          query: GET_PRODUCTS
        });
        
        // Fetch categories
        const categoriesResponse =  await client.query({
          query: GET_CATEGORIES
        });

        setProducts(productsResponse.data.products);
        setCategories(categoriesResponse.data.categories);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [client]);

  return { products, categories, productCategory, productDetails, loading, error, getCategoryProducts, getProductDetails };
}