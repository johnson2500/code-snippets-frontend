/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NoteEditor from '../../components/markdownEditor/markdownEditor';

const getNoteId = (history) => {
  const { location = {} } = history;
  const { search } = location;

  const parsedSearch = search.replace('?', '');

  const splitSearch = parsedSearch.split('=');

  return parseInt(splitSearch[1], 10);
};

function ViewNote({
  notes = [],
  viewNote = {},
  auth,
}) {
  console.log(viewNote);
  const { note, editing } = viewNote;
  const history = useHistory();
  const noteId = getNoteId(history);

  // if refresh happens
  if (Object.keys(note).length === 0) {
    const noteData = notes.filter((item) => item.id === noteId);

    return (
      <NoteEditor
        note={noteData[0]}
        auth={auth}
        editing
      />
    );
  }

  return (
    <NoteEditor
      note={note}
      editing={editing}
    />
  );
}

ViewNote.propTypes = {
  notes: PropTypes.array,
  viewNote: PropTypes.object,
  auth: PropTypes.object,
};

ViewNote.defaultProps = {
  notes: [],
  viewNote: {},
  auth: {},
};

const mapStateToProps = (state) => ({
  viewNote: state.viewNote,
  notes: state.notes,
});

export default connect(mapStateToProps)(ViewNote);
