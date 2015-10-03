import React from 'react';

/**
 * Component for video background.
 */
export default class VideoBG extends React.Component {
  componentWillReceiveProps(nextProps) {
    // Based on simulate props start the video.
    if (this.props.simulate !== nextProps.simulate) {

      const video = React.findDOMNode(this.refs.video);
      video.play();
    }
  }

  render() {
    return (
      <div className="fullscreen-bg">
        <video loop muted ref="video" className="fullscreen-bg-video" poster="https://upload.wikimedia.org/wikipedia/commons/1/16/Wembley_Stadium_interior.jpg">
            <source src="https://dl.dropboxusercontent.com/u/19948477/pl_11-12.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }
}
