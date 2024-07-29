import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        "http://localhost:8000/api/products"
      );

      // Memotong array hasil response menjadi 14 data
      const limitedData = response.data.slice(0, 14);

      // Menetapkan data yang telah dipotong ke state
      setProducts(limitedData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products/${id}`
      );

      setProduct(response.data);
    } catch (err) {
      // Your code
      console.log(err);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/categories"
      )

      setKategori(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategory();
  }, []);

  

  return (
    <ProductsContext.Provider
      value={{
        products,
        product,
        setProduct,
        getProductById,
        setKategori,
        kategori,
        fetchCategory,
        loading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
