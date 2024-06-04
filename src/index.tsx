import React from 'react';
import ReactDOM from 'react-dom';
import Head from './partials/head';
import Footer from './partials/footer';
import Progress from './partials/progress';
import Recorder from './partials/recorder';
import StarFork from './partials/star-fork';
import Toast from './partials/toast';
import Toggler from './partials/toggler';
import './scss/index.scss';

const App = () => {
  return (
    <div>
      <Head />
      <body className="sh" data-theme="auto">
        <Progress />
        <Recorder />
        <StarFork />
        <Toast />
        <Toggler />
        <Footer />
        <script src="js/index.js" type="module"></script>
      </body>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));