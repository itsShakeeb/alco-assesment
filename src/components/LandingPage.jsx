import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getCategory } from "../redux";

const LandingPage = (props) => {
  const params = useLocation();
  const { categoryData } = props;
  const categoryLinks = categoryData.categoryData.map((category, key) => (
    <div key={key}>
      {/* <Link to={category.replace(/ +/g, "-")}>{category}</Link> */}
      <Link to={category}>{category}</Link>
    </div>
  ));
  useEffect(() => {
    props.getCategory();
  }, [params.pathname]);
  return (
    <div>
      Categories
      <div>
        {categoryData.loading ? (
          <h1>Loading...</h1>
        ) : categoryData.error ? (
          <h1>{categoryData.error}</h1>
        ) : (
          categoryLinks
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    categoryData: state.categoryList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: () => {
      dispatch(getCategory());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
