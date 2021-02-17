import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProductList, addToCart, getCategory } from "../redux";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";

const ListOfProduct = (props) => {
  const location = useLocation();
  const pathName = location.pathname;
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { loading, error, productList, categoryData } = props;

  const pageLength = Math.ceil(productList.length / itemsPerPage);
  console.log(productList.length);
  console.log(pageLength);

  const categoryHandleChange = (event) => {
    setValue(event.target.value);
    // setValues({ ...values, gender: event.target.value });
  };
  const paginationHandler = (event) => {
    setCurrentPage((prevState) => prevState + 1);
    // console.log(page);
    // setCurrentPage(Number(event.target.id));
    console.log(Number(event.target.id));
  };
  const handleExpandClick = (id) => {
    if (id) {
      setExpanded(!expanded);
    }
  };

  const addToCartLocal = (product) => {
    props.addToCart(product);
    alert("Item added");
    window.location.reload(true);
  };
  const clearFilter = () => {
    setValue("");
    window.location.reload(true);
  };
  useEffect(() => {
    let localcart = [];
    if (!JSON.parse(localStorage.getItem("localcart"))) {
      JSON.stringify(localStorage.setItem("localcart", localcart));
    }
    props.getProductList();
    props.getCategory();
  }, []);

  console.log(value);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = productList.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(productList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const listOfProducts = currentItem.map((product, key) => (
    <div key={key} style={{ marginTop: "100px" }}>
      <ProductCard
        title={product.title}
        image={product.image}
        expanded={expanded}
        onClick={handleExpandClick}
        description={product.description}
        price={product.price}
        addToCart={() => addToCartLocal(product)}
      />
    </div>
  ));
  const filteredData = productList.filter((product, key) => {
    if (product.category == value) {
      return product;
    }
  });
  const listOfFilteredProduct = filteredData.map((product, key) => (
    <div key={key} style={{ marginTop: "100px" }}>
      <ProductCard
        title={product.title}
        image={product.image}
        expanded={expanded}
        onClick={handleExpandClick}
        description={product.description}
        price={product.price}
        addToCart={() => addToCartLocal(product)}
      />
    </div>
  ));
  return (
    <div>
      <div>
        {loading ? (
          <div>
            <h1>Loading....</h1>
          </div>
        ) : error ? (
          <div>
            <h1>{error}</h1>
          </div>
        ) : (
          <div>
            <h3 style={{ marginLeft: "30px" }}>Categories</h3>
            <div style={{ display: "flex" }}>
              {categoryData.map((choice, key) => (
                <div
                  key={key}
                  style={{
                    padding: "20px",
                    margin: "10px",
                  }}
                >
                  <input
                    type='radio'
                    value={choice}
                    name='category'
                    onChange={categoryHandleChange}
                  />
                  {choice.toUpperCase()}
                </div>
              ))}
            </div>
            <Button
              color='primary'
              style={{ marginLeft: "30px" }}
              onClick={clearFilter}
            >
              Clear Filter
            </Button>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto",
                padding: "10px",
              }}
            >
              {value ? listOfFilteredProduct : listOfProducts}
            </div>
          </div>
        )}
      </div>
      <div style={{ margin: "30px" }}>
        <Pagination
          count={pageNumbers.length}
          color='secondary'
          page={currentPage}
          onChange={paginationHandler}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    productList: state.productList.productListData,
    loading: state.productList.loading,
    error: state.productList.error,
    categoryData: state.categoryList.categoryData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: () => {
      dispatch(getProductList());
    },
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
    getCategory: () => {
      dispatch(getCategory());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListOfProduct);
