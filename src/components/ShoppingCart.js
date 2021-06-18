import React, { Component } from 'react';
import closeButton from '../images/close-button.png';

export default class ShoppingCart extends Component {
  constructor() {
    super();
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this);
    const items = JSON.parse(localStorage.getItem('items'));
    const quantity = JSON.parse(localStorage.getItem('quantity'));
    this.state = {
      items,
      quantity,
    };
  }

  componentWillUnmount() {
    const { items, quantity } = this.state;
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('quantity', JSON.stringify(quantity));
  }

  increaseQuantity(event) {
    const { quantity } = this.state;
    const {
      target: { name, id },
    } = event;
    quantity[name][id] += 1;
    this.setState({
      quantity,
    });
  }

  decreaseQuantity(event) {
    const { quantity } = this.state;
    const {
      target: { name, id },
    } = event;
    if (quantity[name][id] >= 1) {
      quantity[name][id] -= 1;
    }
    this.setState({
      quantity,
    });
  }

  removeAllItems(event) {
    const { items } = this.state;
    const {
      target: { id },
    } = event;
    this.setState({
      items: items.filter((product) => product.id !== id),
    });
  }

  render() {
    let totalPrice = 0;
    const { items, quantity } = this.state;
    return (
      <div>
        {items === null ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )
          : items.map(
            ({ product: { title, thumbnail, price, id } }, index) => {
              totalPrice += price * quantity[index][id];
              return (
                <div key={ index } data-testid="shopping-cart-product-name">
                  <button type="button" onClick={ this.removeAllItems }>
                    <img
                      src={ closeButton }
                      alt="close button"
                      id={ id }
                    />
                  </button>
                  <img src={ thumbnail } alt="Foto do Produto" />
                  <p>{title}</p>
                  <button
                    name={ index }
                    id={ id }
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ this.decreaseQuantity }
                  >
                    -
                  </button>
                  <p data-testid="shopping-cart-product-quantity">
                    {`Quantidade: ${quantity[index][id]}`}
                  </p>
                  <button
                    name={ index }
                    id={ id }
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ this.increaseQuantity }
                  >
                    +
                  </button>
                  <p>{`Preço: R$${price}`}</p>
                </div>
              );
            },
          )}
        <p>{`Valor total: R$${totalPrice.toFixed(2)}`}</p>
      </div>
    );
  }
}
