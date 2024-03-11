import Wrapper from "../assets/wrappers/LandingPage";
import main from '../assets/images/main.svg';
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
      <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>job <span>tracking</span> app</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ut soluta consectetur suscipit inventore, sed hic modi odio, dolorum voluptatum expedita voluptatem, harum doloremque fugit voluptas! Amet dolor facere obcaecati asperiores sit? Beatae optio quia provident vero odit mollitia nobis?
          </p>
          <Link to='/register' className="btn register-link">Register</Link>
          <Link to='/login' className="btn">Login / Demo User</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing