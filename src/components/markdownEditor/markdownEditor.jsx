/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Editor from './editor';

import { makeRequest } from '../../helpers';
import store from '../../redux/store';
import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from '../../redux/reducers/notesReducers';
import { SET_VIEW_NOTE } from '../../redux/reducers/viewNoteReducers';

export default function NoteViewer({
  note,
  editing,
  auth,
}) {
  const {
    id,
    content,
    title,
    pinned,
  } = note;

  const history = useHistory();

  const [contentState, setContentState] = React.useState(content);
  const [titleState, setTitleState] = React.useState(title);
  const [pinnedState, setPinnedState] = React.useState(pinned || false);

  const [editingState, setEditingState] = React.useState(editing);

  const [deletedState, setDeleted] = React.useState(false);
  const [savedState, setSavedState] = React.useState(false);

  const saveNoteHandler = async () => {
    const { token } = auth;

    const data = {
      content: contentState,
      title: titleState,
      pinned: pinnedState,
      id,
    };

    const isUpdate = !!id;

    try {
      const requestNote = await makeRequest({
        url: '/note',
        token,
        data,
        method: isUpdate ? 'put' : 'post',
      });

      setEditingState(!editing);

      setSavedState(true);

      if (isUpdate) {
        store.dispatch({
          type: UPDATE_NOTE,
          payload: requestNote.data,
        });
      } else {
        store.dispatch({
          type: ADD_NOTE,
          payload: requestNote.data,
        });

        store.dispatch({
          type: SET_VIEW_NOTE,
          payload: requestNote.data,
        });

        history.push(`/view-note?note=${requestNote.data.id}`);
      }
    } catch (error) {
      console.log(`Error: /snippet ${error.message}`);
    }
  };

  const deleteNoteHandler = async () => {
    const { token } = auth;

    try {
      const noteResponse = await makeRequest({
        method: 'delete',
        url: `/note/${id}`,
        token,
      });

      const { id: deletedNoteId } = noteResponse.data;

      setDeleted(true);

      store.dispatch({
        type: DELETE_NOTE,
        payload: deletedNoteId,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  // const pinChangeHandler = async () => {
  //   const { auth, notes = [] } = appState;
  //   const { token } = auth;

  //   // if this is new snippet return
  //   if (!id) {
  //     return;
  //   }

  //   try {
  //     await makeRequest({
  //       method: 'post',
  //       url: '/note/pin',
  //       data: {
  //         pinned: !pinnedState,
  //         id,
  //       },
  //       token,
  //     });

  //     setPinnedState(!pinnedState);

  //     const newNotes = notes.map((snip) => {
  //       if (snip.id !== id) {
  //         return {
  //           ...snip,
  //           pinned: pinnedState,
  //         };
  //       }
  //       return snip;
  //     });

  //     setAppState({
  //       ...appState,
  //       notes: newNotes,
  //       editorSnippet: newNotes[0],
  //     });
  //   } catch (error) {
  //     console.log(`Error: ${error}`);
  //   }
  // };

  useEffect(() => {
    setContentState(content);
    setTitleState(title);
    setEditingState(editing);
    setDeleted(false);
    setPinnedState(pinned);
  }, [note]);

  const editorNote = {
    content: contentState,
    title: titleState,
    pinned: pinnedState,
    editing,
    deleted: false,
  };

  if (deletedState) {
    return (
      <Typography variant="h4">
        Note Deleted.
      </Typography>
    );
  }

  return (
    <>
      <Editor
        onSaveHandler={saveNoteHandler}
        onDeleteHandler={deleteNoteHandler}
        onCloseHandler={() => setEditingState(false)}
        onEditHandler={() => setEditingState(true)}
        onTitleChange={(event) => setTitleState(event.target.value)}
        onTextChange={setContentState}
        onPinHandler={() => {}}
        note={editorNote}
        editing={editingState}
        saved={savedState}
      />
    </>
  );
}

NoteViewer.propTypes = {
  auth: PropTypes.object,
  note: PropTypes.object,
  editing: PropTypes.bool,
};

NoteViewer.defaultProps = {
  auth: {},
  note: {},
  editing: true,
};
