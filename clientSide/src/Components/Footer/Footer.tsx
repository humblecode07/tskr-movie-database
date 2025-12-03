import TheMovieDatabaseIcon from '../../assets/Icons/TheMovieDatabaseIcon'
import { Facebook, GitHub, LinkedIn, Twitter } from '../../assets/Icons/SocialMediaIcons'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <ul>
            <span className="footer-title">Frontend</span>
            <li className="footer-item">HTML</li>
            <li className="footer-item">SCSS</li>
            <li className="footer-item">TypeScript</li>
            <li className="footer-item">React</li>
          </ul>
          <ul>
            <span className="footer-title">Backend</span>
            <li className="footer-item">Node.js</li>
            <li className="footer-item">Express</li>
            <li className="footer-item">MongoDB</li>
            <li className="footer-item">Mongoose</li>
          </ul>
          <ul>
            <span className="footer-title">Tools</span>
            <li className="footer-item">VS Code</li>
            <li className="footer-item">Insomnia</li>
            <li className="footer-item">Figma</li>
          </ul>
          <ul>
            <span className="footer-title">Fonts</span>
            <li className="footer-item">Roboto</li>
            <li className="footer-item">Roboto Condensed</li>
            <li className="footer-item">Passion One</li>
          </ul>
          <ul className="footer-api">
            <span className="footer-title">API Used</span>
            <a href="https://themoviedb.org/">
              <TheMovieDatabaseIcon />
            </a>
          </ul>
        </div>
        <div className="contact-info">
          <div className="contact-item">
            <span className="footer-title">Get in touch</span>
            <span className="footer-item">calderon.miko.00149@dyci.edu.ph</span>
          </div>
          <div className="contact-item">
            <span className="footer-title">Follow me on social media</span>
            <div className="social-media">
              <a href="https://x.com/Utamikoo">
                <Twitter />
              </a>
              <a href="https://github.com/humblecode07">
                <GitHub />
              </a>
              <a href="https://www.linkedin.com/in/mkcldrn777/">
                <LinkedIn />
              </a>
              <a href="https://www.facebook.com/MKCLDRN">
                <Facebook />
              </a>
            </div>
          </div>
          <span className="footer-copy">© 2024 tskr<span className='text-[#FF8731]'>!</span> All rights reserved.</span>
        </div>
      </div>
    </footer>

  )
}

export default Footer
