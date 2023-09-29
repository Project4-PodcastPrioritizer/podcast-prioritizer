// Header.jsx
import React from "react";
import "./Header.css";
function Header() {
  return (
    <>

    {/* this element is saying f you im gonna ruin the viewport sizing. */}
      <img className="transition" src="/assets/layered-steps-haikei.svg" />
      <div class="divider">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <header>
        <img src="/assets/logo.png" alt="Podcast logo" />
      </header>
    </>
  );
}
export default Header;
