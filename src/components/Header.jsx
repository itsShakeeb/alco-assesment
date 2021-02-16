import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  // const localCartLength = Object.keys(
  //   JSON.parse(localStorage.getItem("localcart"))
  // ).length;
  JSON.stringify();
  let localCartLength;
  if (!localStorage.getItem("localcart")) {
    let localcart = [];
    localStorage.setItem("localcart", JSON.stringify(localcart));
  } else {
    if (JSON.parse(localStorage.getItem("localcart")).length == 0) {
      localCartLength = 0;
    } else {
      localCartLength = JSON.parse(localStorage.getItem("localcart")).length;
    }
  }
  // console.log(localStorage.getItem("localcart"));
  // let localCartLength = localStorage.getItem("localcart")
  //   ? JSON.parse(localStorage.getItem("localcart"))
  //   : 0;

  // console.log(localCartLength.length);
  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    setCartItemCount(0);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Alco
          </Typography>
          <Link to='/cart'>
            <Badge badgeContent={localCartLength} color='error'>
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    // cartItemCount: state.addToCart.cartItemCount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
