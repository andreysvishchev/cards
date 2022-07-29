import React from 'react';
import Pack from "./pack/Pack";

const Packs = () => {
    return (
        <div className="packs">
            <div className="packs__captions">
                <div className="packs__caption">Name</div>
                <div className="packs__caption">Cards</div>
                <div className="packs__caption">Last Updated</div>
                <div className="packs__caption">Created by</div>
                <div className="packs__caption">Actions</div>
            </div>
            <div className="packs__list">
                {/* // тут мапимся по массиву паков*/}
                <Pack/>
                <Pack/>
                <Pack/>
                <Pack/>
            </div>
        </div>
    );
};

export default Packs;