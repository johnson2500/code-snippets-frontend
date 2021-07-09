/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Snippet from '../../components/snippet/snippet';
import SnippetEditor from '../../components/snippetViewer/snippetViewr';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

export default function ListView(props) {
  const classes = useStyles();
  const { setAppState, appState } = props;

  const { snippets = [] } = appState;
  const [snippetState, setSnippetState] = React.useState(snippets);
  const [searchState, setSearchState] = React.useState('Search');

  const searchHandler = (e) => {
    setSearchState(e.target.value);
    const filteredSnippets = snippets.filter((snippet) => {
      const { description = '', title = '' } = snippet;
      if (e.target.value === '') return true;

      return (description.includes(e.target.value) || title.includes(e.target.value));
    });

    setSnippetState(filteredSnippets);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            className={classes.paper}
            id="standard-required"
            label="Search My Snippets"
            defaultValue="Search"
            value={searchState}
            onChange={searchHandler}
          />
        </Grid>
        <Grid item xs={12}>
          {
                snippetState.map((snippet) => (
                  <SnippetEditor
                    key={snippet.id}
                    snippet={snippet}
                    setAppState={setAppState}
                    appState={appState}
                    editing={false}
                  />
                ))
            }
        </Grid>
      </Grid>
    </div>
  );
}

ListView.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
};

ListView.defaultProps = {
  appState: {},
  setAppState: () => {},
};
