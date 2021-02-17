import React, { useState } from "react";
import Header from "./Header";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

    width: 400 + "px",

    margin: "20px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "",
  },
  cover: {
    width: 250,
    height: 200,
  },
}));

function Cart() {
  const classes = useStyles();

  const theme = useTheme();
  let allItemOfCart = JSON.parse(localStorage.getItem("localcart"));
  const deleteItem = (id) => {
    let cartIndex = allItemOfCart.findIndex((item) => item.id === id);
    if (cartIndex > -1) {
      allItemOfCart.splice(cartIndex, 1);
      localStorage.setItem("localcart", JSON.stringify(allItemOfCart));
    }
    alert("Item Removed");
    window.location.reload(true);
  };
  console.log(allItemOfCart.length);
  let addingPrice = 0;
  let totalPrice = 0;
  let deliveryCharge = 0;
  let gst = 18;
  let bagTotal = 0;
  if (allItemOfCart.length == 0) {
    addingPrice = 0;
    totalPrice = 0;
    deliveryCharge = 0;
    gst = 18;
    bagTotal = 0;
  } else {
    addingPrice = allItemOfCart.map((product) => {
      return product.price;
    });
    totalPrice = addingPrice.reduce((curr, acc) => {
      return curr + acc;
    });
    deliveryCharge = 50;
    gst = (totalPrice + deliveryCharge) * 0.18;
    bagTotal = totalPrice + deliveryCharge + gst;
  }

  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "space-around  " }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {allItemOfCart.map((product, key) => (
            <Card key={key} className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component='p' variant='body2'>
                    {product.title}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {`$${product.price}`}
                  </Typography>
                  <Button
                    size='large'
                    color='secondary'
                    onClick={() => deleteItem(product.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image={product.image}
                title=''
              />
            </Card>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
            padding: "30px",
            lineHeight: "50px",
            width: "300px",
            height: "200px",
            border: "3px solid whitesmoke",
          }}
        >
          <div>
            <div className=''>Bag Total:</div>
            <div className=''>Delivery Charges:</div>
            <div className=''>GST </div>
            <div className=''>Order Total:</div>
          </div>
          <div>
            <div style={{ textAlign: "end" }}>{`$${totalPrice}`}</div>
            <div style={{ textAlign: "end" }}>{`$${deliveryCharge}`}</div>
            <div style={{ textAlign: "end" }}>{`18%`}</div>
            <div style={{ textAlign: "end" }}>{`$${bagTotal.toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
