import React, { Component } from 'react'
import * as api from '../../api'
import {QuestionForm} from './question-form'
import {withRouter} from 'react-router-dom'
import message from 'antd/es/message/index'


export class C extends Component {
  questionId

  constructor(props){
    super(props)
    this.questionId = this.props.match.params.id
    this.state = {
      question: null,
    }
    if(this.questionId){
      api.get(`/question/${this.questionId}/`).then((data) => {
        this.setState({
          question: data
        })
      })
    }
  }

  handleOnSubmit = (data) =>{
    console.log(data)
    let p
    if (this.questionId) {
      p = api.post(`/question/${this.questionId}/update/`, data).then(() => {
        message.success('修改成功')
      })
    }else{
      p = api.post('/question/create/', data).then(() => {
        message.success('创建成功')
      })
    }
    p.then(() => {
      this.props.history.push('/question/list')
    })
  }

  render(){
    // if(this.state.question === null){
    //   return (
    //     <div>
    //       加载中
    //     </div>
    //   )
    // }else{
    //   return (
    //     <div>
    //       <QuestionForm question={this.state.question} onSubmit={this.handleOnSubmit}/>
    //     </div>
    //   )
    // }
    return (
      <div>
        <QuestionForm question={this.state.question} onSubmit={this.handleOnSubmit}/>
      </div>
    )
  }
}


export const Question = withRouter(C)
