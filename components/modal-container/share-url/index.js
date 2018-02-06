import { connect } from 'react-redux';
import ShareUrl from './share-url-component';

const mapStateToProps = state => ({
  links: state.shareModal.links
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShareUrl);
