import React, { useState } from "react";
import Header from "./Header";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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
  const allItemOfCart = JSON.parse(localStorage.getItem("localcart"));
  console.log(allItemOfCart);
  const addingPrice = allItemOfCart.map((product) => {
    return product.price;
  });
  const totalPrice = addingPrice.reduce((curr, acc) => {
    return curr + acc;
  });
  const deliveryCharge = 50;
  const gst = (totalPrice + deliveryCharge) * 0.18;
  const bagTotal = totalPrice + deliveryCharge + gst;

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
