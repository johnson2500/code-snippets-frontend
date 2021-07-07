/* eslint-disable react/require-default-props */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Snippet from '../snippet/snippet';

export default function SnippetList(props) {
  const { snippets = [], setAppState, appState } = props;

  return (
    <Grid>
      <Grid container>
        {
            snippets.map((codeItem) => (
              <Grid item>
                <Snippet
                  snippet={{}}
                  setAppState={setAppState}
                  appState={appState}
                />
              </Grid>
            ))
        }
      </Grid>
    </Grid>
  );
}

SnippetList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  snippets: PropTypes.array,
  appState: {
    firebase: { auth: PropTypes.object },
  },
  setAppState: {},
};
