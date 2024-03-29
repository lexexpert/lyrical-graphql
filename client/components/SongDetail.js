import React from 'react';
import {Link} from "react-router";
import {graphql} from "react-apollo";
import fetchSong from '../queries/fetchSong';
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends React.Component {
  render(){
    const {song} = this.props.data;

    if (!song) { return <div>Loading...</div> }

    return (
      <div>
        <Link to={'/'}>Back</Link>
        <h3>{song.title}</h3>
        <LyricCreate songId={this.props.params.id}/>
        <LyricList lyrics={song.lyrics}/>
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => {return {variables: {id: props.params.id}}}
})(SongDetail);
