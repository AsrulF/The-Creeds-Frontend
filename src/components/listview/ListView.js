import React, { useState } from "react";
import { formatPrice } from "../../helpers/helpers";
import "./listview.css";
import { Link } from "react-router-dom";
import { Button } from "antd";

const ListView = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <section>
      {currentProducts.map((item) => (
        <article
          key={item.id}
          className="flex gap-x-3 bg-white ml-8 mb-4 p-4 items-center rounded-lg shadow-lg"
        >
          <img
            src={`http://localhost:8000/uploads/${item.images[0]}`}
            className="w-32"
            alt=""
          ></img>
          <div className="my-auto border-l pl-2">
            <p className="text-md font-bold text-[#102a42]">{item.title}</p>
            <p className="text-black">{formatPrice(item.price)}</p>
            <p className="mt-2 mb-3 text-[#102a42] text-sm">
              {item.description}
            </p>
            <Button
              type="default"
              href={`/detail-product/${item.id}`}
              className="font-bold"
            >
              See Details
            </Button>
          </div>
        </article>
      ))}
      <div className="flex justify-between mt-4 pl-8">
        <Button
          type="default"
          onClick={handlePrevPage}
          disabled={currentPage === 1 ? true : false}
        >
          Previous
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          type="default"
          onClick={handleNextPage}
          disabled={currentPage === totalPages ? true : false}
        >
          Next
        </Button>
      </div>
    </section>
  );
};

export default ListView;
