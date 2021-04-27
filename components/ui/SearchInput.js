import React from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'lodash/escapeRegExp';

// Next
import { Link } from 'routes';

// Components
import Icon from 'components/ui/Icon';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.input.value || undefined
    };
  }

  componentWillReceiveProps(nextProps) {
    const { input } = nextProps;
    const { value } = this.state;
    if (input && input.value && input.value !== value) {
      this.setState({
        value: input.value
      });
    }
  }

  onSearch = (e) => {
    this.setState({
      value: e.currentTarget.value || ''
    }, () => {
      if (this.props.onSearch) this.props.onSearch(escapeRegExp(this.state.value));
    });
  }

  render() {
    const { value } = this.state;
    const { link, input, buttonClass, helpLink } = this.props;

    return (
      <div className="c-search-input">
        <div className="c-field -fluid">
          <input
            className="-fluid"
            onChange={this.onSearch}
            placeholder={input.placeholder}
            value={value}
            type="search"
          />
          <Icon name="icon-search" className="-small" />
        </div>
        {helpLink && (
          <a className={`c-button -secondary`} style={{ marginRight: '10px' }} href="/how-to">Help</a>
        )}
        {link.route &&
          <Link route={link.route} params={link.params}>
            <a className={`c-button ${buttonClass}`}>{link.label}</a>
          </Link>
        }
      </div>
    );
  }
}

SearchInput.propTypes = {
  buttonClass: PropTypes.string,
  input: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired
};

SearchInput.defaultProps = {
  input: {},
  link: {},
  buttonClass: '-primary'
};

export default SearchInput;
