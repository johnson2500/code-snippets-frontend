/* eslint-disable react/no-unused-prop-types */
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
  Typography,
} from '@material-ui/core';
import {
  Edit, Save, Delete, Close,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

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
  cardHeader: {
    background: theme.palette.primary.dark,
  },
}));

export default function Editor(props) {
  const {
    snippet,
    editing,
    saved,
    onSaveHandler,
    onDeleteHandler,
    onCloseHandler,
    onEditHandler,
    onTitleChange,
    onDescriptionChange,
    onLanguageChange,
    onCodeChange,
  } = props;
  const {
    language, code, title, description,
  } = snippet;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {
        saved ? <Typography>Saved!</Typography> : ''
      }
      {
        editing ? (
          <CardHeader
            title="Editor"
            className={classes.cardHeader}
            action={(
              <div>
                <IconButton aria-label="save" onClick={onSaveHandler}>
                  <Save />
                </IconButton>
                <IconButton aria-label="delete" onClick={onDeleteHandler}>
                  <Delete />
                </IconButton>
                <IconButton aria-label="close" onClick={onCloseHandler}>
                  <Close />
                </IconButton>
              </div>
              )}
          />
        ) : (
          <CardHeader
            title={title}
            subheader={description}
            className={classes.cardHeader}
            action={(
              <div>
                <IconButton aria-label="settings" onClick={onEditHandler}>
                  <Edit />
                </IconButton>
                <IconButton aria-label="delete" onClick={onDeleteHandler}>
                  <Delete />
                </IconButton>
              </div>
              )}
          />
        )
        }
      <CardContent>
        {
            editing ? (
              <div>
                <div className={classes.gridRoot}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-required"
                        label="Title"
                        onChange={onTitleChange}
                        value={title}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-required"
                        label="Description"
                        value={description}
                        className={classes.fillContainer}
                        onChange={onDescriptionChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel id="language-select-label">Language</InputLabel>
                      <Select
                        labelId="language-select-label"
                        value={language}
                        onChange={onLanguageChange}
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
                  value={code}
                  language={language}
                  placeholder={`Please enter ${language} code.`}
                  onChange={onCodeChange}
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

Editor.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
  snippet: PropTypes.object,
  editing: PropTypes.bool,
  saved: PropTypes.bool,
  onCloseHandler: PropTypes.func,
  onDeleteHandler: PropTypes.func,
  onSaveHandler: PropTypes.func,
  onEditHandler: PropTypes.func,
  onTitleChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  onLanguageChange: PropTypes.func,
  onCodeChange: PropTypes.func,
};

Editor.defaultProps = {
  appState: {},
  setAppState: () => {},
  snippet: {},
  editing: true,
  saved: false,
  onCloseHandler: () => {},
  onDeleteHandler: () => {},
  onSaveHandler: () => {},
  onEditHandler: () => {},
  onTitleChange: () => {},
  onDescriptionChange: () => {},
  onLanguageChange: () => {},
  onCodeChange: () => {},
};
