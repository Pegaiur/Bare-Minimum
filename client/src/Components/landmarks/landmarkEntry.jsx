import React from 'react';
import $ from 'jquery';

const SERVER_URL = HOSTNAME;

const LandmarkEntry = (props) => {
  function handleClick() {
    const context = this;
    let obj = {
      landmarkId: props.landmark.id,
      userId: props.user.id
    };
    
    $.ajax({
      url: SERVER_URL + '/vote',
      method: 'POST',
      data: obj,
      success: function(body) {
        props.fetch();
      }
    });
  }

  const buttonState = () => {
    let showButton = true;
    for (let vote in props.landmark.votes) {
      if (props.user.id === props.landmark.votes[vote].userId) {
        showButton = false;
      }
    }
    return showButton;
  };

  return (
    <tr>
      <td><button style={buttonState() ? {} : { display: 'none' }} onClick={handleClick}>vote</button></td>
      <td>{props.landmark.description}</td>
      <td><a href={props.landmark.url}>{props.landmark.url}</a></td>
      <td>{props.landmark.address}</td>
      <td>{props.landmark.User.name}</td>
      <td>{props.landmark.votes.length}</td>
    </tr>
  );
};

export default LandmarkEntry;
