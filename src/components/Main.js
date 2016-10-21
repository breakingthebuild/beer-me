import React from 'react';
import Header from './Header'
import Results from './Results'
import Search from './Search'

const Main = React.createClass({
  getInitialState(){
    return {
      numBeers: 10,
      beers: [],
      loading: true
    };
  },
  componentWillMount() {
    const params = this.props.params || {};
    const searchTerm = params.searchTerm || undefined;
    this.loadBeers(searchTerm);
  },
  componentWillReceiveProps(nextProps) {
    this.loadBeers(nextProps.params.searchTerm);
  },
  incrementBeers() {
    const beerAmount = this.state.numBeers + 1;
    this.setState({
      numBeers: beerAmount
    });
  },
  loadBeers(searchTerm = 'hops') {
    this.setState({ loading: true });
    // Check for beers in local storage
    const localStorageBeers = localStorage.getItem(`search-${searchTerm}`);

    if (localStorageBeers) {
      const localBeers = JSON.parse(localStorageBeers);
      this.setState({
        beers: localBeers,
        loading: false
      });
      return; // stop before fetch happens!
    }

    fetch(`http://api.react.beer/v2/search?q=${searchTerm}&type=beer`)
      // when the data comes back, convert it to json
      .then(data => data.json())
      // when the json is converted, put it in state
      .then(beers => {
        // filter for beers with images
        const filteredBeers = beers.data.filter(beer => !!beer.labels);
        this.setState({
          beers: filteredBeers,
          loading: false
        });

        // save to local storage in case we search for this again
        localStorage.setItem(`search-${searchTerm}`, JSON.stringify(filteredBeers));
      })
      .catch(err => console.error(err));
  },
  render(){
    return (
      <div className="wrapper">
        <Header siteName="Beer Me!!!"/>
        <Search />
        <br /><br />
        <button onClick={this.incrementBeers}>{this.state.numBeers} 🍺🍺🍺🍺</button>
        {/*Object spread copies every property on state*/}
        <Results {...this.state} />
      </div>
    )
  }
});

export default Main;
