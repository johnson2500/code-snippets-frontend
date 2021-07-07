/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import RealtimeEditor from '../../components/reltimeEditor/realtimeEditor';
import Snippet from '../../components/snippet/snippet';

export default function Home(props) {
  const { appState, setAppState } = props;

  const { home, editorSnippet } = appState;
  const { editing = false } = home;

  return (
    <>
      {
        !editing
          ? (
            <RealtimeEditor
              appState={appState}
              setAppState={setAppState}
              snippet={editorSnippet}
            />
          )
          : (
            <Snippet
              appState={appState}
              setAppState={setAppState}
              snippet={editorSnippet}
            />
          )
}
    </>
  );
}

Home.propTypes = {
  appState: {
    firebase: { auth: PropTypes.func },
    snippets: PropTypes.array,
  },
  setAppState: PropTypes.func,
};
