/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  Typography, Collapse, List, ListItem, ListItemText,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({

}));

const getFolders = (snippets) => {
  const folderNames = snippets.f;
};

export default function FolderView(props) {
  const classes = useStyles();
  const { setAppState, appState } = props;

  const [snippetCollaspeOpenState, setSnippetCollaspeOpenState] = React.useState(false);

  const { snippets = [] } = appState;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Cool</Typography>
        </Grid>
        <Grid item xs={12}>
          <Collapse in={snippetCollaspeOpenState} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              {
            snippets.map((snippet) => (
              <ListItem
                key={snippet.id}
                button
                className={classes.nested}
              >
                <ListItemText primary={snippet.title || 'Snippet'} />
              </ListItem>
            ))
          }
            </List>
          </Collapse>
        </Grid>
      </Grid>
    </div>
  );
}

FolderView.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
};

FolderView.defaultProps = {
  appState: {},
  setAppState: () => {},
};
