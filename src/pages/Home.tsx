import { Component } from 'react'
import {Button} from '../components/button'

export default class Home extends Component {
  render() {
    return (
      <div className='flex flex-col gap-2'>
        <Button to="/terminal">Terminal</Button>
        <Button to="/about">About</Button>
        <Button to="/options">Options</Button>


       
      </div>
    )
  }
}
