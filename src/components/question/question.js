import React, { Component } from 'react'
import {Button} from 'antd'
import * as api from '../../api'

export class Question extends Component {
  constructor(props){
    super(props)
    console.log(props)
  }
  render(){
    return (
      <div>{this.props.match.params.id}</div>
    )
  }
}
