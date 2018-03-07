/* eslint max-len: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Utils
import { belongsToACollection } from 'components/collections-panel/collections-panel-helpers';

// Components
import Page from 'components/app/layout/Page';
import Layout from 'components/app/layout/Layout';
import SectionIntro from 'components/app/common/section-intro';
import Icon from 'components/ui/Icon';
import Title from 'components/ui/Title';
import ShareModal from 'components/share-modal';

// Tooltip
import Tooltip from 'rc-tooltip/dist/rc-tooltip';
import CollectionsPanel from 'components/collections-panel';

// Widget Detail Components
import WidgetCard from 'components/widgets/list/WidgetCard';

class WidgetDetailComponent extends React.Component {
  static propTypes = {
    widgetDetail: PropTypes.object
  };

  componentDidMount() {
    const { origin } = window.location;
    const {id} = this.props.widgetDetail.data;

    this.props.setLinks({
      link: `${origin}/widget/${id }`,
      embed: `${origin}/embed/widget/${id }`
    });
  }

  handleShare = () => {
    this.props.setOpen(true);
  }

  render() {
    const {
      widgetDetail,
      user,
      url
    } = this.props;

    const { data: widget } = widgetDetail;

    const isInACollection = belongsToACollection(user, { id: widget.id });

    // Favorites
    const starIconName = classnames({
      'icon-star-full': isInACollection,
      'icon-star-empty': !isInACollection
    });

    const starIconClass = classnames({
      '-small': true,
      '-filled': isInACollection,
      '-empty': !isInACollection
    });

    return (
      <Layout
        title={widget.name}
        description={widget.description || ''}
        category="Widget"
        pageHeader
        url={url}
      >
        <div className="c-page-widget-detail">
          <div className="c-page-header">
            <div className="l-container">
              <div className="row">
                <div className="column small-12">
                  <div className="page-header-content">
                    <Title className="-primary -huge page-header-title -line -center" >
                      {widget.name}
                    </Title>
                    <h3 className="-center c-title page-header-title -subtitle">{widget.description}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="c-page-section">
            <div className="l-container">
              <div className="row">
                <div className="column small-12">
                  <SectionIntro>
                    <div className="toolbar-actions">
                      <div className="left"></div>
                      <div className="right">
                      <ul className="toolbar-actions-list">
                        <li>
                          <button
                            className="c-button -alternative -action"
                            onClick={this.handleShare}
                          >
                            <Icon
                              name="icon-share"
                              className="-small" />
                            <span>Share</span>
                          </button>
                        </li>

                        {/* Favorite widget icon */}
                        {user && user.id &&
                          <li>
                            {user && user.id &&
                              <Tooltip
                                overlay={
                                  <CollectionsPanel
                                    resource={widget}
                                    resourceType="widget"
                                  />
                                }
                                overlayClassName="c-rc-tooltip"
                                overlayStyle={{
                                  color: '#1a3e62'
                                }}
                                placement="bottom"
                                trigger="click"
                              >
                                <button
                                  className="c-button -alternative -action"
                                  tabIndex={-1}
                                >
                                  <Icon
                                    name={starIconName}
                                    className="-star -small"
                                  />
                                  <span>Favourite</span>
                                </button>
                              </Tooltip>
                            }
                          </li>
                        }
                      </ul>
                      </div>
                    </div>
                    <WidgetCard
                      widget={widget}
                      mode={'full'}
                    />
                  </SectionIntro>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ShareModal />
      </Layout>
    );
  }
}

export default WidgetDetailComponent;
