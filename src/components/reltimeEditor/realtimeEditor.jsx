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
  const {
    appState, editorSnippet,
  } = props;

  const {
    language: propsLanguage, id: propsId, code: propsCode, title: propsTitle,
  } = editorSnippet;

  const { firebase } = appState;

  const [languageState, setLanguage] = React.useState(propsLanguage);
  const [codeState, setCode] = React.useState(propsCode);
  const [titleState, setTitle] = React.useState(propsTitle);

  const [message, setMessage] = React.useState('');

  const classes = useStyles();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const saveSnippet = async () => {
    const token = await firebase.auth().currentUser;

    const { uid } = token;

    axios({
      method: 'post',
      url: 'http://localhost:4000/snippet',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        userId: uid,
        code: codeState,
        language: languageState,
        title: titleState,
        token: appState.token,
      },
    })
      .then((response) => {
        console.log(response);
        setMessage('Saved!');
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
      });
  };

  const deleteSnippet = async () => {
    const { token, userId } = appState;

    axios({
      method: 'delete',
      url: `http://localhost:4000/snippet?id=${propsId}&userId=${userId}&token=${token}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        setMessage('Saved!');
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
      });
  };

  const { language, code, title } = editorSnippet;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Input
          onChange={handleTitleChange}
          className={classes.formControl}
        >
          {title || titleState}
        </Input>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language || languageState}
            onChange={handleLanguageChange}
          >
            <MenuItem value="js">Javascript</MenuItem>
            <MenuItem value="sql">SQL</MenuItem>
            <MenuItem value="html">HTML</MenuItem>
          </Select>
        </FormControl>
        <CodeEditor
          value={code || codeState}
          language={language || languageState}
          placeholder={`Please enter ${language || languageState} code.`}
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
