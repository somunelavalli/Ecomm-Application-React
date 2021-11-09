import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

const PaymentForm = ({
  checkoutToken,
  backStep,
  onCaptureCheckout,
  nextStep,
  shippingData,
}) => {
  let rid = "";
  const finalAmount = parseFloat(
    checkoutToken.live.shipping.price.raw + checkoutToken.live.subtotal.raw
  ).toFixed(2);
  const launchRazorpay = async (event) => {
    console.log("Console1");
    const options = {
      key: process.env.REACT_APP_RAZORPAY_PUBLIC_KEY,
      amount: finalAmount * 100,
      currency: "INR",
      name: "Somu E-Comm APP",
      description: "E-Comm APP",
      handler: function (response) {
        console.log("Console2");
        console.log(response.razorpay_payment_id);
        rid = response.razorpay_payment_id;
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        const orderData = {
          line_items: checkoutToken.live.line_items,
          customer: {
            firstname: shippingData.firstName,
            lastname: shippingData.lastName,
            email: shippingData.email,
          },
          shipping: {
            name: "Primary",
            street: shippingData.address,
            town_city: shippingData.city,
            county_state: shippingData.shippingSubdivision,
            postal_zip_code: shippingData.pincode,
            country: shippingData.shippingCountry,
          },
          fulfillment: { shipping_method: shippingData.shippingOption },
          payment: {
            gateway: "razorpay",
            razorpay: {
              payment_id: rid,
            },
          },
        };
        onCaptureCheckout(checkoutToken.id, orderData);
      },
    };
    console.log(options);
    console.log("Console3");
    let razorpay = new window.Razorpay(options);
    console.log("Console4");
    nextStep();
    razorpay.open();
    event.preventDefault();
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Method
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={backStep}>
          Back
        </Button>
        <Button
          onClick={launchRazorpay}
          variant="contained"
          type="submit"
          color="primary"
        >
          Pay ₹{finalAmount}
        </Button>
      </div>
    </>
  );
};

export default PaymentForm;
