/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Editor from './editor';

import { makeRequest } from '../../helpers';

export default function SnippetViewer(props) {
  const {
    appState, setAppState, snippet, editing,
  } = props;

  const {
    language, id, code, title, description,
  } = snippet;

  const [languageState, setLanguage] = React.useState(language);
  const [codeState, setCode] = React.useState(code);
  const [titleState, setTitle] = React.useState(title);
  const [descriptionState, setDescription] = React.useState(description);

  const [editingState, setEditingState] = React.useState(editing);

  const [deletedState, setDeleted] = React.useState(false);

  const handleLanguageChange = (event) => {
    console.log('Handle Language Change');
    setLanguage(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    console.log('Handle Description Change');
    setDescription(event.target.value);
  };

  const handleCodeChange = (event) => {
    console.log('Handle Language Change');
    setCode(event.target.value);
  };

  const editSnippetHandler = () => {
    console.log('Handle Edit Snippet Change');
    setEditingState(!editingState);
  };

  const closeSnippetHandler = () => {
    console.log('Handle Close Snippet Change');
    setEditingState(!editingState);
  };

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
    } catch (error) {
      console.log(`Error: /snippet ${error.message}`);
    }
  };

  const deleteSnippetHandler = async () => {
    const { auth, snippets = [] } = appState;
    const { token, userId } = auth;

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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const editorSnippet = {
    language: languageState,
    code: codeState,
    description: descriptionState,
    title: titleState,
    deleted: deletedState,
  };

  return (
    <>
      <Editor
        // new
        onSaveHandler={saveSnippetHandler}
        onDeleteHandler={deleteSnippetHandler}
        onCloseHandler={closeSnippetHandler}
        onEditHandler={editSnippetHandler}
        onTitleChange={handleTitleChange}
        onDescriptionChange={handleDescriptionChange}
        onLanguageChange={handleLanguageChange}
        onCodeChange={handleCodeChange}
        setAppState={setAppState}
        appState={appState}
        snippet={editorSnippet}
        editing={editingState}
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
