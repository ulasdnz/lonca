import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

type Props = {
  data: monthlySale[]
}

const Sales: React.FC<Props> = ({ data }) => {
  const chartData = data?.map(item => ({
    name: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    }),
    price: item.price,
    timestamp: new Date(item.date).getTime(),
  }))

  return (
    <ResponsiveContainer
      width='100%'
      height={400}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line
          type='monotone'
          dataKey='price'
          stroke='#8884d8'
        />
        <CartesianGrid
          stroke='#ccc'
          strokeDasharray='5 5'
        />
        <XAxis
          dataKey='name'
          tickFormatter={tick =>
            new Date(tick).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })
          }
          type='category'
          domain={['auto', 'auto']}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis />
        <Tooltip formatter={(_value, _name, props) => `$${props.payload.price}`} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Sales
