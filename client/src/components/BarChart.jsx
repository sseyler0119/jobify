import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import propTypes from 'prop-types';

const BarChartComponent = ({data}) => {
  return <ResponsiveContainer width={'100%'} height={300}>
  <BarChart data={data} margin={{top: 50}}>
    <CartesianGrid strokeDasharray={'3 3'} />
    <XAxis dataKey={'date'}/>
    <YAxis allowDecimals={false}/>
    <Tooltip />
    <Bar dataKey={'count'} fill='#2cb1bc' barSize={75}/>
  </BarChart>
  </ResponsiveContainer>;
};
BarChartComponent.propTypes = {
  data: propTypes.array
}
export default BarChartComponent;
