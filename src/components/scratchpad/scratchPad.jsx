/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from 'react';
import {
  Paper, Grid, Select, Typography, MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CodeEditor from '@uiw/react-textarea-code-editor';
import PropTypes from 'prop-types';
import { CODE_LANGUAGES } from '../../helpers/constants';
import { makeRequest } from '../../helpers';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: '50vh',
  },
}));

export default function CodeScratchPad(props) {
  const classes = useStyles();
  const { setAppState, appState } = props;
  const { auth: { token }, scratchPad } = appState;
  const { language, content, id } = scratchPad;
  const [languageState, setLanguageState] = React.useState(language || 'javascript');
  const [codeState, setCodeState] = React.useState(content || 'Hello World');

  const saveScratchPad = async () => {
    const method = id ? 'put' : 'post';

    console.log({
      content: codeState,
      language: languageState,
      id,
    });

    const responseId = await makeRequest({
      method,
      data: {
        content: codeState,
        language: languageState,
        id,
      },
      token,
      url: '/scratch-pad',
    });

    setAppState({
      ...appState,
      scratchPad: {
        id: id || responseId.data,
        content: codeState,
        language: languageState,
      },
    });
  };

  // componenet clean up
  useEffect(() => {
    console.log('Firing use effect');

    return async function cleanup() {
      await saveScratchPad();
    };
  }, []);

  console.log(codeState);

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
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
      <CodeEditor
        disabled={false}
        value={codeState}
        language={languageState}
        placeholder={`Enter ${languageState} here.`}
        onChange={(evn) => setCodeState(evn.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          marginTop: 10,
          height: '90%',
          backgroundColor: 'black',
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          overflow: 'scroll',
        }}
      />
    </Paper>
  );
}

CodeScratchPad.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
  scratchPad: PropTypes.object,
};

CodeScratchPad.defaultProps = {
  scratchPad: {},
  appState: {
    firebase: { auth: PropTypes.object },
  },
  setAppState: {},
};
