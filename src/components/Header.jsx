// Header.js

import React from 'react';

function Header() {
    return (
        <header>
            <img src={process.env.PUBLIC_URL + '/podcastLogo'} Alt='Podcast prioritizer logo'/>
        </header>
    );
}

export default Header;