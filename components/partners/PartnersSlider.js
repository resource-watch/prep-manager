import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Redactions
import { getPartners } from 'redactions/admin/partners';

// Libraries
import Slider from 'react-slick';


const settings = {
  dots: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  swipe: false
};


class PartnersSlider extends React.Component {
  componentDidMount() {
    if (!this.props.data.length) {
      this.props.getPartners();
    }
  }

  render() {
    const partners = this.props.featured.map(d => (
      <div key={`partner-slider-${d.id}`}>
        <a href={d.url} target="_blank" className="logo" rel="noopener noreferrer">
          <img
            src={d.images.white_logo}
            alt={d.name}
          />
        </a>
      </div>
    ));

    return (
      <div className="c-partners-slider">
        {partners && partners.length > 0 &&
          <Slider {...settings}>
            {partners}
          </Slider>
        }
      </div>
    );
  }
}


PartnersSlider.propTypes = {
  data: PropTypes.array.isRequired,
  featured: PropTypes.array,
  // Actions
  getPartners: PropTypes.func.isRequired
};

PartnersSlider.defaultProps = {
  data: [],
  featured: []
};

const mapStateToProps = state => ({
  data: state.partners.partners.list,
  featured: state.partners.partners.list.filter(d => d.featured)
});

const mapDispatchToProps = dispatch => ({
  getPartners: () => dispatch(getPartners())
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnersSlider);
