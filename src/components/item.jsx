
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { compose, withState } from 'recompose';

import { updatePost } from '../actions';

import './collections.css';

const enhance = compose(
  connect(null, {
    updatePost,
  }),
  withState('isEdit', 'setEdit', false),
  withState('postTitle', 'setPostTitle', props => props.item.post.title),
);

export default enhance(({
  item, idx,
  onDelete, onUpdate,
  postTitle, setPostTitle,
  isEdit, setEdit,
}) => (
  <tr>
    <th scope="row">{idx + 1}</th>
    <td>
      { !isEdit && item.post.title }
      { isEdit &&
      <input
        type="text"
        value={postTitle}
        onChange={evt => setPostTitle(evt.target.value)}
      /> }
    </td>
    <td>{ item.album.title }</td>
    <td>{ item.user.name }</td>
    <td>
      { isEdit ?
        <span>
          <Link
            className="action-edit"
            onClick={() => {
              setEdit(false);
              onUpdate(postTitle);
            }}
            tabIndex="-1"
          >
            <i className="fa fa-save" /> Save
          </Link>
          <Link
            onClick={() => {
              setPostTitle(item.post.title);
              setEdit(false);
            }}
            className="action-edit"
            tabIndex="-1"
          >
            <i className="fa fa-close" /> Cancel
          </Link>
        </span>
        : <span>
          <Link
            className="action-edit"
            onClick={() => setEdit(true)}
            tabIndex="-1"
          >
            <i className="fa fa-pencil" /> Edit
          </Link>
          <Link
            onClick={onDelete}
            className="action-edit"
            tabIndex="-1"
          >
            <i className="fa fa-trash" /> Delete
          </Link>
        </span>
      }
    </td>
  </tr>
));
