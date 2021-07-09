/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import SnippetEditor from '../../components/snippetViewer/snippetViewr';

export default function EditPage(props) {
  const { appState, setAppState } = props;

  return (
    <SnippetEditor
      appState={appState}
      setAppState={setAppState}
      snippet={{
      }}
      editing
    />
  );
}

EditPage.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
};

EditPage.defaultProps = {
  appState: {},
  setAppState: () => {},
};
