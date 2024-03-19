import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';
import propTypes from 'prop-types';

const StatsContainer = ({defaultStats}) => {
    const stats = [
        {
            title: 'pending applications',
            count: defaultStats?.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: '#f59e0b',
            bcg:'#fef3c7'
        },
        {
            title: 'interviews scheduled',
            count: defaultStats?.interview || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg:'#e0e8f9'
        },
        {
            title: 'jobs declined',
            count: defaultStats?.declined || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg:'#ffeee'
        },
    ];

  return <Wrapper>{stats.map((item) => {
    return <StatItem key={item.title} {...item}/>
  })}</Wrapper>;
};
StatsContainer.propTypes = {
    defaultStats: propTypes.object
}
export default StatsContainer;
