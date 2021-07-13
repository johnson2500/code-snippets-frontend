/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import NoteEditor from '../../components/markdownEditor/markdownEditor';

export default function EditPage(props) {
  const { appState, setAppState } = props;
  const { view } = appState;
  const { note, editing } = view;

  return (
    <NoteEditor
      appState={appState}
      setAppState={setAppState}
      note={note}
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
