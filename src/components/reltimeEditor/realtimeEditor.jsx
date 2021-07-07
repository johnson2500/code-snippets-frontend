/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable no-debugger */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CodeEditor from '@uiw/react-textarea-code-editor';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    minHeight: 500,
    margin: 10,
  },
  gridRoot: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function SnippetEditor(props) {
  const { appState, setAppState, snippet } = props;
  console.log(snippet);

  const {
    language, id, code, title, description,
  } = snippet;

  const [languageState, setLanguage] = React.useState(language);
  const [codeState, setCode] = React.useState(code);
  const [titleState, setTitle] = React.useState(title);
  const [descriptionState, setDescription] = React.useState(description);

  const [message, setMessage] = React.useState('');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const saveSnippet = async () => {
    const { auth, snippets } = appState;
    const { token, userId } = auth;

    console.log(token);

    if (id) {
      axios({
        method: 'put',
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
          description: descriptionState,
          id,
        },
      })
        .then((response) => {
          const { id: responseId } = response;

          setAppState({
            ...appState,
            snippets: [...snippets, {
              code: codeState,
              language: languageState,
              title: titleState,
              id: responseId,
              description: descriptionState,
            }],
          });

          setTimeout(() => setMessage(''), 2000);

          setMessage('Saved!');
        })
        .catch((error) => {
          setMessage(error.message);
        });
      return;
    }

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
        description: descriptionState,
      },
    })
      .then((response) => {
        const { id: responseId } = response;

        console.log(response);
        setAppState({
          ...appState,
          snippets: [...snippets, {
            code: codeState,
            language: languageState,
            title: titleState,
            id: responseId,
            description: descriptionState,
          }],
        });

        setTimeout(() => setMessage(''), 2000);

        setMessage('Saved!');
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const deleteSnippet = async () => {
    const { auth } = appState;
    const { token, userId } = auth;

    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/snippet?id=${id}&userId=${userId}&token=${token}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        const { snippets = [] } = appState;
        const newSnippets = snippets.filter((snip) => snip.id !== id) || [];

        setTimeout(() => setMessage(''), 2000);
        setMessage(`deleted ${id}`);

        setAppState({
          ...appState,
          snippets: newSnippets,
          editorSnippet: newSnippets[0],
        });
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.gridRoot}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="standard-required"
                label="Title"
                onChange={handleTitleChange}
                value={titleState}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="standard-required"
                label="Description"
                value={descriptionState}
                onChange={handleDescriptionChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                id="demo-simple-select"
                value={languageState}
                onChange={handleLanguageChange}
                label="Language"
              >
                <MenuItem value="js">Javascript</MenuItem>
                <MenuItem value="sql">SQL</MenuItem>
                <MenuItem value="html">HTML</MenuItem>
                <MenuItem value="r">R</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="php">php</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </div>
        <CodeEditor
          value={codeState}
          language={languageState}
          placeholder={`Please enter ${languageState} code.`}
          onChange={(evn) => setCode(evn.target.value)}
          padding={15}
          style={{
            fontSize: 12,
            marginTop: 10,
            backgroundColor: 'black',
            minHeight: '50vh',
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={saveSnippet}
          size="small"
        >
          {id ? 'Update' : 'Save'}
        </Button>
        <Button
          variant="contained"
          onClick={deleteSnippet}
          size="small"
        >
          Delete
        </Button>
        <Typography>{message}</Typography>
      </CardActions>
    </Card>
  );
}

SnippetEditor.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
  snippet: PropTypes.object,
};

SnippetEditor.defaultProps = {
  appState: {},
  setAppState: () => {},
  snippet: {},
};
