import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProductList, addToCart } from "../redux";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Pagination from "@material-ui/lab/Pagination";
import InputField from "./Category/InputField";

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
  };

  useEffect(() => {
    let localcart = [];
    if (!JSON.parse(localStorage.getItem("localcart"))) {
      JSON.stringify(localStorage.setItem("localcart", localcart));
    }
    props.getProductList();
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
    <div key={key}>
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
    <div key={key}>
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
            <div style={{ display: "flex" }}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Gender</FormLabel>
                <RadioGroup value={value} onChange={categoryHandleChange}>
                  {categoryData.map((choice, key) => (
                    <div key={key}>
                      <InputField
                        value={choice}
                        control={<Radio />}
                        label={choice.toUpperCase()}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            </div>

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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListOfProduct);
