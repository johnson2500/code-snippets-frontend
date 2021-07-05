/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';

import SnippetList from '../../components/snippetList/snippetList';
import RealtimeEditor from '../../components/reltimeEditor/realtimeEditor';

export default function Home(props) {
  const { appState, setAppState } = props;
  const { editorSnippet, snippets } = appState;

  useEffect(() => {
    console.log('Home Use Effect');
  }, []);

  return (
    <>
      <RealtimeEditor
        appState={appState}
        setAppState={setAppState}
        editorSnippet={editorSnippet}
      />
      <Divider />
      <SnippetList
        snippets={snippets}
        appState={appState}
        setAppState={setAppState}
      />
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
