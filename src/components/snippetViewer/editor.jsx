/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CodeEditor from '@uiw/react-textarea-code-editor';
import CodeIcon from '@material-ui/icons/Code';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Chip,
  CardHeader,
  IconButton,
  InputLabel,
} from '@material-ui/core';
import {
  Edit, Save, Delete, Close,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { makeRequest } from '../../helpers';
import { CODE_LANGUAGES } from '../../helpers/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: 10,
  },
  gridRoot: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  fillContainer: {
    width: '100%',
  },
}));

export default function Editor(props) {
  const {
    appState, setAppState, snippet, editing,
  } = props;
  const {
    language, id, code, title, description,
  } = snippet;

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const saveSnippetHandler = async () => {
    const { auth, snippets } = appState;
    const { token } = auth;

    const data = {
      code: codeState,
      language: languageState,
      title: titleState,
      description: descriptionState,
      id,
    };

    const isUpdate = !!id;

    try {
      const requestSnippet = await makeRequest({
        url: '/snippet',
        token,
        data,
        method: isUpdate ? 'put' : 'post',
      });

      const { id: responseId } = requestSnippet;

      let newSnippets = [];

      if (!isUpdate) {
        newSnippets = [
          ...snippets,
          { ...data, id: responseId }];
      } else {
        newSnippets = snippets.map((snip) => {
          // if the id matches then update the list with
          if (snip.id === id) {
            return data;
          }
          return snip;
        });
      }

      setAppState({
        ...appState,
        snippets: newSnippets,
      });

      setEditingState(!editingState);
    } catch (error) {
      console.log(`Error: /snippet ${error.message}`);
    }
  };

  const deleteSnippetHandler = async () => {
    const { auth, snippets = [] } = appState;
    const { token, userId } = auth;

    try {
      await makeRequest({
        method: 'delete',
        url: `/snippet/${id}`,
        token,
      });

      const newSnippets = snippets.filter((snip) => snip.id !== id) || [];

      setAppState({
        ...appState,
        snippets: newSnippets,
        editorSnippet: newSnippets[0],
      });

      setDeleted(true);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const editSnippetHandler = () => {
    setEditingState(!editingState);
  };

  const closeSnippetHandler = () => {
    setEditingState(!editingState);
  };

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {
        editingState ? (
          <CardHeader
            title="Editor"
            action={(
              <div>
                <IconButton aria-label="save" onClick={saveSnippetHandler}>
                  <Save />
                </IconButton>
                <IconButton aria-label="delete" onClick={deleteSnippetHandler}>
                  <Delete />
                </IconButton>
                <IconButton aria-label="close" onClick={closeSnippetHandler}>
                  <Close />
                </IconButton>
              </div>
              )}
          />
        ) : (
          <CardHeader
            title={title}
            subheader={description}
            action={(
              <IconButton aria-label="settings" onClick={editSnippetHandler}>
                <Edit />
              </IconButton>
              )}
          />
        )
        }
      <CardContent>
        {
            editingState ? (
              <div>
                <div className={classes.gridRoot}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-required"
                        label="Title"
                        onChange={handleTitleChange}
                        value={titleState}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-required"
                        label="Description"
                        value={descriptionState}
                        className={classes.fillContainer}
                        onChange={handleDescriptionChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel id="language-select-label">Language</InputLabel>
                      <Select
                        labelId="language-select-label"
                        value={languageState}
                        onChange={handleLanguageChange}
                        label="Language"
                        className={classes.fillContainer}
                      >
                        {
                          CODE_LANGUAGES.map((lang) => <MenuItem value={lang}>{lang}</MenuItem>)
                        }
                      </Select>
                    </Grid>
                  </Grid>
                </div>
                <CodeEditor
                  disabled={false}
                  value={codeState}
                  language={languageState}
                  placeholder={`Please enter ${languageState} code.`}
                  onChange={(evn) => setCode(evn.target.value)}
                  padding={15}
                  style={{
                    fontSize: 12,
                    marginTop: 10,
                    backgroundColor: 'black',
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                  }}
                />
              </div>
            )
              : (
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
              )
        }
      </CardContent>
    </Card>
  );
}

SnippetEditor.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
  snippet: PropTypes.object,
  editing: PropTypes.bool,
};

SnippetEditor.defaultProps = {
  appState: {},
  setAppState: () => {},
  snippet: {},
  editing: true,
};
