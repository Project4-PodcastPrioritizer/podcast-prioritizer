import "./Footer.css";
const Footer = () => {
  return (
    <section className="footer">
      <div className="container wrapper">
        <div className="contributors">
          <p className="madeBy">A collaborative project put together by</p>
          <ul>
            <li className="contributor">
              <p>Michele Staffiere</p>
              <div className="links">
                <a href="https://github.com/michelestaffiere" target="blank">
                  <img src="/assets/github.svg" alt="" />
                </a>

                <a
                  href="https://www.linkedin.com/in/michelestaffiere/"
                  target="blank"
                >
                  <img
                    src="/assets/linkedin.svg"
                    alt="out going link to Michele Staffiere's LinkedIn"
                  />
                </a>
              </div>
            </li>

            <li className="contributor">
              <p>Stuart Galate </p>
              <div className="links">
                <a href="https://github.com/stuartgalate" target="blank">
                  <img src="/assets/github.svg" alt="" />
                </a>
                <a
                  href="https://www.linkedin.com/in/stuartgalate/"
                  target="blank"
                >
                  <img src="/assets/linkedin.svg" alt="" />
                </a>
              </div>
            </li>

            <li className="contributor">
              <p>Felipe Leung</p>
              <div className="links">
                <a href="https://github.com/fleung13" target="blank">
                  <img src="/assets/github.svg" alt="" />
                </a>
                <a href="http://linkedin.com/in/felipeleung" target="blank">
                  <img src="/assets/linkedin.svg" alt="" />
                </a>
              </div>
            </li>

            <li className="contributor">
              <p>Luis Montes de Oca</p>
              <div className="links">
                <a href="https://github.com/Luis-MDO" target="blank">
                  <img src="/assets/github.svg" alt="" />
                </a>
                <a
                  href="https://www.linkedin.com/in/luis-montes-de-oca-26828a258/"
                  target="blank"
                >
                  <img src="/assets/linkedin.svg" alt="" />
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className="madeWith">
          <p>API credits</p>
          <ul>
            <li>
              <a href="https://www.listennotes.com/api/">
                <p>ListenNotes</p>
              </a>
            </li>
            <li>
              <a href="https://developer.mapquest.com/documentation/">
                <p>MapQuest</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
