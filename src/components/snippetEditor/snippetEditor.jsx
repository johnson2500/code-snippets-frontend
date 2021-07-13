/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Editor from './editor';

import { makeRequest } from '../../helpers';

export default function SnippetViewer(props) {
  const history = useHistory();
  const {
    appState, setAppState, snippet, editing, isNew,
  } = props;

  const {
    language = 'javascript', id, code, title, description, pinned,
  } = snippet;

  const [languageState, setLanguage] = React.useState(language);
  const [codeState, setCode] = React.useState(code);
  const [titleState, setTitle] = React.useState(title);
  const [descriptionState, setDescription] = React.useState(description);
  const [pinnedState, setPinnedState] = React.useState(pinned);

  const [editingState, setEditingState] = React.useState(editing);

  const [deletedState, setDeleted] = React.useState(false);
  const [savedState, setSavedState] = React.useState(false);

  const saveSnippetHandler = async () => {
    const { auth, snippets } = appState;
    const { token } = auth;

    const data = {
      code: codeState,
      language: languageState,
      title: titleState,
      description: descriptionState,
      pinned: pinnedState,
      id,
    };

    const isUpdate = !!id;

    try {
      const requestSnippet = await makeRequest({
        url: '/snippet',
        token,
        data,
        method: isUpdate ? 'put' : 'post',
      });

      const { id: responseId } = requestSnippet;

      let newSnippets = [];

      if (!isUpdate) {
        // new snipet creation
        newSnippets = [
          ...snippets,
          { ...data, id: responseId }];
      } else {
        newSnippets = snippets.map((snip) => {
          // if the id matches then update the list with
          if (snip.id === id) {
            return data;
          }
          return snip;
        });
      }

      setEditingState(false);

      setSavedState(true);

      setTimeout(() => setSavedState(false), 3000);

      if (isNew) {
        setAppState({
          ...appState,
          snippets: newSnippets,
          view: {
            snippet: { ...data, id: responseId },
            editing: false,
          },
        });
        history.push('/view-snippet');
      } else {
        setAppState({
          ...appState,
          snippets: newSnippets,
        });
      }
    } catch (error) {
      console.log(`Error: /snippet ${error.message}`);
    }
  };

  const deleteSnippetHandler = async () => {
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
        editorSnippet: newSnippets[0],
      });

      setDeleted(true);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const pinChangeHandler = async () => {
    setPinnedState(!pinnedState);

    const { auth, snippets = [] } = appState;
    const { token } = auth;

    // if this is new snippet return
    if (!id) {
      return;
    }

    try {
      await makeRequest({
        method: 'post',
        url: '/snippet/pin',
        data: {
          pinned: pinnedState,
          id,
        },
        token,
      });

      const newSnippets = snippets.map((snip) => {
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
        snippets: newSnippets,
        editorSnippet: newSnippets[0],
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    setLanguage(language);
    setCode(code);
    setTitle(title);
    setDescription(description);
    setEditingState(editing);
    setPinnedState(pinned);
    setDeleted(false);
  }, [snippet]);

  const editorSnippet = {
    language: languageState,
    code: codeState,
    description: descriptionState,
    title: titleState,
    pinned: pinnedState,
    deleted: false,
  };

  if (deletedState) {
    return (
      <>
        <Typography variant="h4">
          Deleted snippet!
        </Typography>
      </>
    );
  }

  return (
    <>
      <Editor
        // new
        onSaveHandler={saveSnippetHandler}
        onDeleteHandler={deleteSnippetHandler}
        onCloseHandler={() => setEditingState(false)}
        onEditHandler={() => setEditingState(true)}
        onTitleChange={(event) => setTitle(event.target.value)}
        onDescriptionChange={(event) => setDescription(event.target.value)}
        onLanguageChange={(event) => setLanguage(event.target.value)}
        onCodeChange={(event) => setCode(event.target.value)}
        onPinChange={pinChangeHandler}
        setAppState={setAppState}
        appState={appState}
        snippet={editorSnippet}
        editing={editingState}
        saved={savedState}
      />
    </>
  );
}

SnippetViewer.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
  snippet: PropTypes.object,
  editing: PropTypes.bool,
  isNew: PropTypes.bool,
};

SnippetViewer.defaultProps = {
  appState: {},
  setAppState: () => {},
  snippet: {},
  editing: true,
  isNew: false,
};
