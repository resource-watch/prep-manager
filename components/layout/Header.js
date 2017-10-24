export default () => {
  return (
    <header className="l-header">
      <div className={`l-header-nav ${currentData.name === 'home' ? '-no-bg' : ''}`}>
        <div className="row align-middle">
          <div className="column small-10 medium-4">
            <Link to={'/'} className="logo">
              <img src={logoImage} alt="Partnership for Resilience and Preparedness" />
            </Link>
          </div>
          <div className="column small-2 medium-8">
            <MainNav />
          </div>
        </div>
      </div>
      <div className="l-header-banner">
        <Breadcrumbs pathname={this.props.location.pathname} />
        <Banner
          bg={currentData.bannerBg}
          size={currentData.bannerSize}
          landing={isHomepage}
        >
          <h1>{currentData.title}</h1>
        </Banner>
      </div>
    </header>
  );
};
