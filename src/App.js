import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'; 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Typography } from '@mui/material';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      institutionUID: "",
      academicInstitutions: [],
      academicUnits: []
    }
    this.handleGetStudies = this.handleGetStudies.bind(this);
  }

  componentDidMount() {
    axios.get('https://polon.nauka.gov.pl/opi-ws/api/academicInstitutions?status=OPERATING')
      .then(response => {
        this.setState({ 
          academicInstitutions: response.data.institutions
        });
      })
  }

  handleGetStudies(uid) {
    const params =
    axios.get('https://polon.nauka.gov.pl/opi-ws/api/studies?filters={"institutionUid":"' + uid + '", "level":"I_STOPNIA", "profile":"GENERAL", "form":"STACJONARNE"}&pageSize=1000')
      .then(response => {
        this.setState({ 
          academicUnits: response.data.studies
        });

        let result = response.data.studies.reduce(function (r, a) {
            r[a.name] = r[a.name] || [];
            r[a.name].push(a);
            return r;
        }, Object.create(null));

        console.log(result);
      })
  }

  render() {
    return (
        <Router>
          <div className="app w-100">
            <Navbar />
            <div className="main px-5 d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
              <Typography
                sx={{ fontSize: '2rem', mb: 2 }}
              >
                Wyszukaj uczelnie
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={this.state.academicInstitutions}
                getOptionLabel={options => options.name}
                onChange={(event, option) => {
                  console.log(option)
                  this.handleGetStudies(option.uid)
                }}
                sx={{ width: 500 }}
                renderInput={(params) => <TextField {...params} label="Uczelnie..." />}
              />
              {this.state.academicUnits.length > 0 && (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={this.state.academicUnits}
                  getOptionLabel={options => options.name}
                  onChange={(event, option) => {
                    this.setState({
                      institutionUID: option.uid
                    })
                  }}
                  sx={{ width: 500, mt: 3 }}
                  renderInput={(params) => <TextField {...params} label="Wybierz kierunek..." />}
                />
              )}
            </div>
          </div>
        </Router>
    );
  }
}

export default App;