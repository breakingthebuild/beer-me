import React from 'react'; // Importing the entire module from react
import { render } from 'react-dom'; // Importing specific package from the react-dom module
import { BrowserRouter, Match } from 'react-router';
import Main from './components/Main'
import Single from './components/Single'

import './style.css'

// The only purpose is to render html hence function() vs React.createClass
const Root = function() {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={Main} />
        <Match pattern="/search/:searchTerm" component={Main} />
        <Match pattern="/beer/:beerId/:beerSlug" component={Single} />
      </div>
    </BrowserRouter>
  );
};

render(<Root/>, document.querySelector('#root'));
