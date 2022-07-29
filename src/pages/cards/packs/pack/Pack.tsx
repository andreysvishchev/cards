import React from 'react';

const Pack = () => {
    return (
        <div className='pack'>
            <div className="pack__col">Pack Name</div>
            <div className="pack__col">4</div>
            <div className="pack__col">18.03.2021</div>
            <div className="pack__col">Ivan Ivanov</div>
            <div className="pack__col pack__col--actions">
                <button className="pack__button"></button>
                <button className="pack__button"></button>
                <button className="pack__button"></button>
            </div>
        </div>
    );
};

export default Pack;