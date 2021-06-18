import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuantityButton extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
    this.moreOne = this.moreOne.bind(this);
    this.lessOne = this.lessOne.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
  }

  componentDidMount() {
    this.setQuantity();
  }

  setQuantity() {
    const { product: { quantity } } = this.props;
    this.setState({
      quantity,
    });
  }

  moreOne() {
    this.setState((prevState) => ({
      quantity: prevState.quantity + 1,
    }), () => {
      const { product } = this.props;
      const products = JSON.parse(localStorage.getItem('products'));
      const currentIndex = products.map((value) => value.id).indexOf(product.id);
      products[currentIndex].quantity += 1;
      localStorage.setItem('products', JSON.stringify(products));
    });
  }

  lessOne() {
    this.setState((prevState) => ({
      quantity: prevState.quantity - 1,
    }), () => {
      const { product } = this.props;
      const products = JSON.parse(localStorage.getItem('products'));
      const currentIndex = products.map((value) => value.id).indexOf(product.id);
      products[currentIndex].quantity -= 1;
      localStorage.setItem('products', JSON.stringify(products));
    });
  }

  render() {
    const { quantity } = this.state;
    return (
      <div data-testid="shopping-cart-product-quantity">
        <button type="button" onClick={ this.moreOne }>+</button>
        <p>{quantity}</p>
        <button
          type="button"
          onClick={ this.lessOne }
          disabled={ quantity < 2 }
        >
          -
        </button>
      </div>
    );
  }
}

QuantityButton.propTypes = {
  product: PropTypes.shape(PropTypes.quantity),
}.isRequired;

export default QuantityButton;
