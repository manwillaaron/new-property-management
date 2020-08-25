import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import logo from '../../Logo-rentops-stripe.png';

class CheckoutForm extends Component {
  constructor() {
    super();
    this.state = {
      amount: ''
    };
  }

  async componentDidMount() {
    if (this.props.rent) {
      await this.setState({ amount: this.props.rent });
    } else if (this.props.rent === undefined) {
      await this.setState({ amount: 0 });
    }
  }

  onToken = token => {
    let { amount } = this.state;
    amount /= 1000;
    token.card = void 0;
    axios
      .post('/api/payment', { token, amount: this.state.amount })
      .then(res => alert(`Congratulations you paid Aaron ${amount}!`));
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <StripeCheckout
          name="Thanks"
          image={logo}
          description={` for paying online ${this.props.first_name}`}
          stripeKey={'pk_test_qfZLyMjZBTgRnZcqeXt24lTk00LsmXvBFC'}
          token={this.onToken}
          amount={this.state.amount * 100} //in cents
          currency="USD"
          panelLabel="Submit Payment"
          locale="en"
          allowRememberMe         
          billingAddress={false}
          zipCode={false}
        >
          <button className="payRent">Pay With Card</button>
        </StripeCheckout>
        <input value={'$'+ `${this.state.amount}`} />
      </div>
    );
  }
}

export default CheckoutForm;
