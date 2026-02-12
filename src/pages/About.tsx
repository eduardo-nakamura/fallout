import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../components/button'
import { TypewriterText } from '../components/TypewriterText';

export default class About extends Component {

  render() {
    const handleWelcomeComplete = () => {
      console.log("Mensagem de boas-vindas completa!");
      // Aqui você pode, por exemplo, exibir um botão "START"
    };

    return (
      <div>
        <h2 className='text-2xl'>About</h2>
        <TypewriterText
          text="Welcome, Overseer. Your Vault-Tec systems are online."
          delay={7} // 70ms entre cada letra
          initialDelay={10} // Meio segundo antes de começar
          onComplete={handleWelcomeComplete}
          className="block mb-4" // Tailwind classes
        />
        <Link to="/">  <Button>Back</Button> </Link>

      </div>
    )
  }
}
