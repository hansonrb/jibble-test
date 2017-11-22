
import React from 'react';
import { connect } from 'react-redux';

import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { map, uniqueId } from 'lodash';

import Item from './item';

import * as cx from '../actions/constants';
import { getPosts, getAlbums, getUsers, deleteCollection, updatePostTitle } from '../actions';

import './collections.css';

const enhance = compose(
  connect(({
    posts,
    albums,
    users,
    async,
  }) => ({
    posts,
    albums,
    users,
    status: async.statuses[cx.GET_POSTS] === 'success' &&
      async.statuses[cx.GET_ALBUMS] === 'success' &&
      async.statuses[cx.GET_USERS] === 'success',
  }), {
    getPosts,
    getAlbums,
    getUsers,
    deleteCollection,
    updatePostTitle,
  }),
  withState('isDeleteConfirmOpen', 'setDeleteConfirmOpen', false),
  withState('idxToDelete', 'setIdxToDelete', []),

  withHandlers({
    handleDelete: props => (cid) => {
      props.deleteCollection(cid);
    },
    handleUpdate: props => (title, idx) => {
      props.updatePostTitle({ title, idx });
    },
  }),
  withProps(props => ({
    collections: map(props.users, (u, k) => ({
      user: u, post: props.posts[k], album: props.albums[k],
    })),
  })),
  lifecycle({
    componentWillMount() {
      this.props.getUsers();
      this.props.getAlbums();
      this.props.getPosts();
    },
  }),
);

export default enhance(({
  collections,
  status,
  handleDelete, handleUpdate,
  isDeleteConfirmOpen, setDeleteConfirmOpen,
  idxToDelete, setIdxToDelete,
}) => (
  <div id="page-collections">
    <h2>Collections</h2>

    <Table striped hover responsive>
      <thead>
        <tr>
          <th style={{ width: '60px' }}>#</th>
          <th>Post Title</th>
          <th>Album Title</th>
          <th>User Name</th>
          <th style={{ width: '200px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        { status && collections.map((c, k) => (
          <Item
            item={c}
            idx={k}
            key={uniqueId()}
            onDelete={() => {
              setDeleteConfirmOpen(true);
              setIdxToDelete(k);
            }}
            onUpdate={(title) => {
              handleUpdate(title, k);
            }}
          />
        )) }
      </tbody>
    </Table>

    <Modal isOpen={isDeleteConfirmOpen} toggle={() => setDeleteConfirmOpen(!isDeleteConfirmOpen)}>
      <ModalHeader toggle={() => setDeleteConfirmOpen(!isDeleteConfirmOpen)}>Confirm</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this record?
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          onClick={() => {
            handleDelete(idxToDelete);
            setDeleteConfirmOpen(!isDeleteConfirmOpen);
          }}
        >Yes</Button>{' '}
        <Button color="secondary" onClick={() => setDeleteConfirmOpen(!isDeleteConfirmOpen)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
));
