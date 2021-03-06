import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';

class WidgetActionsTooltip extends React.Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.triggerMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.triggerMouseDown);
  }

  @Autobind
  triggerMouseDown(e) {
    const el = document.querySelector('.c-tooltip');
    const clickOutside = el && el.contains && !el.contains(e.target);
    if (clickOutside) {
      this.props.toggleTooltip(false);
    }
  }

  @Autobind
  handleClick(link) {
    switch (link) { // eslint-disable-line default-case
      case 'edit_widget':
        this.props.onEditWidget();
        break;
      case 'go_to_dataset':
        this.props.onGoToDataset();
        break;
      case 'share_embed':
        this.props.onShareEmbed();
        break;
      case 'download_pdf':
        this.props.onDownloadPDF();
    }
    this.props.toggleTooltip(false);
  }

  render() {
    return (
      <div className="c-widget-actions-tooltip">
        <ul>
          { this.props.isWidgetOwner &&
            <li>
              <button type="button" onClick={() => this.handleClick('edit_widget')}>
                Edit widget
              </button>
            </li>
          }
          <li>
            <button type="button" onClick={() => this.handleClick('share_embed')}>
              Share/Embed
            </button>
          </li>
          <li>
            <button type="button" onClick={() => this.handleClick('go_to_dataset')}>
              Go to dataset
            </button>
          </li>
          <li>
            <button type="button" onClick={() => this.handleClick('download_pdf')}>
              Download as PDF
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

WidgetActionsTooltip.propTypes = {
  isWidgetOwner: PropTypes.bool,
  toggleTooltip: PropTypes.func.isRequired,
  // Callbacks
  onGoToDataset: PropTypes.func.isRequired,
  onShareEmbed: PropTypes.func.isRequired,
  onEditWidget: PropTypes.func.isRequired,
  onDownloadPDF: PropTypes.func.isRequired
};

export default WidgetActionsTooltip;
