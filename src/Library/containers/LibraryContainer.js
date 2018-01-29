import React, {Component} from 'react';
import Navigation from '../components/Navigation'
import Tracks from '../components/Tracks'
import TrackLoader from '../components/Tracks/loadData'
import PlayerController from '../components/NowPlayingNav/player'

export default class LibraryComponent extends Component {
  constructor(props) {
    super(props);
    this.trackLoader = new TrackLoader();
    this.playerController = new PlayerController();

    this.state = {
      tracks: [],
      artists: {},
      player: {
        isPlaying: false,
        track: null,
        currentTrackIndex: -1
      }
    };
  }
  
  componentWillMount() {
    this.trackLoader.getAllSongs()
      .then(this.handleIncomingSongs.bind(this))
  }

  /*
   * handleIncomingSongs
   * 
   * We first add the entire songs list to state as 'tracks'.
   * Then we retrieve all of the album artwork for songs we don't
   * have the artwork for.
   */

  handleIncomingSongs (response) {
    var songs = response.data.songs;
    this.setState(prevState => ({
      tracks: songs
    }))
    this.handleRetrieveAlbumArtworks();
  }

  /*
   * handleRetrieveAlbumArtworks
   * 
   * Gets all of the album artwork for each of the different
   * albums. Utilizes the music-md library that I wrote last 
   * year to do this.
   */

  handleRetrieveAlbumArtworks () {

    this.state.tracks.forEach((track) => {
      let artist = track.artist;
      let album = track.album;

      /*
       * First time adding this artist to the 'artists' obj.
       */

      if (!this.state.artists.hasOwnProperty(artist)) {
        let artists = Object.assign({}, this.state.artists);    
        artists[artist] = {};                       
        this.setState({artists});
      }

      /*
       * Adding an album to this artist's 'artist' obj.
       */

      else {

        // Need to seek the album artwork
        if (!this.state.artists[artist][album]) {

          let artists = Object.assign({}, this.state.artists);   
          artists[artist][album] = {};

          /*
           * Seek the album artworks, but don't do it too fast to not get
           * rate limited by LastFM.
           */

          setTimeout((() => {
            return this.trackLoader.getAlbumArt (album, artist, "small")
              .then((response) => {
                let albumArtwork = response.albumArtwork;
                console.log("just set the album artwork for", album, response)

                artists[artist][album].albumArtwork = albumArtwork

                this.setState({ artists: artists })

              })
              .catch((err) => {
                console.log(err)
              })
          }).bind(this), 50);
        }        

      }

    })
  }

  handleSelectTrack (track, trackIndex) {
    console.log("track selected", track, trackIndex)

    // Set current track
    this.playerController.setCurrentTrack(track);

    // Get stream [TODO: allow chunked data]
    this.trackLoader.getSongStream(track._id)
      .then((result) => {
        this.playerController.initAndPlay(result.data, this.onTrackEnd)
        
        /*
         * Set state to reflect the current song and the state of
         * the player has changed in order to
         * trigger a render of components.
         */

        this.setState({ player: { isPlaying: true, track: track, trackIndex: trackIndex }})

      })
  }
  
  handlePause () {
    this.playerController.pause();

   /*
    * Set state to reflect the current song and the state of
    * the player has changed in order to
    * trigger a render of components.
    */
   
    this.setState({ 
      player: { 
        ...this.state.player,
        isPlaying: false 
      }
    })
  }

  handleResume () {
    this.playerController.resume();

   /*
    * Set state to reflect the current song and the state of
    * the player has changed in order to
    * trigger a render of components.
    */
   
    this.setState({ 
      player: { 
        ...this.state.player,
        isPlaying: true 
      }
    })
  }

  find (trackIndex) {
    return this.state.tracks[trackIndex]
  }

  handleNext () {
    var newTrackIndex = this.state.player.trackIndex + 1;
    let newTrack = this.find(newTrackIndex);
    this.handleSelectTrack(newTrack, newTrackIndex)
  }

  onTrackEnd () {
    // this.nextSong();
  }

  render() {
    return (
      <div>
        <Navigation
          handlePause={this.handlePause.bind(this)}
          handleResume={this.handleResume.bind(this)}
          handleRestart={this.playerController.restart.bind(this)}    
          handleNext={this.handleNext.bind(this)} 
          isPlaying={this.state.player.isPlaying}
          currentTrack={this.state.player.track}
          currentArtwork={this.state.player.track ? this.state.artists[this.state.player.track.artist][this.state.player.track.album].albumArtwork : null }
        />
        <Tracks 
          tracks={this.state.tracks} 
          artists={this.state.artists}
          handleSelectTrack={this.handleSelectTrack.bind(this)}/>
      </div>
    );
  }
}