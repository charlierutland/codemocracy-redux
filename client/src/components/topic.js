import React from 'react';
import { connect } from 'react-redux';
import { deleteTopic, upvote, downvote } from '../redux/actions';

class Topic extends React.Component {
  updateVoteScore (newCount) {
    const action = newCount > this.props.topic.score ? 'up' : 'down';
    fetch(`http://localhost:4000/topics/${this.props.topic._id}/${action}`, {
      method: 'PUT'
    }).then(
      action === 'up' ?
      this.props.upvote(this.props.topic._id) :
      this.props.downvote(this.props.topic._id)
    );
  }

  deleteTopic () {
    fetch(`http://localhost:4000/topics/${this.props.topic._id}`, {
      method: 'DELETE'
    }).then(
      this.props.deleteTopic(this.props.topic._id)
    );
  }

  render () {
    return (
      <div className="topic">
        <div>
          <button onClick={() => this.updateVoteScore(this.props.topic.score + 1)}>+</button>
            {this.props.topic.score}
          <button onClick={() => this.updateVoteScore(this.props.topic.score - 1)}>-</button></div>
        <div>
          <p>{this.props.topic.title}</p>
          <p>{this.props.topic.published_at}</p>
        </div>
        <div>
          <button onClick={() => this.deleteTopic()}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = null;
const mapDispatchToProps = dispatch => ({
  deleteTopic: id => dispatch(deleteTopic(id)),
  upvote: id => dispatch(upvote(id)),
  downvote: id => dispatch(downvote(id)),
});


export default connect(mapStoreToProps, mapDispatchToProps)(Topic);