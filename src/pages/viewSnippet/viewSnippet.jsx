/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import SnippetEditor from '../../components/snippetEditor/snippetEditor';

const getSnippetId = (history) => {
  const { location = {} } = history;
  const { search } = location;

  const parsedSearch = search.replace('?', '');

  const splitSearch = parsedSearch.split('=');

  return parseInt(splitSearch[1], 10);
};

function EditPage(props) {
  const { viewSnippet = {}, auth, snippets = [] } = props;
  const { snippet } = viewSnippet;
  const history = useHistory();
  const snippetId = getSnippetId(history);

  // if refresh happens
  if (Object.keys(snippet).length === 0) {
    const snippetData = snippets.filter((item) => item.id === snippetId);

    return (
      <SnippetEditor
        snippet={snippetData[0]}
        auth={auth}
      />
    );
  }

  return (
    <SnippetEditor
      snippet={snippet}
      auth={auth}
    />
  );
}

EditPage.propTypes = {
  viewSnippet: PropTypes.object,
  auth: PropTypes.object,
  snippets: PropTypes.array,
};

EditPage.defaultProps = {
  viewSnippet: {},
  auth: {},
  snippets: [],
};

const mapStateToProps = (state) => ({
  viewSnippet: state.viewSnippet,
  auth: state.auth,
  snippets: state.snippets,
});

export default connect(mapStateToProps)(EditPage);
