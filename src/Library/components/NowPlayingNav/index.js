
import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom'

import Progress from '../Progress'

import { container, topSectionContainer, npImg, npDetailsContainer, npTitle, npArtist, npAlbum, npControllerContainer,
controlButtons } from './NowPlayingNavStyles.css'

const NowPlayingNav = ({}) => (
  <div className={container}>
    <div className={topSectionContainer}>
      <img className={npImg} src='https://upload.wikimedia.org/wikipedia/en/b/b2/Sonic_Youth_Goo.jpg'/>
      <div className={npDetailsContainer}>
        <div className={npTitle}>Dirty Boots</div>
        <div className={npArtist}>Sonic Youth</div>
        <div className={npAlbum}>Goo</div>
      </div>
      <div className={npControllerContainer}>
        <div className={controlButtons}>
          <img style={{height: '20px'}} src={require('./back.PNG')}/>
          <img style={{height: '20px'}} src={require('./play.PNG')}/>
          <img style={{height: '18px', position:'relative', 'top': '2px'}} src={require('./forward.PNG')}/>
        </div>
      </div>
    </div>
    <Progress percent={0.3}/>
  </div>
)

export default NowPlayingNav;