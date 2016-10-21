import React from 'react';

const Search = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  handleSubmit(e){
    // 1. Stop the form from submitting
    e.preventDefault();
    // 2. Get the value of the input
    const searchTerm = this.refs.q.value;
    // 3. redirect them to `/search/whatever-they-searched-
    this.context.router.transitionTo(`/search/${searchTerm}`);
    // Clear input
    this.refs.q.value='';
  },
  render(){
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="q" placeholder="Hoppy, Malt, Angry, New..."/>
          <input type="submit" value="Search"/>
        </form>
      </div>
    )
  }
});

export default Search;
