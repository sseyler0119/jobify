import { useState } from 'react';
import AreaChartComponent from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
import propTypes from 'prop-types';
import BarChartComponent from './BarChart';


const ChartContainer = ({data}) => {
    const [barChart, setBarChart] = useState(true);
  return <Wrapper>
    <h4>Monthly Applications</h4>
    <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
    </button>
    {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
  </Wrapper>;
};
ChartContainer.propTypes ={
    data: propTypes.array
}
export default ChartContainer;
