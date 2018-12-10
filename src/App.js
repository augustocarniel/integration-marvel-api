import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Pagination from 'react-js-pagination';
import {getCharacters} from './services/MarvelService';
import './App.css'

class App extends Component {

  constructor(){
    super();
    this.state = {
      data: {
        results: []
      },
      pagination: {
        activePage: 1,
        pageRangeDisplayed: 10,
        totalItemsCount: 0,
        itemsCountPerPage: 10,
      }
    }
  };

  searchCharacters(pageNumber){
    getCharacters(pageNumber).then(res => {
      if(res.data.code === 200) {
        this.setState({
          data: res.data.data,
          pagination: {
            totalItemsCount: res.data.data.total,
            activePage: pageNumber
          }
        });
      }
    })
  };

  handlePageChange = (pageNumber) => {
    this.searchCharacters(pageNumber);
  };

  componentDidMount(){
    this.searchCharacters(this.state.pagination.activePage);
  };

  render() {
    const results = this.state.data.results;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Integration Marvel API
            </Typography>
          </Toolbar>
        </AppBar>
        <List dense>
          {results.map(value => (
            <ListItem key={value.id} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value.id}`}
                src={value.thumbnail.path + '.' + value.thumbnail.extension}
              />
            </ListItemAvatar>
            <ListItemText primary={value.name} />
            </ListItem>
          ))}
        </List>
        <Pagination
            hideNavigation={true}
            activePage={this.state.pagination.activePage}
            itemsCountPerPage={this.state.pagination.itemsCountPerPage}
            totalItemsCount={this.state.pagination.totalItemsCount}
            pageRangeDisplayed={this.state.pagination.pageRangeDisplayed}
            onChange={this.handlePageChange} />
      </div>
    );
  }
}

export default App;
