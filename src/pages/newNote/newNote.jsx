/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import MarkdownEditor from '../../components/markdownEditor/markdownEditor';

export default function EditPage(props) {
  const { appState, setAppState } = props;

  return (
    <MarkdownEditor
      appState={appState}
      setAppState={setAppState}
      note={{}}
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
