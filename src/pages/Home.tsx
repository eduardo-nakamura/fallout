import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {Button} from '../components/button'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/about"> <Button>About</Button> </Link>
        <Link to="/options">  <Button>Options</Button> </Link>

       
      </div>
    )
  }
}
