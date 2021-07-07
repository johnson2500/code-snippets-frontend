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

export default function SnippetViewer(props) {
  const {
    appState, setAppState, snippet, editing,
  } = props;
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

          // filter out the snippet with the id then re add to list.
          setAppState({
            ...appState,
            snippets: snippets.map((snip) => {
              console.log(snip, id);
              // if the id matches then update the list with the new snippets
              if (snip.id === id) {
                return {
                  code: codeState,
                  language: languageState,
                  title: titleState,
                  id: responseId,
                  description: descriptionState,
                };
              }
              return snip;
            }),
          });

          setTimeout(() => setMessage(''), 2000);

          setMessage('Saved!');
        })
        .catch((error) => {
          setMessage(error.message);
        });
      return;
    }

    console.log('Adding new Snippet');
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
    <>
      { editing ? <SnippetEditor /> : 'Viewing'}
    </>
  );
}

SnippetViewer
  .propTypes = {
    appState: PropTypes.object,
    setAppState: PropTypes.func,
    snippet: PropTypes.object,
  };

SnippetViewer
  .defaultProps = {
    appState: {},
    setAppState: () => {},
    snippet: {},
  };
