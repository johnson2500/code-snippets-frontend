import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CodeEditor from '@uiw/react-textarea-code-editor';
import {
  Typography, Card, CardContent, CardActions, Button,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Snippet(props) {
  const {
    code, language, title, setAppState, appState,
  } = props;
  const [codeState, setCode] = React.useState(code);

  const classes = useStyles();

  const editSnippetHandler = () => {
    console.log(appState);
    setAppState({
      ...appState,
      editorSnippet: {
        code,
        language,
        title,
      },
    });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Snippet
        </Typography>
        <CodeEditor
          value={codeState}
          language={language}
          placeholder={`Please enter ${language} code.`}
          onChange={(evn) => setCode(evn.target.value)}
          padding={15}
          style={{
            fontSize: 12,
            margin: 10,
            backgroundColor: '#f5f5f5',
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </CardContent>
      <CardActions>
        <Button onClick={editSnippetHandler} size="small">Edit</Button>
      </CardActions>
    </Card>
  );
}

Snippet.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  title: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  appState: {
    firebase: { auth: PropTypes.object },
  },
  // eslint-disable-next-line react/require-default-props
  setAppState: {},
};
