/* eslint-disable react/require-default-props */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

export default function SnippetList(props) {
  const { snippets = [] } = props;

  return (
    <Grid>
      <Grid container>
        {
            snippets.map((codeItem) => (
              <Grid item>
                {codeItem}
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
};
