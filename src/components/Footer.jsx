// Footer.js

import React from 'react';

function Footer() {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Podcast prioritizer created by Michele, Stuart adn Felipe. Please click on the following link to see our repo</p>
            <p>
                <a
                    href="https://github.com/yourusername/your-repo"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub Repository
                </a>
            </p>
        </footer>
    );
}

export default Footer;
