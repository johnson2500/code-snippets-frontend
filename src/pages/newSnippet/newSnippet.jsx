/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SnippetEditor from '../../components/snippetEditor/snippetEditor';

function EditPage(props) {
  const { auth } = props;
  return (
    <SnippetEditor
      snippet={{}}
      editing
      auth={auth}
    />
  );
}

EditPage.propTypes = {
  auth: PropTypes.object,
};

EditPage.defaultProps = {
  auth: {},
};

const mapStateToProps = (state) => ({
  viewSnippet: state.viewSnippet,
  auth: state.auth,
  snippets: state.snippets,
});

export default connect(mapStateToProps)(EditPage);
