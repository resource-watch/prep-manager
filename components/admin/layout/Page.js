import { PureComponent } from 'react';
import { initGA } from 'utils/analytics';
import { setUser, getUserFavourites, getUserCollections } from 'redactions/user';
import { setRouter } from 'redactions/routes';

export default class Page extends PureComponent {
  static async getInitialProps({ asPath, pathname, query, req, store, isServer }) {
    const { user } = isServer ? req : store.getState();
    const url = { asPath, pathname, query };
    store.dispatch(setUser(user));
    await store.dispatch(getUserFavourites());
    await store.dispatch(getUserCollections());
    store.dispatch(setRouter(url));
    return { user, isServer, url };
  }

  constructor(props) {
    super(props);

    // Google Analytics
    initGA();
  }
}
