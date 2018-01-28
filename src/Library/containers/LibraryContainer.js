import React, {Component} from 'react';
import Navigation from '../components/Navigation'
import Tracks from '../components/Tracks'

export default class LibraryComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: ''
    };
  }

  componentDidMount() {
    // Subscribe to changes
    // DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    // DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: 'sds'
    });
  }

  render() {
    return (
      <div>
        <Navigation/>
        <Tracks/>
      </div>
    );
  }
}