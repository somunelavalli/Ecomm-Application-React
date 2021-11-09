import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = ({ checkoutToken }) => {
  console.log(checkoutToken.live);

  const finalAmount = parseFloat(
    checkoutToken.live.shipping.price.raw + checkoutToken.live.subtotal.raw
  ).toFixed(2);
  console.log(finalAmount);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="body2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Shipping Cost" />
          <Typography variant="subtitle1">
            {checkoutToken.live.shipping.price.formatted_with_symbol}
          </Typography>
        </ListItem>
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            ₹{finalAmount}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
