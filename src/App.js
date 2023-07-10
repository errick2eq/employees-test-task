import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './App.css';
import mockData from './mocks/new_hire.json'
import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';

import { getChartDataGender, getChartDataJobTitles } from './helpers';
import JobTitleChart from './components/PieChart';
import GenderChart from './components/BarChart';


function App() {
  const [rows, setRows] = useState(mockData.map((el, index) => ({ id: index + 1, ...el })))
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false)
  const [form, setForm] = useState(false)

  const dataJobTitles = getChartDataJobTitles(rows);
  const dataGender = getChartDataGender(rows);
  const jobTitleOptions = dataJobTitles.map(el => el.name)

  const columns = [
    { field: 'name', headerName: 'name', width: 150 },
    { field: 'jobTitle', headerName: 'Job Title', width: 150 },
    { field: 'tenure', headerName: 'Tenure', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 150 },
  ];

  const handleSaveForm = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        name: form.name,
        jobTitle: form.jobTitle,
        tenure: form.tenure,
        gender: form.gender,
      }
    ]
    );
    setAddUserDialogOpen(false)
  }

  return (
    <div className="App">
      <div className='page-container'>
        <h1 className='page-title'>Corporate Employees</h1>

        <div className="row data-grid-actions">
          <Button onClick={() => setAddUserDialogOpen(true)} variant='contained'>Add Employee</Button>
        </div>

        <div className='table-container' style={{ height: 500, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>

        <div className='row charts-section'>
          <div className='charts-container'>
            <h2 className='charts-container-title'>Employees by Job Title</h2>
            <JobTitleChart dataJobTitles={dataJobTitles} />
          </div>
          <div className='charts-container'>
            <h2 className='charts-container-title'>Employees by gender</h2>
            <GenderChart data={dataGender} />
          </div>
        </div>

        <Dialog open={addUserDialogOpen} onClose={() => setAddUserDialogOpen(false)}>
          <DialogTitle>
            Add Employee
          </DialogTitle>
          <DialogContent>
            <div className='column'>
              <TextField
                sx={{ marginTop: '20px' }}
                label="Name"
                value={form?.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <TextField
                sx={{ marginTop: '20px' }}
                label="Tenure"
                value={form?.tenure || ''}
                type={'number'}
                onChange={(e) => setForm({ ...form, tenure: e.target.value })}
              />



              <FormControl sx={{ marginTop: '20px' }} fullWidth>
                <InputLabel id="job-title-select-label">Job Title</InputLabel>
                <Select
                  labelId="job-title-select-label"
                  label="Job Title"
                  value={form?.jobTitle || ''}
                  onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                >
                  {jobTitleOptions.map(el =>
                    <MenuItem key={el} value={el}>{el}</MenuItem>
                  )}
                </Select>
              </FormControl>

              <FormControl sx={{ marginTop: '20px' }} fullWidth>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  labelId='gender-select-label'
                  label="Gender"
                  value={form?.gender || ''}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>

              <div className='row add-user-actions'>
                <Button onClick={() => setAddUserDialogOpen(false)} variant={'outlined'}>Cancel</Button>
                <Button onClick={handleSaveForm} variant={'contained'}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
