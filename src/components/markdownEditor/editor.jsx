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
import FiberPinIcon from '@material-ui/icons/FiberPin';
import {
  Edit, Save, Delete, Close,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 !important',
    height: '100vh',
    borderRadius: 0,
    overflow: 'hidden',
  },
  fillContainer: {
    width: '100%',
  },
  cardHeader: {
    background: theme.palette.secondary.dark,
  },
  cardContent: {
    padding: '0 !important',
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
    onPinHandler,
    onTextChange,
  } = props;

  const {
    content,
    title,
    description,
    pinned,
  } = note;

  const classes = useStyles();

  return (
    <Card>
      {
        saved ? <Typography>Saved!</Typography> : ''
      }
      {
        editing ? (
          <CardHeader
            className={classes.cardHeader}
            title={(
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    id="standard-required"
                    label="Title"
                    onChange={onTitleChange}
                    value={title}
                  />
                </Grid>
              </Grid>
            )}
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
              <div>
                <IconButton aria-label="settings" onClick={onPinHandler}>
                  <FiberPinIcon
                    color={pinned ? 'action' : 'disabled'}
                  />
                </IconButton>
                <IconButton aria-label="settings" onClick={onEditHandler}>
                  <Edit />
                </IconButton>
              </div>
              )}
          />
        )
        }
      <CardContent className={classes.cardContent}>
        <MDEditor
          className={classes.editor}
          value={content}
          height="calc(100vh - 90px)"
          onChange={(val) => onTextChange(val)}
          enableScroll
        />
      </CardContent>
    </Card>
  );
}

NoteEditor.propTypes = {
  note: PropTypes.object,
  editing: PropTypes.bool,
  saved: PropTypes.bool,
  onCloseHandler: PropTypes.func,
  onDeleteHandler: PropTypes.func,
  onSaveHandler: PropTypes.func,
  onEditHandler: PropTypes.func,
  onTitleChange: PropTypes.func,
  onTextChange: PropTypes.func,
  onPinHandler: PropTypes.func,
};

NoteEditor.defaultProps = {
  note: {},
  editing: true,
  saved: false,
  onCloseHandler: () => {},
  onDeleteHandler: () => {},
  onSaveHandler: () => {},
  onEditHandler: () => {},
  onTitleChange: () => {},
  onTextChange: () => {},
  onPinHandler: () => {},
};
