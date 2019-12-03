import React, { Component } from 'react';
import './CheckoutForm.css';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import logo from './Logo-rentops-stripe.png'


class CheckoutForm extends Component {
  constructor() {
    super()
    this.state = {
      amount: ''
    }
  }

  async componentDidMount(){
    console.log(this.props);
    if(this.props.rent){
        await this.setState({ amount: this.props.rent})
    }else if(this.props.rent === undefined){
        await this.setState({ amount: 0})
    }
      
      console.log(this.state);
  }

  onOpened=()=>{
    console.log('this is opened')
  }

  onClosed=()=>{
    console.log('this is closed')
  }

  onToken = (token) => {
    console.log(token)
    let { amount } = this.state
    amount /= 1000
    console.log(amount)
    token.card = void 0
    axios.post('/api/payment', { token, amount: (this.state.amount) }).then(res => {
      console.log(res)
      alert(`Congratulations you paid Aaron ${amount}!`)
    })
  }

  render() {
    // console.log(typeof this.state.amount)
    console.log('hit chfor', this.props);

    return (
      <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
        <StripeCheckout
          name='Thanks' //header
          image={logo}
          description={` for paying online ${this.props.first_name}`} //subtitle - beneath header
          stripeKey={'pk_test_qfZLyMjZBTgRnZcqeXt24lTk00LsmXvBFC'} //public key not secret key
          token={this.onToken} //fires the call back
          amount={this.state.amount*100} //this will be in cents
          currency="USD" 
          // image={imageUrl} // the pop-in header image (default none)
          // ComponentClass="div" //initial default button styling on block scope (defaults to span)
          panelLabel="Submit Payment" //text on the submit button
          locale="en" //locale or language (e.g. en=english, fr=french, zh=chinese)
          opened={this.onOpened} //fires cb when stripe is opened
          closed={this.onClosed} //fires cb when stripe is closed
          allowRememberMe // "Remember Me" option (default true)
          billingAddress={false}
          // shippingAddress //you can collect their address
          zipCode={false}
        >
          <button

          className="payRent">Pay With Card</button>
        </StripeCheckout>
        <input value={`$${this.state.amount}`}
        // onChange={e=>this.setState({amount:e.target.value})}
        />
      </div>
    )
  }
}

export default CheckoutForm;




// import React, {Component} from 'react';
// import {CardElement, injectStripe} from 'react-stripe-elements';

// class CheckoutForm extends Component {
//   constructor(props) {
//     super(props);
//     this.submit = this.submit.bind(this);
//   }

//   async submit(ev) {
//     // User clicked submit
//   }

//   render() {
//     return (
//       <div className="checkout">
//         <p>Would you like to complete the purchase?</p>
//         <CardElement />
//         <button onClick={this.submit}>Send</button>
//       </div>
//     );
//   }
// }

// export default injectStripe(CheckoutForm);
