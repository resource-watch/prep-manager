import React from 'react';
import PropTypes from 'prop-types';

// Services
import InsightsService from 'services/InsightsService';
import { toastr } from 'react-redux-toastr';

class DeleteAction extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.handleOnClickDelete = this.handleOnClickDelete.bind(this);

    // SERVICES
    this.service = new InsightsService();
  }

  handleOnClickDelete(e) {
    e && e.preventDefault() && e.stopPropagation();

    const { data } = this.props;

    toastr.confirm(`Are you sure that you want to delete: "${data.title}"`, {
      onOk: () => {
        this.service.deleteData(data.id)
          .then(() => {
            this.props.onRowDelete(data.id);
            toastr.success('Success', `The story "${data.id}" - "${data.title}" has been removed correctly`);
          })
          .catch((err) => {
            toastr.error('Error', `The story "${data.id}" - "${data.title}" was not deleted. Try again`);
            console.error(err);
          });
      },
      onCancel: () => console.info('canceled')
    });
  }

  render() {
    return (
      <span>
        <a href="#delete-dataset" onClick={this.handleOnClickDelete}> Remove </a>
      </span>
    );
  }
}

DeleteAction.propTypes = {
  data: PropTypes.object,
  onRowDelete: PropTypes.func
};

export default DeleteAction;
