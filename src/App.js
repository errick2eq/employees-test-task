import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './App.css';
import mockData from './mocks/new_hire.json'
import { Button } from '@mui/material';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getChartDataGender, getChartDataJobTitles } from './helpers';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


function App() {
  const [rows, setRows] = useState(mockData.map((el, index) => ({ id: index + 1, ...el })))

  const dataJobTitles = getChartDataJobTitles(rows);
  const dataGender = getChartDataGender(rows);

  const columns = [
    { field: 'name', headerName: 'name', width: 150 },
    { field: 'jobTitle', headerName: 'Job Title', width: 150 },
    { field: 'tenure', headerName: 'Tenure', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 150 },
  ];

  return (
    <div className="App">
      <div className='page-container'>
        <h1 className='page-title'>Corporate Employees</h1>

        <div className="row data-grid-actions">
          <Button variant='contained'>Add Employee</Button>
        </div>

        <div className='table-container' style={{ height: 500, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>

        <div className='row charts-section'>
          <div className='charts-container'>
            <h2 className='charts-container-title'>Employees by Job Title</h2>
            <ResponsiveContainer>
              <PieChart width={400} height={400}>
                <Pie
                  data={dataJobTitles}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={160}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className='charts-container'>
            <h2 className='charts-container-title'>Employees by gender</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={dataGender}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="male" fill="#8884d8" />
                <Bar dataKey="female" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
