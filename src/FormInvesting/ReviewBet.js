import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import "./ReviewBet.css";
import { motion } from "framer-motion";
//Firebase
import db from "../firebase";
import { useState, useEffect } from "react";

//Stripe js
import {loadStripe} from "@stripe/stripe-js"

//StripePromise
let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51KW5j3AUHkiFgFqfneVIj0l1wIhb8nIjVlCyeZeXa5weBFuiV4CdH0IwIHKOM01gZNIgwmqKV4RpMqPNnSBWTriI00SrgBIJbE");
  }
  return stripePromise;
};
console.log(process.env.REACT_APP_STRIPE_KEY + "key")


export default function ReviewBet(props) {
  const item = {
    price : "price_1KW5nqAUHkiFgFqfJQrI1j7V",
    quantity: 1

  }
 
  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/succes`,
    cancelUrl: `${window.location.origin}/cancel`
  };
  
  const redirectToCheckOut = async (e) => {
    e.preventDefault()
    console.log("redirect")
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);
  }

  const optionsLotery = () => {
    db.collection("optionsLoteryMoney")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          setOptions((options) => [...options, data]);
        });
      });
  };
  const [options, setOptions] = useState([]);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [Doit, setDoit] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Chose...");
 

  useEffect(() => {
    optionsLotery();
  }, []);



  const handleSubmit = (event) => {
    event.preventDefault();

    if (value) {
      setHelperText("Perfect✅");
      setError(false);
      setDoit(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };

  return (
    <div className="All">
      <div className="bg"></div>
      <motion.form
        animate={{ y: 0 }}
        initial={{ y: 200 }}
        transition={{ duration: 1 }}
        className="cardBet"
        onSubmit={redirectToCheckOut}
        
      >
        <FormControl sx={{ m: 3 }} error={error} variant="standard">
          <FormLabel style={{ color: "black" }} id="demo-error-radios">
         Review your bet
          </FormLabel>
          <hr />
          <div className="reviewBetText">
        <p  >You are making a bet that the value of <b>{props.Coin}</b> by <b>{props.Day}</b> is going to be <b>{props.CoinBet}</b>  </p>
        <div>
        <p >You are accpeting our <b>term and conditions</b></p>

        <p>You are betting <b >${props.Money} dollars</b></p>
        </div>
        </div>
          {/* <FormHelperText style={{color:"green"}}>{helperText}</FormHelperText> */}
          <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
            Go to check out 🤑
          </Button>
        </FormControl>
        
      </motion.form>
     {/* {Doit === true ? <FormInvestingBet Coin={props.Coin} day={props.Day}  Money={value}></FormInvestingBet> : null} */}
    </div>
  );
}