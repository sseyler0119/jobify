import propTypes from 'prop-types';
import { useDashboardContext } from '../pages/DashboardLayout';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

const NavLinks = ({isBigSidebar}) => {
  const { user, toggleSidebar } = useDashboardContext();
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={text}
            className='nav-link'
            onClick={isBigSidebar ? null : toggleSidebar}
            // end prop will stop add-job from remaining active even when another link is chosen
            // this is because add-job is the index in the dashboard layout root
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
NavLinks.propTypes = {
  isBigSidebar: propTypes.bool
}
export default NavLinks;
