import React, { useEffect } from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../helpers/helpers";
import { FaCheck } from "react-icons/fa";
import { useProductsContext } from "context/product_context";
import { Button } from "antd";

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping,
    },
    updateFilters,
    all_products,
    clearFilters,
  } = useFilterContext();

  const { kategori, fetchCategory } = useProductsContext();

  console.log("kategori", kategori);
  const categories = ["all", ...kategori.map((kategori) => kategori.name)];
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");

  console.log("categories", categories);
  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              value={text}
              placeholder="search"
              onChange={updateFilters}
              className="search-input"
            />
          </div>
          {/* end of search input */}
          {/* category */}
          <div className="form-control justify-start p-3 rounded-lg">
            <h5 className="font-bold border-b">Category</h5>
            <div>
              {categories &&
                categories.map((c, index) => {
                  return (
                    <button
                      key={index}
                      onClick={updateFilters}
                      type="button"
                      name="category"
                      className={`${
                        category === c.toLowerCase()
                          ? "active button"
                          : "button"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
            </div>
          </div>
          {/* end of category */}
          {/* company */}
          <div className="form-control p-3 rounded-lg">
            <h5 className="font-bold border-b">Company</h5>
            <select
              name="company"
              value={company}
              onChange={updateFilters}
              className="company text-sm"
            >
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of company */}
          {/* colors */}
          <div className="form-control p-3 rounded-lg">
            <h5 className="font-bold border-b">Colors</h5>
            <div className="colors">
              {colors.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      name="color"
                      onClick={updateFilters}
                      data-color="all"
                      className={`${
                        color === "all"
                          ? "all-btn active button"
                          : "all-btn button"
                      }`}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <div>
                    <button
                      key={index}
                      name="color"
                      style={{ background: c }}
                      className={`${
                        color === c
                          ? "color-btn active button"
                          : "color-btn button"
                      }`}
                      data-color={c}
                      onClick={updateFilters}
                    >
                      {color === c ? <FaCheck /> : null}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          {/* end of colors */}
          {/* price */}
          <div className="form-control p-3 rounded-lg">
            <h5 className="font-bold border-b">Price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* end of price */}
          {/* shipping */}
          <div className="form-control shipping p-3 rounded-lg">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={updateFilters}
            />
          </div>
          {/* end of  shipping */}
        </form>
        {/* <button type="button" className="bg-white" onClick={clearFilters}>
          Clear Filters
        </button> */}
        <Button type="default" block onClick={clearFilters}>
          Clear Filter
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
    background-color: white;
  }
  .search-input {
    padding: 0.5rem;
    background: white;
    border-color: transparent;
    border-radius: 5px;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-radius: 5px;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
    margin-top: 6px;
    font-size: 15px;
    width: 100%;
  }

  button:hover {
    background-color: #4fd1c5;
  }

  .active {
    border-color: #000000;
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border-color: #000000;
    border: solid;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
    width: 125px;
    height: 30px;
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
