/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CodeEditor from 'react-simple-code-editor';
import codeTheme from 'prism-react-renderer/themes/github';
import { highlight, ViewSnippet, EditSnippet } from './editorComps';

const useStyles = makeStyles(() => ({
  card: {
    margin: 0,
    height: '100vh',
    padding: '0 !important',
    borderRadius: 0,
    overflow: 'hidden',
    maxWidth: 'calc(100vw -200px)',
  },
  cardContent: {
    padding: '0 !important',
    height: '100%',
    overflow: 'scroll',
  },
}));

export default function Editor({
  snippet,
  editing,
  saved,
  onSaveHandler,
  onDeleteHandler,
  onCloseHandler,
  onEditHandler,
  onTitleChange,
  onPinChange,
  onLanguageChange,
  onCodeChange,
}) {
  const {
    language, code, title, pinned,
  } = snippet;

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {
        saved ? <Typography>Saved!</Typography> : ''
      }
      {
        editing ? (
          <EditSnippet
            title={title}
            language={language}
            onTitleChange={onTitleChange}
            onLanguageChange={onLanguageChange}
            onDeleteHandler={onDeleteHandler}
            onCloseHandler={onCloseHandler}
            onSaveHandler={onSaveHandler}
          />
        ) : (
          <ViewSnippet
            title={title}
            pinned={pinned}
            language={language}
            onDeleteHandler={onDeleteHandler}
            onPinChange={onPinChange}
            onEditHandler={onEditHandler}
          />
        )
      }
      <CardContent className={classes.cardContent}>
        <CodeEditor
          value={code || ''}
          onValueChange={onCodeChange}
          highlight={highlight}
          padding={10}
          style={{
            fontFamily: '"Dank Mono", "Fira Code", monospace',
            ...codeTheme.plain,
          }}
        />
      </CardContent>
    </Card>
  );
}

Editor.propTypes = {
  snippet: PropTypes.object,
  editing: PropTypes.bool,
  saved: PropTypes.bool,
  onCloseHandler: PropTypes.func,
  onDeleteHandler: PropTypes.func,
  onSaveHandler: PropTypes.func,
  onEditHandler: PropTypes.func,
  onTitleChange: PropTypes.func,
  onLanguageChange: PropTypes.func,
  onCodeChange: PropTypes.func,
  onPinChange: PropTypes.func,
};

Editor.defaultProps = {
  snippet: {},
  editing: true,
  saved: false,
  onCloseHandler: () => {},
  onDeleteHandler: () => {},
  onSaveHandler: () => {},
  onEditHandler: () => {},
  onTitleChange: () => {},
  onLanguageChange: () => {},
  onCodeChange: () => {},
  onPinChange: () => {},
};
