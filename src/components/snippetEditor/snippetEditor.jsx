/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Editor from './editor';

import { makeRequest } from '../../helpers';

export default function SnippetViewer(props) {
  const {
    appState, setAppState, snippet, editing,
  } = props;

  const {
    language, id, code, title, description,
  } = snippet;

  console.log('Snipet Viewer', snippet);

  const [languageState, setLanguage] = React.useState(language);
  const [codeState, setCode] = React.useState(code);
  const [titleState, setTitle] = React.useState(title);
  const [descriptionState, setDescription] = React.useState(description);

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

      setAppState({
        ...appState,
        snippets: newSnippets,
      });

      setEditingState(!editing);
      setSavedState(true);

      setTimeout(() => setSavedState(false), 3000);
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

  useEffect(() => {
    setLanguage(language);
    setCode(code);
    setTitle(title);
    setDescription(description);
    setEditingState(editing);
    setDeleted(false);
  }, [snippet]);

  const editorSnippet = {
    language,
    code,
    description,
    title,
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
};

SnippetViewer.defaultProps = {
  appState: {},
  setAppState: () => {},
  snippet: {},
  editing: true,
};
