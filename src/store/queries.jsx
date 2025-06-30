import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      inStock
      gallery
      description
      category{
        name
      }
      attributes {
        id
        name
        type
        options {
          id
          displayValue
          value
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category {
        name
      }
      attributes {
        id
        name
        type
        options {
          id
          displayValue
          value
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String!) {
    products(category: $category) {
      id
      name
      inStock
      gallery
      description
      category{
        name
      }
      attributes {
        id
        name
        type
        options {
          id
          displayValue
          value
        }
      }
      prices{
        amount
        formatted
        currency{ 
          label 
          symbol 
        }
      }
      brand
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

export const CREATE_ORDER = gql`
mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      total
      currency
      items {
        productId
        quantity
        price
        attributes
      }
    }
  }
`;