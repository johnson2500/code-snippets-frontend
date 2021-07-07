/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useHistory } from 'react-router-dom';
import {
  Chip, Card, CardContent, CardHeader, IconButton,
} from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import { Edit } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
  },
  flexItem: {
    padding: 10,
  },
});

export default function Snippet(props) {
  const {
    setAppState, appState, snippet,
  } = props;

  const history = useHistory();
  const { home = {} } = appState;

  const {
    code, language, title, description,
  } = snippet;

  const classes = useStyles();

  const editSnippetHandler = () => {
    setAppState({
      ...appState,
      editorSnippet: {
        ...snippet,
      },
      home: {
        ...home,
        editing: true,
      },
    });

    history.push('/');
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={title}
        subheader={description}
        action={(
          <IconButton aria-label="settings" onClick={editSnippetHandler}>
            <Edit />
          </IconButton>
        )}
      />
      <CardContent>
        <Chip
          icon={<CodeIcon />}
          label={language}
          variant="outlined"
          className={classes.flexItem}
        />
        <CodeEditor
          disabled
          value={code}
          language={language}
          placeholder={`Please enter ${language} code.`}
          padding={15}
          style={{
            fontSize: 13,
            backgroundColor: 'black',
            marginTop: 10,
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </CardContent>
    </Card>
  );
}

Snippet.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
  snippet: PropTypes.object,
};

Snippet.defaultProps = {
  appState: {},
  setAppState: () => {},
  snippet: {},
};
