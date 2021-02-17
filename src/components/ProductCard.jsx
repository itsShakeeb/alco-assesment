import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 100 + "%",
    margin: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const { image, title, expanded, description, addToCart, price } = props;
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={image} title={title} />
      <CardContent>
        <Typography
          variant='body2'
          color='textSecondary'
          component='p'
        ></Typography>
        <CardActions disableSpacing>
          <Typography variant='body2' color='textSecondary' component='p'>
            {`$${price}`}
          </Typography>
          <Button size='large' color='secondary' onClick={addToCart}>
            Buy Now
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
