import React from 'react';
import { AreaChart, CartesianGrid, Tooltip, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Title from '../Title/Title';

export default function ChartDefaultContent(props) {

  return (
    <>
      <Title>{props.title}</Title>
      <ResponsiveContainer>
        <AreaChart data={props.chartData}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          stackOffset="expand"
          >
          <defs>
            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#cc0000" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#cc0000" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="Time" />
          <YAxis dataKey="Usage" domain={[0, 100]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="Usage" stroke="#cc0000" fillOpacity={1} fill="url(#colorUsage)" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );  
}
