/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Editor from './editor';

import { makeRequest } from '../../helpers';

export default function NoteViewer(props) {
  const {
    appState,
    setAppState,
    note,
    editing,
  } = props;

  const {
    id,
    text,
    title,
    description,
    pinned,
  } = note;

  const [textState, setTextState] = React.useState(text);
  const [titleState, setTitleState] = React.useState(title);
  const [descriptionState, setDescriptionState] = React.useState(description);
  const [pinnedState, setPinnedState] = React.useState(pinned);

  const [editingState, setEditingState] = React.useState(editing);

  const [deletedState, setDeleted] = React.useState(false);
  const [savedState, setSavedState] = React.useState(false);

  const saveNoteHandler = async () => {
    const { auth, notes } = appState;
    const { token } = auth;

    const data = {
      text: textState,
      title: titleState,
      description: descriptionState,
      pinned: pinnedState,
      id,
    };

    const isUpdate = !!id;

    try {
      const requestSnippet = await makeRequest({
        url: '/note',
        token,
        data,
        method: isUpdate ? 'put' : 'post',
      });

      const { id: responseId } = requestSnippet;

      let newNotes = [];

      if (!isUpdate) {
        newNotes = [
          ...notes,
          { ...data, id: responseId }];
      } else {
        newNotes = notes.map((snip) => {
          // if the id matches then update the list with
          if (snip.id === id) {
            return data;
          }
          return snip;
        });
      }

      setAppState({
        ...appState,
        notes: newNotes,
      });

      setEditingState(!editing);

      setSavedState(true);

      setTimeout(() => setSavedState(false), 3000);
    } catch (error) {
      console.log(`Error: /snippet ${error.message}`);
    }
  };

  const deleteNoteHandler = async () => {
    const { auth, snippets = [] } = appState;
    const { token } = auth;

    try {
      await makeRequest({
        method: 'delete',
        url: `/snippet/${id}`,
        token,
      });

      const newSnippets = snippets.filter((snip) => snip.id !== id) || [];

      setAppState({
        ...appState,
        snippets: newSnippets,
        editorNote: newSnippets[0],
      });

      setDeleted(true);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const pinChangeHandler = async () => {
    setPinnedState(!pinnedState);

    const { auth, notes = [] } = appState;
    const { token } = auth;

    // if this is new snippet return
    if (!id) {
      return;
    }

    try {
      await makeRequest({
        method: 'post',
        url: '/note/pin',
        data: {
          pinned: pinnedState,
          id,
        },
        token,
      });

      const newNotes = notes.map((snip) => {
        if (snip.id !== id) {
          return {
            ...snip,
            pinned: pinnedState,
          };
        }
        return snip;
      });

      setAppState({
        ...appState,
        notes: newNotes,
        editorSnippet: newNotes[0],
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    setTextState(text);
    setTitleState(title);
    setDescriptionState(description);
    setEditingState(editing);
    setDeleted(false);
  }, [note]);

  const editorNote = {
    text: textState,
    description: descriptionState,
    title: titleState,
    pinned: pinnedState,
    editing,
    deleted: false,
  };

  if (deletedState) {
    return (
      <>
        <Typography variant="h4">
          Note Deleted.
        </Typography>
      </>
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
        onDescriptionChange={(event) => { setDescriptionState(event.target.value); }}
        onTextChange={setTextState}
        onPinHandler={pinChangeHandler}
        setAppState={setAppState}
        appState={appState}
        note={editorNote}
        editing={editingState}
        saved={savedState}
      />
    </>
  );
}

NoteViewer.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
  note: PropTypes.object,
  editing: PropTypes.bool,
};

NoteViewer.defaultProps = {
  appState: {},
  setAppState: () => {},
  note: {},
  editing: true,
};
