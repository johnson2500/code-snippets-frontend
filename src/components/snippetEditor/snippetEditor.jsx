/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Editor from './editor';
import store from '../../redux/store';

import { makeRequest } from '../../helpers';
import { ADD_SNIPPET, DELETE_SNIPPET, UPDATE_SNIPPET } from '../../redux/reducers/snippetsReducers';
import { SET_VIEW_SNIPPET } from '../../redux/reducers/viewSnippetReducers';

export default function SnippetViewer({
  snippet, auth, editing = false,
}) {
  const history = useHistory();

  const {
    language = 'javascript', id, content, title, pinned,
  } = snippet;

  const [languageState, setLanguage] = React.useState(language);
  const [contentState, setCode] = React.useState(content);
  const [titleState, setTitle] = React.useState(title);
  const [pinnedState, setPinnedState] = React.useState(pinned);

  const [editingState, setEditingState] = React.useState(false);

  const [deletedState, setDeleted] = React.useState(false);
  const [savedState, setSavedState] = React.useState(false);

  const saveSnippetHandler = async () => {
    const { token } = auth;

    const data = {
      content: contentState,
      language: languageState,
      title: titleState,
      pinned: pinnedState,
      id,
    };

    const isUpdate = !!id;

    const method = isUpdate ? 'put' : 'post';

    try {
      const requestSnippet = await makeRequest({
        url: '/snippet',
        token,
        data,
        method,
      });

      setEditingState(false);

      setSavedState(true);

      if (isUpdate) {
        store.dispatch({
          type: UPDATE_SNIPPET,
          payload: requestSnippet.data,
        });
      } else {
        store.dispatch({
          type: ADD_SNIPPET,
          payload: requestSnippet.data,
        });

        store.dispatch({
          type: SET_VIEW_SNIPPET,
          payload: snippet,
        });

        history.push(`/view-snippet?snippet=${requestSnippet.data.id}`);
      }
    } catch (error) {
      console.log(`Error: /snippet ${error.message}`);
    }
  };

  const deleteSnippetHandler = async () => {
    const { token } = auth;

    try {
      const idResponse = await makeRequest({
        method: 'delete',
        url: `/snippet/${id}`,
        token,
      });

      const { id: deletedSnippetId } = idResponse.data;

      store.dispatch({
        type: DELETE_SNIPPET,
        payload: deletedSnippetId,
      });

      setDeleted(true);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  // const pinChangeHandler = async () => {
  //   setPinnedState(!pinnedState);

  //   const { auth, snippets = [] } = appState;
  //   const { token } = auth;

  //   // if this is new snippet return
  //   if (!id) {
  //     return;
  //   }

  //   try {
  //     await makeRequest({
  //       method: 'post',
  //       url: '/snippet/pin',
  //       data: {
  //         pinned: pinnedState,
  //         id,
  //       },
  //       token,
  //     });

  //     const newSnippets = snippets.map((snip) => {
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
  //       snippets: newSnippets,
  //       editorSnippet: newSnippets[0],
  //     });
  //   } catch (error) {
  //     console.log(`Error: ${error}`);
  //   }
  // };

  useEffect(() => {
    setLanguage(language);
    setCode(content);
    setTitle(title);
    setEditingState(editing);
    setPinnedState(pinned);
    setDeleted(false);
  }, [snippet]);

  const editorSnippet = {
    language: languageState,
    code: contentState,
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
    <Editor
      onSaveHandler={saveSnippetHandler}
      onDeleteHandler={deleteSnippetHandler}
      onCloseHandler={() => setEditingState(false)}
      onEditHandler={() => setEditingState(true)}
      onTitleChange={(event) => setTitle(event.target.value)}
      onLanguageChange={(event) => setLanguage(event.target.value)}
      onCodeChange={(codeText) => setCode(codeText)}
      onPinChange={() => {}}
      snippet={editorSnippet}
      editing={editingState}
      saved={savedState}
    />
  );
}

SnippetViewer.propTypes = {
  snippet: PropTypes.object,
  editing: PropTypes.bool,
  // isNew: PropTypes.bool,
  auth: PropTypes.object,
};

SnippetViewer.defaultProps = {
  snippet: {},
  editing: false,
  // isNew: false,
  auth: {},
};
