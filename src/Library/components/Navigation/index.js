import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom'

import NowPlayingNav from '../NowPlayingNav'

import { container, navItemsContainer } from './NavigationStyles.css'

const Navigation = ({ }) => (
  <div className={container}>
    <ul className={navItemsContainer}>
      <Link to={`/songs`}>
        Songs
      </Link>
      <Link to={`/artists`}>
        Artists
      </Link>
      <Link to={`/playlists`}>
        Playlists
      </Link>
    </ul>
    <NowPlayingNav/>
  </div>
)

export default Navigation;