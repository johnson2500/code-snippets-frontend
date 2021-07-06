/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import RealtimeEditor from '../../components/reltimeEditor/realtimeEditor';
import Snippet from '../../components/snippet/snippet';

export default function Home(props) {
  const { appState, setAppState } = props;

  const { home } = appState;
  const { editing = false } = home;
  console.log(home);

  useEffect(() => {
    console.log('Home Use Effect');
  }, []);

  return (
    <>
      {
        !editing
          ? (
            <RealtimeEditor
              appState={appState}
              setAppState={setAppState}
            />
          )
          : (
            <Snippet
              appState={appState}
              setAppState={setAppState}
            />
          )
}
    </>
  );
}

Home.propTypes = {
  appState: {
    firebase: { auth: PropTypes.func },
    snippets: PropTypes.array,
  },
  setAppState: PropTypes.func,
};
