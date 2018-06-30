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
        option_id:[],
        correct_option_id:0
      }
    }

  }

  handleOnSubmit = (data) =>{
    console.log(data)
    api.post('/question/create/', data).then(() => {
      this.props.history.push('/question/list')
    })
  }

  render(){
    return (
      <div>
        <QuestionForm question={this.state.question} onSubmit={this.handleOnSubmit}/>
      </div>
    )
  }
}
