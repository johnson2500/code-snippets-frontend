/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SnippetEditor from '../../components/snippetEditor/snippetEditor';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

function ListView({
  snippets = [],
}) {
  const classes = useStyles();

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
                snippetState.length === 0
                  ? <Typography>No Results</Typography>
                  : snippetState.map((snippet) => (
                    <SnippetEditor
                      key={snippet.id}
                      snippet={snippet}
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
  // notes: PropTypes.array,
  snippets: PropTypes.array,
};

ListView.defaultProps = {
  // notes: [],
  snippets: () => [],
};

const mapStateToProps = (state) => ({
  notes: state.notes,
  snippets: state.snippets,
});

export default connect(mapStateToProps)(ListView);
