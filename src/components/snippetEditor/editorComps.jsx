/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import codeTheme from 'prism-react-renderer/themes/github';
import {
  Edit, Save, Delete, Close, FiberPin,
} from '@material-ui/icons';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Chip,
  CardHeader,
  IconButton,
  InputLabel,
} from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';

import { makeStyles } from '@material-ui/core/styles';
import { CODE_LANGUAGES } from '../../helpers/constants';

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: '100%',
  },
  cardHeader: {
    background: theme.palette.primary.dark,
  },
  editArea: {
    padding: 10,
  },
}));

export const highlight = (codeToHighlight) => (
  <Highlight {...defaultProps} theme={codeTheme} code={codeToHighlight} language="jsx">
    {({ tokens, getLineProps, getTokenProps }) => (
      <>
        {
            tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
              </div>
            ))
            }
      </>
    )}
  </Highlight>
);

export const EditSnippet = ({
  onTitleChange,
  title,
  language,
  onLanguageChange,
  onDeleteHandler,
  onCloseHandler,
  onSaveHandler,
}) => {
  const classes = useStyles();
  return (
    <CardHeader
      className={classes.cardHeader}
      title={(
        <Grid container spacing={1} className={classes.editArea}>
          <Grid item xs={6}>
            <TextField
              id="standard-required"
              label="Title"
              onChange={onTitleChange}
              value={title}
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
              labelId="language-select-label"
              value={language}
              onChange={onLanguageChange}
              label="Language"
              className={classes.fullWidth}
            >
              {
                CODE_LANGUAGES.map((lang) => <MenuItem value={lang}>{lang}</MenuItem>)
              }
            </Select>
          </Grid>
        </Grid>
      )}
      action={(
        <div>
          <IconButton aria-label="delete" onClick={onDeleteHandler}>
            <Delete />
          </IconButton>
          <IconButton aria-label="save" onClick={onSaveHandler}>
            <Save />
          </IconButton>
          <IconButton aria-label="close" onClick={onCloseHandler}>
            <Close />
          </IconButton>
        </div>
      )}
    />
  );
};

export const ViewSnippet = ({
  title,
  language,
  onDeleteHandler,
  onPinChange,
  pinned,
  onEditHandler,
}) => {
  const classes = useStyles();
  return (
    <CardHeader
      title={(
        <Grid container spacing={1} className={classes.editArea}>
          <Grid item xs={6}>
            {title}
          </Grid>
          <Grid item xs={6}>
            <Chip
              icon={<CodeIcon />}
              label={language}
              variant="outlined"
              className={classes.flexItem}
            />
          </Grid>
        </Grid>
      )}
      className={classes.cardHeader}
      action={(
        <div>
          <IconButton onClick={onDeleteHandler}>
            <Delete />
          </IconButton>
          <IconButton onClick={onPinChange}>
            <FiberPin color={pinned ? 'action' : 'disabled'} />
          </IconButton>
          <IconButton onClick={onEditHandler}>
            <Edit />
          </IconButton>
        </div>
      )}
    />
  );
};
