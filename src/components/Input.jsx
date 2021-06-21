import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange({ target }) {
    const { name, value } = target;
    this.setState(({ [name]: value }));
  }

  render() {
    const { query } = this.state;
    const { onClick } = this.props;
    return (
      <div className="input-search">
        <input
          className="h18"
          type="text"
          placeholder="Digite um termo"
          name="query"
          id="inpQuery"
          value={ query }
          onChange={ this.handleOnChange }
          data-testid="query-input"
        />
        <Link to="/">
          <button
            className="btn-search"
            type="button"
            name="query"
            id="butQuery"
            value={ query }
            onClick={ onClick }
            data-testid="query-button"
          >
            .
          </button>
        </Link>
      </div>
    );
  }
}

Input.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Input;
