/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MDEditor from '@uiw/react-md-editor';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  CardHeader,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  Edit, Save, Delete, Close,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: 10,
  },
  gridRoot: {
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  fillContainer: {
    width: '100%',
  },
  cardHeader: {
    background: theme.palette.secondary.dark,
  },
  editor: {
    height: '300px !important',
  },
}));

export default function NoteEditor(props) {
  const {
    note,
    editing,
    saved,
    onSaveHandler,
    onDeleteHandler,
    onCloseHandler,
    onEditHandler,
    onTitleChange,
    onDescriptionChange,
    onTextChange,
  } = props;
  const {
    text, title, description,
  } = note;

  console.log(note);

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {
        saved ? <Typography>Saved!</Typography> : ''
      }
      {
        editing ? (
          <CardHeader
            className={classes.cardHeader}
            title="Editor"
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
            className={classes.cardHeader}
            title={title}
            subheader={description}
            action={(
              <IconButton aria-label="settings" onClick={onEditHandler}>
                <Edit />
              </IconButton>
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
                    <Grid item xs={6}>
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
                  </Grid>
                </div>
                <MDEditor
                  value={text}
                  onChange={(val) => onTextChange(val)}
                  height={300}
                />
              </div>
            )
              : (
                <CardContent>
                  <MDEditor
                    value={text}
                    onChange={(val) => onTextChange(val)}
                    height={300}
                  />
                </CardContent>
              )
        }
      </CardContent>
    </Card>
  );
}

NoteEditor.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
  note: PropTypes.object,
  editing: PropTypes.bool,
  saved: PropTypes.bool,
  onCloseHandler: PropTypes.func,
  onDeleteHandler: PropTypes.func,
  onSaveHandler: PropTypes.func,
  onEditHandler: PropTypes.func,
  onTitleChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  onLanguageChange: PropTypes.func,
  onTextChange: PropTypes.func,
};

NoteEditor.defaultProps = {
  appState: {},
  setAppState: () => {},
  note: {},
  editing: true,
  saved: false,
  onCloseHandler: () => {},
  onDeleteHandler: () => {},
  onSaveHandler: () => {},
  onEditHandler: () => {},
  onTitleChange: () => {},
  onDescriptionChange: () => {},
  onLanguageChange: () => {},
  onTextChange: () => {},
};
