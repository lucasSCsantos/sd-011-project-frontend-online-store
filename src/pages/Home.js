import React, { Component } from 'react';
import { Categories, SearchInput } from '../components/zComponentsMenu';
import SearchList from './SearchList';
import * as api from '../services/api';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      inputText: '',
      products: '',
      radioFilter: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.showResults = this.showResults.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  componentDidMount() {
    this.getCategories();
    const { inputText } = this.state;
    if (inputText) {
      this.getQuery(inputText);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputText, radioFilter, loading } = this.state;
    if (prevState.loading !== loading || prevState.radioFilter !== radioFilter) {
      this.getQuery(radioFilter.id, inputText);
    }
  }

  handleInput = ({ target }) => {
    this.setState({ inputText: target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: false });
  };

  handleRadioClick = ({ target }) => {
    const categoryObj = { id: target.id, name: target.name };
    this.setState({ radioFilter: categoryObj });
  };

  async getCategories() {
    const categories = await api.getCategories();
    this.setState({ categories: categories });
  }

  async getQuery(category, product) {
    const getList = await api.getProductsFromCategoryAndQuery(category, product);
    return this.setState({ products: getList.results });
  }

  showResults = () => {
    const { handleAddToCart } = this.props;
    if (!this.state.loading)
      return <SearchList products={this.state.products} handleAddToCart={handleAddToCart} />;
  };

  render() {
    return (
      <div className="home-div">
        <SearchInput handleSubmit={this.handleSubmit} handleInput={this.handleInput} />
        <div className="search-results">
          <Categories handleRadioClick={this.handleRadioClick} />
          {this.showResults()}
        </div>
      </div>
    );
  }
}
