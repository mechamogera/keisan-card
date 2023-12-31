import React from 'react';
import './select.css';

function Select() {
    return (
        <div className="links">
            <div>
                <div className="link">
                    <a href="/keisan-card/plus">くりあがりなし たしざん</a>
                </div>
                <div className="link">
                    <a href="/keisan-card/minus">くりさがりなし ひきざん</a>
                </div>
                <div className="link">
                    <a href="/keisan-card/plus-moveup">くりあがりあり たしざん</a>
                </div>
                <div className="link">
                    <a href="/keisan-card/minus-carrydown">くりさがりあり ひきざん</a>
                </div>
            </div>
        </div>
    );
}

export default Select;