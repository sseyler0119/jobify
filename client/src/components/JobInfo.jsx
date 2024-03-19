import propTypes from 'prop-types'
import Wrapper from '../assets/wrappers/JobInfo';

const JobInfo = ({icon, text}) => {
  return <Wrapper>
    <span className="job-icon">{icon}</span>
    <span className="job-text">{text}</span>
  </Wrapper>;
};
JobInfo.propTypes = {
    text: propTypes.string,
    icon: propTypes.object
}
export default JobInfo;
