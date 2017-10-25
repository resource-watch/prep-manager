import React from 'react';
import PropTypes from 'prop-types';
import { StickyContainer, Sticky } from 'react-sticky';

// Redux
import { connect } from 'react-redux';

// Components
import Aside from 'components/ui/Aside';
import MyPREPWidgetsMy from 'components/app/myprep/widgets/MyPREPWidgetsMy';
import MyPREPWidgetsStarred from 'components/app/myprep/widgets/MyPREPWidgetsStarred';

// Constants
const WIDGET_SUBTABS = [{
  label: 'Starred',
  value: 'starred',
  route: 'admin_myprep',
  params: { tab: 'widgets', subtab: 'starred' }
}, {
  label: 'My widgets',
  value: 'my_wigets',
  route: 'admin_myprep',
  params: { tab: 'widgets', subtab: 'my_widgets' }
}];

function WidgetsIndex(props) {
  const { id, user } = props;
  const subtab = props.subtab || 'starred';

  return (
    <div className="c-widgets-index">
      <StickyContainer>
        <div className="row l-row">
          <div className="columns small-12 medium-3">
            <Sticky>
              {
                ({ style }) => (
                  <div style={style}>
                    <Aside
                      items={WIDGET_SUBTABS}
                      selected={subtab}
                    />
                  </div>
                )
              }
            </Sticky>
          </div>

          <div className="columns small-12 medium-9">
            {subtab === 'starred' && user.id &&
              <MyPREPWidgetsStarred user={user} dataset={id} embed />
            }

            {subtab === 'my_widgets' && user.id &&
              <MyPREPWidgetsMy user={user} dataset={id} />
            }
          </div>

        </div>
      </StickyContainer>
    </div>
  );
}

WidgetsIndex.propTypes = {
  id: PropTypes.string,
  subtab: PropTypes.string,
  // Store
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(WidgetsIndex);
