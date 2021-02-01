import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        }
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        }
        //because these used 'this' in their method they need bound
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    //returns the CSS class for a sort by option
    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return 'active';
        } else {
            return '';
        }
    }
    //change sortBy in state
    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        });
    }
    //change term in state
    handleTermChange(event) {
        this.setState({
            term: event.target.value
        });
    }
    //change location in state
    handleLocationChange(event) {
        this.setState({
            location: event.target.value
        });
    }
    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }
    //return sort by options as <li> elements
    //binding this and the sort by option in the return statement to handleSortByChange
    renderSearchByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li key={ sortByOptionValue } className={ this.getSortByClass(sortByOptionValue) } onClick={ this.handleSortByChange.bind(this, sortByOptionValue) }>{ sortByOption }</li>;
        });
    }
    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        { this.renderSearchByOptions() }
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={ this.handleTermChange }/>
                    <input placeholder="Where?" onChange={ this.handleLocationChange }/>
                </div>
                <div className="SearchBar-submit">
                    <a onClick={ this.handleSearch }>Let's Go</a>
                </div>
            </div>
        );
    }
};

export default SearchBar;