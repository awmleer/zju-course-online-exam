import React, { Component } from 'react'
import * as api from '../../api'
import {QuestionForm} from './question-form'
import {withRouter} from 'react-router-dom'


export class C extends Component {
  constructor(props){
    super(props)
    let questionId = this.props.match.params.id
    this.state = {
      question: null,
    }
    if(questionId){
      api.get(`/question/${questionId}`).then((data) => {
        this.setState({
          question: data
        })
      })
    }
  }

  handleOnSubmit = (data) =>{
    console.log(data)
    api.post('/question/create/', data).then(() => {
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
