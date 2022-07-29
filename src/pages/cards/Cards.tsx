import React from 'react';
import Button from "../../components/button/Button";
import Search from "../../components/search/Search";
import Filter from "../../components/filter/Filter";
import RangeSlider from "../../components/rangeSlider/rangeSlider";
import Pack from "./packs/pack/Pack";
import Packs from "./packs/Packs";

const Cards = () => {
    return (
        <div className='cards'>
            <div className="cards__top">
                <div className="cards__title">Packs list</div>
                <Button title={'Add new pack'}/>
            </div>
            <div className="cards__menu">
                <Search/>
                <Filter/>
                <RangeSlider/>
            </div>
            <Packs/>
        </div>
    );
};

export default Cards;
