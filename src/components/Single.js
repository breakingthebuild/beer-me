import React from 'react';
import Header from './Header'
import Loader from './Loader'

const Single = React.createClass({
  getInitialState(){
    return {
      beer: {},
      loading: true
    };
  },
  componentWillMount() {
    this.loadBeer();
  },
  loadBeer() {
    const beerId = this.props.params.beerId;
    this.setState({ loading: true });
    // Check for beer in local storage
    const localStorageBeer = localStorage.getItem(`beer-${beerId}`);

    if (localStorageBeer) {
      const localBeer = JSON.parse(localStorageBeer);
      this.setState({
        beer: localBeer,
        loading: false
      });
      return; // stop before fetch happens!
    }

    fetch(`http://api.react.beer/v2/beer/${beerId}`)
      // when the data comes back, convert it to json
      .then(data => data.json())
      // when the json is converted, put it in state
      .then(localBeer => {
        this.setState({
          beer: localBeer.data,
          loading: false
        });

        // save to local storage in case we search for this again
        localStorage.setItem(`beer-${beerId}`, JSON.stringify(localBeer.data));
      })
      .catch(err => console.error(err));
  },
  renderGlass(beer) {
    if (!beer.glass) return;
    return (
      <div className="glass">
        <img src={`/images/glass-${beer.glass.id}.jpg`} alt={beer.name} />
        <h3>{beer.glass.name} Glass</h3>
      </div>
    );
  },
  renderAbv(beer) {
    if (!beer.abv) return;
    return (
      <div className="abv">ABV: {beer.abv}%</div>
    );
  },
  render() {
    if (this.state.loading) {
      return <Loader message="Pouring a cold one!" />;
    }

    const { beer } = this.state;

    return (
      <div>
        <Header siteName="Beer me!" />
        <div className="single-beer">
          <div className="desc">
            <h2>{beer.name}</h2>
            <p>{beer.description}</p>
          </div>

          <img className="label" src={beer.labels.large} alt={beer.name} />

          <div className="deets">
            {this.renderGlass(beer)}
            {this.renderAbv(beer)}
          </div>

          <div className="style">
            <h3>More Info on {beer.style.name}</h3>
            <p>{beer.style.description}</p>
          </div>
        </div>
      </div>
    );
  }
});


export default Single;
