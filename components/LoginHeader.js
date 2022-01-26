import React from "react";
import { Menu } from "semantic-ui-react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export default function Loginheader(props){
    return <div className = "loginheader">
        <div className='ui right aligned category search item margin'>
            <div style={{marginRight: 10}} className='ui transparent icon input'>
              <input
                className='email_input'
                type='text'
                placeholder='example@gmail.com'
              />
              <i className= 'user icon' />
            </div >
            
            <div style={{marginRight: 10}} className='ui transparent icon input'>
              <input
                className='password_input'
                type='text'
                placeholder='password123'
              />
              <i className='lock icon' />
              
            </div>
            <div className='password' />
            <Button color='teal' fluid size='large'>
            Login
          </Button>
          </div>
          
    </div>
}