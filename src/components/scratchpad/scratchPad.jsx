/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import {
  Paper, Grid, Select, Typography, MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import codeTheme from 'prism-react-renderer/themes/github';
import { makeRequest } from '../../helpers';
import { CODE_LANGUAGES } from '../../helpers/constants';
import { SET_SCRATCHPAD } from '../../redux/reducers/scratchPadReducers';
import store from '../../redux/store';

const useStyles = makeStyles((theme) => ({
  paper: {
    color: theme.palette.text.secondary,
    height: '50vh',
  },
  codePadHeader: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  codeContainer: {
    height: '40vh',
    overflow: 'scroll',
  },
}));

const highlight = (code) => (
  <Highlight {...defaultProps} theme={codeTheme} code={code} language="jsx">
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

export default function CodeScratchPad(props) {
  const classes = useStyles();
  const { scratchPad, auth: { token } } = props;
  const { language, content, id } = scratchPad;

  const [languageState, setLanguageState] = React.useState(language || 'javascript');
  const [codeState, setCodeState] = React.useState(content || 'Hello World');

  const saveScratchPad = async () => {
    const method = id ? 'put' : 'post';

    const scratchPadRes = await makeRequest({
      method,
      data: {
        content: codeState,
        language: languageState,
        id,
      },
      token,
      url: '/scratch-pad',
    });

    store.dispatch({
      type: SET_SCRATCHPAD,
      payload: { ...scratchPadRes },
    });
  };

  // componenet clean up
  // useEffect(() => async function cleanup() {
  //   await saveScratchPad();
  // }, []);

  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.codePadHeader}>
        <Grid item xs={6}>
          <Typography variant="h4">
            Scratch Pad
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Select
            labelId="language-select-label"
            value={languageState}
            onChange={(e) => { setLanguageState(e.target.value); }}
            label="Language"
            className={classes.fillContainer}
          >
            {
                CODE_LANGUAGES.map((lang) => <MenuItem key={lang} value={lang}>{lang}</MenuItem>)
            }
          </Select>
        </Grid>
      </Grid>
      <div className={classes.codeContainer}>
        <Editor
          value={codeState}
          onValueChange={(value) => setCodeState(value)}
          highlight={highlight}
          padding={10}
          style={{
            fontSize: 12,
            marginTop: 10,
            backgroundColor: 'black',
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            minHeight: '100%',
            ...codeTheme.plain,
          }}
        />
      </div>
    </Paper>
  );
}

CodeScratchPad.propTypes = {
  scratchPad: PropTypes.object,

  auth: PropTypes.object,
  dispatch: PropTypes.func,
};

CodeScratchPad.defaultProps = {
  scratchPad: {},
  auth: {},
  dispatch: () => {},
};
