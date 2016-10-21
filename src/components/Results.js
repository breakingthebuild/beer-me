import React from 'react';
import Beer from './Beer';
import Loader from './Loader';

const Results = React.createClass({
  render(){
    if(this.props.loading) {
      return <Loader message="Pouring a cold one!"/>
    }

    return (
      <div className="beers">
        {/* Pretty cool way to see your raw output: <pre>{JSON.stringify(this.props.beers,null,' ')}</pre>*/}
        {this.props.beers.map((details, i) => <Beer details={details} key={details.id}/>)}
      </div>
    )
  }
});

export default Results;
