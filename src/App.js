import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CryptoJS from 'crypto-js';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = {
      results: []
    }
  };

  componentDidMount(){
    var publicKey = 'fd77085b5fa494a55ca4c0551ba11b71', 
    privateKey = '750f0fda3cab31bb74cfaa18c1ccfcf4464cfe04',
    ts = new Date().getTime(),
    hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

    axios.get('http://gateway.marvel.com/v1/public/characters', {
      params: {
        ts: ts,
        apikey: publicKey,
        hash: hash
      }
    })
      .then(res => {
        console.log(res.data)
        if(res.data.code === 200) {
          this.setState({
            results: res.data.data.results,
            total: res.data.data.total,
            number: res.data.data.offset
          });
        }
      });
  };

  render() {
    const results = this.state.results;

    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Integration Marvel API"></AppBar>
          <List dense>
          {results.map(value => (
            <ListItem key={value.id} button>
            <ListItemAvatar>
              <Avatar
                alt={'Avatar n°${value.id}'}
                src={value.thumbnail.path + '.' + value.thumbnail.extension}
              />
            </ListItemAvatar>
            <ListItemText primary={value.name} />
            </ListItem>
          ))}
          </List>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
