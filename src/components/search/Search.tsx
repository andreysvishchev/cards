import React from 'react';

const Search = () => {
    return (
        <div className='search'>
            <div className="search__title">Search</div>
            <label className='search__label'>
                <input placeholder={'Provide your text'} type="text" className="search__input"/>
            </label>
        </div>
    );
};

export default Search;