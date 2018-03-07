import React from 'react';
import PropTypes from 'prop-types';

const SectionIntro = (props) => {
  return (
    <div className={'c-section-intro'}>
      <div className="top-bar">
      </div>
      <div className="sliced" />
      <article className="c-article">
        <div className="row align-center">
          <div className="columns small-12 medium-8">
            {props.children}
          </div>
        </div>
      </article>
    </div>
  );
}

SectionIntro.propTypes = {
  children: PropTypes.any,
};

export default SectionIntro;
