import { Component } from 'react'
import ThemeSelector from '../components/ThemeSelector'
import { Button } from '../components/button'
export default class Options extends Component {
  render() {
    return (
      <div>
        <h2 className='text-2xl'>Options</h2>
        <ThemeSelector />
        <Button to="/">Back</Button>
      </div>
    )
  }
}
