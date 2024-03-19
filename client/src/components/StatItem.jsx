import Wrapper from '../assets/wrappers/StatItem';
import propTypes from 'prop-types';

const StatItem = ({count, title, icon, color, bcg}) => {
  return (
    <Wrapper color={color} bcg={bcg}>
        <header>
            <span className="count">{count}</span>
            <span className="icon">{icon}</span>
        </header>
        <h5 className="title">{title}</h5>
    </Wrapper>
  )
}
StatItem.propTypes = {
    count: propTypes.number,
    title: propTypes.string,
    icon: propTypes.object,
    color: propTypes.string,
    bcg: propTypes.string
}
export default StatItem