import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./style";

// const products = [
//   {
//     id: 1,
//     name: "Macbook Air",
//     description: "Apple Macbook Air",
//     price: "$999",
//     image:
//       "https://www.apple.com/v/macbook-air/k/images/overview/hero_endframe__ea0qze85eyi6_large_2x.jpg",
//   },
//   {
//     id: 2,
//     name: "Macbook Pro",
//     description: "Apple Macbook Pro",
//     price: "$1199",
//     image:
//       "https://www.apple.com/v/macbook-pro-13/h/images/overview/macos__3zitq287xeae_large_2x.png",
//   },
// ];

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
