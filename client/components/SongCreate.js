import React from 'react';
import gql from 'graphql-tag';
import {graphql} from "react-apollo";
import {Link, hashHistory} from "react-router";
import fetchSongs from '../queries/fetchSongs';

class SongCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {title: ''}
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        title: this.state.title
      },
      refetchQueries: [{query: fetchSongs}]
    }).then(() => {
      hashHistory.push('/')
    })
  }

  render() {
    return(
      <div>
        <Link to={'/'}>Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            type="text"
            onChange={event => this.setState({title: event.target.value})}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation CreateSong($title: String){
    addSong(title: $title){
      id,
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
