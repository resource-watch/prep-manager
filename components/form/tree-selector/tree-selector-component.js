import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DropdownTreeSelect from 'react-dropdown-tree-select';

import FormElement from './../FormElement';

class TreeSelector extends FormElement {
  shouldComponentUpdate() {
    return false;
  }

  triggerChange(selected) {
    this.setState({ selected, value: selected.map(s => s.value) }, () => {
      // Trigger validation
      this.triggerValidate();
      // Publish the new value to the form
      if (this.props.onChange) this.props.onChange(this.state.value);
    });
  }

  render() {
    const { showDropdown, placeholderText, data, onChange, classNames } = this.props;
    const datasetFilterClass = classnames({
      'c-tree-selector': true,
      classNames: !!classNames
    });

    return (
      <div className={datasetFilterClass}>
        <DropdownTreeSelect
          showDropdown={showDropdown}
          placeholderText={placeholderText}
          data={data}
          onChange={(_, selectedNodes) => this.triggerChange(selectedNodes)}
        />
      </div>
    );
  }
}

TreeSelector.propTypes = {
  data: PropTypes.array.isRequired,
  classNames: PropTypes.string,
  onChange: PropTypes.func,
  placeholderText: PropTypes.string,
  showDropdown: PropTypes.bool
};

TreeSelector.defaultProps = {
  data: [],
  showDropdown: true,
  onChange: () => {}
};

export default TreeSelector;
