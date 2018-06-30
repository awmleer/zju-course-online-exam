import React, { Component } from 'react'
import {Form,Select,AutoComplete,Button,Input,List} from 'antd'
import * as api from '../../api'
import {QuestionForm} from './question-form'


export class Question extends Component {
  constructor(props){
    super(props)
    this.state = {
      question: {
        description:'',
        type:'判断题',
        keypoints:'',
        options:[],
        correct_option_id:0
      }
    }

  }

  handleSubmit = (e) =>{

  }

  render(){
    return (
      <div>
        <QuestionForm question={this.state.question}/>
      </div>
    )
  }
}
