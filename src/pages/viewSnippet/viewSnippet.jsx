/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import SnippetEditor from '../../components/snippetEditor/snippetEditor';

export default function EditPage(props) {
  const { appState, setAppState } = props;
  const { view } = appState;
  const { snippet, editing } = view;

  return (
    <SnippetEditor
      appState={appState}
      setAppState={setAppState}
      snippet={snippet}
      editing={editing}
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
