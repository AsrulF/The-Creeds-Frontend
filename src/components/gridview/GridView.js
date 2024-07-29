import React, { useState } from "react";
import Product from "../products/Product";
import "./gridview.css";
import { Button, Card, Col, Row } from "antd";
import { formatPrice } from "helpers/helpers";

const GridView = ({ products }) => {
  const productsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  console.log("product", products);
  return (
    <>
      <div className="products-container grid-cols-3 pl-8">
        {/* {displayedProducts.map((product) => {
          return (
            <Product
              key={product.id}
              image={`http://localhost:8000/uploads/${product.images[0]}`}
              name={product.title}
              id={product.id}
              price={product.price}
            ></Product>
          );
        })} */}
        {displayedProducts.map((product) => {
          return (
            <Row key={product.id} gutter={16}>
              <Col span={8}>
                <Card
                  hoverable
                  bordered={true}
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="productImg"
                      src={`http://localhost:8000/uploads/${product.images[0]}`}
                    />
                  }
                  actions={[
                    <Button
                      type="text"
                      block
                      href={`/detail-product/${product.id}`}
                      className="font-bold"
                      style={{ color: "#4fd1c5" }}
                    >
                      See Details
                    </Button>,
                  ]}
                >
                  <div className="border-t pt-2">
                    <p className="text-xs font-bold">{product.title}</p>
                    <p className="text-right">{formatPrice(product.price)}</p>
                  </div>
                </Card>
              </Col>
            </Row>
          );
        })}
      </div>
      <div className="flex justify-between mt-10 pl-8">
        <Button type="default" onClick={handlePrevPage} disabled={ currentPage === 1 ? true : false}>Previous</Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button type="default" onClick={handleNextPage} disabled={ currentPage === totalPages ? true : false }>Next</Button>
      </div>
    </>
  );
};

export default GridView;
