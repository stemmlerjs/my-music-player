
import config from 'config'
import axios from 'axios'
import musicMd from 'music-md'
import ObservableMediaSource from './ObservableMediaSource'

class TrackLoader {
  constructor () {
    this.baseUrl = config.apiRoot
  }

  getAllSongs () {
    return axios.get(this.baseUrl + "/songs")
  }

  getSongStream (id) {
    return new ObservableMediaSource(this.baseUrl + '/stream/' + id);
  }

  getSongInfo (id) {
    return axios.get(this.baseUrl + '/song/' + id, {
      responseType: "arraybuffer"
    })
  }

  getAlbumArt (album, artist, size) {
    return musicMd.getAlbum(album, artist, size);
  }

}

export default TrackLoader