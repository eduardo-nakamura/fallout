import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../components/button'
export default class Options extends Component {
  render() {
    return (
      <div>
        <h2 className='text-2xl'>Options</h2>
        <Link to="/">  <Button>Back</Button> </Link>
      </div>
    )
  }
}
