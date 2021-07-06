/* eslint-disable no-debugger */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CodeEditor from '@uiw/react-textarea-code-editor';
import {
  Typography, Card, CardContent, CardActions, Button, FormControl, Select, MenuItem, Input,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 500,
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
  formControl: {
    display: 'flex',
  },
});

export default function SnippetEditor(props) {
  const { appState } = props;

  const { editorSnippet } = appState;
  const {
    language, id, code, title,
  } = editorSnippet;

  const [languageState, setLanguage] = React.useState('');
  const [codeState, setCode] = React.useState('');
  const [titleState, setTitle] = React.useState('');

  const [message, setMessage] = React.useState('');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const saveSnippet = async () => {
    const { auth } = appState;
    const { token, userId } = auth;

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/snippet`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        userId,
        token,
        code: codeState,
        language: languageState,
        title: titleState,
      },
    })
      .then((response) => {
        console.log(response);
        setMessage('Saved!');
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const deleteSnippet = async () => {
    const { token, userId } = appState;

    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/snippet?id=${id}&userId=${userId}&token=${token}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        setMessage('Success');
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Input
          onChange={handleTitleChange}
          className={classes.formControl}
          value={titleState || title}
        />
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={languageState || language}
            onChange={handleLanguageChange}
          >
            <MenuItem value="js">Javascript</MenuItem>
            <MenuItem value="sql">SQL</MenuItem>
            <MenuItem value="html">HTML</MenuItem>
          </Select>
        </FormControl>
        <CodeEditor
          value={codeState || code}
          language={languageState || language}
          placeholder={`Please enter ${languageState || language} code.`}
          onChange={(evn) => setCode(evn.target.value)}
          padding={15}
          style={{
            fontSize: 12,
            margin: 10,
            backgroundColor: '#f5f5f5',
            height: '50vh',
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </CardContent>
      <CardActions>
        <Button onClick={saveSnippet} size="small">Save</Button>
        <Button onClick={deleteSnippet} size="small">Delete</Button>
        <Typography>{message}</Typography>
      </CardActions>
    </Card>
  );
}

SnippetEditor.propTypes = {
  appState: {
    firebase: { auth: PropTypes.func },
  },
  //   setAppState: PropTypes.func,
  editorSnippet: {
    code: PropTypes.string,
    language: PropTypes.string,
    title: PropTypes.string,
  },
};

SnippetEditor.defaultProps = {
  appState: {
    firebase: {},
  },
  //   setAppState: () => {},
  editorSnippet: {},
};
