import React from 'react';

const Filter = () => {
    return (
        <div className="filter">
            <div className="filter__title">Show packs cards</div>
            <div className="filter__buttons">
                <button className="filter__button filter__button--light">My</button>
                <button className="filter__button filter__button--blue">All</button>
            </div>
        </div>
    );
};

export default Filter;