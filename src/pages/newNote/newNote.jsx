/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MarkdownEditor from '../../components/markdownEditor/markdownEditor';

function EditPage(props) {
  const { auth } = props;

  return (
    <MarkdownEditor
      auth={auth}
      note={{}}
      editing
    />
  );
}

EditPage.propTypes = {
  // notes: PropTypes.array,
  auth: PropTypes.object,
};

EditPage.defaultProps = {
  // notes: [],
  auth: {},
};

const mapStateToProps = (state) => ({
  viewSnippet: state.viewSnippet,
  auth: state.auth,
  notes: state.notes,
});

export default connect(mapStateToProps)(EditPage);
