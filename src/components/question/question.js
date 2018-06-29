import React, { Component } from 'react'
import {Form,Select,AutoComplete,Button,Input,List} from 'antd'
import * as api from '../../api'
import {QuestionForm} from './question-form'


export class Question extends Component {
  constructor(props){
    super(props)
    this.state = {
      question: {
        description:'1',
        question_type:'判断题',
        knowledge_points:'',
        options:[{id:1,content:'选项一'},{id:2,content:'选项二'}],
        correct_option_id:0
      }
    }
    console.log(props)
  }

  handleSubmit = (e) =>{

  }
  handleChange = (name,value) =>{
    this.setState({
      [name]: value
    })
  }
  render(){
    return (
      <div>
        <QuestionForm question={this.state.question}/>
      </div>
    )
  }
}
