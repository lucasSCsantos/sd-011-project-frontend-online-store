import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Comments from './Comments';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productObject: null,
      comments: [],
      counter: 1,
    };
    this.getProduct = this.getProduct.bind(this);
    this.addComment = this.addComment.bind(this);
    this.setItem = this.setItem.bind(this);
    this.getProduct();
  }

  async getProduct() {
    const { match: { params: { ProductId } }, category, query } = this.props;
    const products = await getProductsFromCategoryAndQuery(category, query);
    const product = products.results.find((prod) => prod.id === ProductId);
    const { title, id, price, thumbnail, attributes } = product;
    const productObject = {
      title,
      id,
      price,
      thumbnail,
      attributes,
    };
    this.setState({ productObject });
  }

  setItem = () => {
    const { location, someCounter } = this.props;
    const { state } = location;
    const { title, thumbnail, price, id } = state;
    const { counter } = this.state;
    this.setState((previous) => ({
      counter: previous.counter + 1,
    }));
    const obj = { title, thumbnail, price, id, counter };
    const objJSON = JSON.stringify(obj);
    localStorage.setItem(id, objJSON);
    someCounter();
  }

  addComment(comment = {}) {
    this.setState((state) => (
      { comments: [...state.comments, comment] }
    ));
  }

  render() {
    const { productObject, comments } = this.state;
    return (
      <div data-testid="product-detail-name">
        {(productObject === null)
          ? <p>Loading...</p>
          : <p>{ productObject.title }</p>}
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.setItem }
        >
          Adicionar ao carrinho
        </button>
        <Comments addComment={ this.addComment } comments={ comments } />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      ProductId: PropTypes.string,
    }),
  }).isRequired,
  category: PropTypes.string.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.string,
      price: PropTypes.number,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
  }).isRequired,
  query: PropTypes.string.isRequired,
  someCounter: PropTypes.func.isRequired,
};

export default ProductDetails;
