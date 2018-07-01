import React, { Component } from 'react'
import * as api from '../../api'
import {withRouter} from 'react-router-dom'
import {formItemLayoutWithLabel, formItemLayoutWithoutLabel} from '../../form'
import {
  Radio,
  Checkbox,
  Modal,
  message,
  Form,
  Select,
  AutoComplete,
  Button,
  Input,
  List,
  Icon,
  Tag,
} from 'antd'



export class C extends Component {
  constructor(props){
    super(props)
    this.state = {
      exam: null,
      choices: []
    }
    api.get(`/exam/${this.props.match.params.id}/participate/`).then((data) => {
      console.log(data)
      this.setState({
        exam: data
      })
    })
  }

  submit = () => {
    console.log(this.state.choices)
    api.post(`/exam/${this.props.match.params.id}/submit/`,this.state.choices).then((data) => {
      console.log(data)
    })
  }

  render(){
    if(this.state.exam){
      const questionItems = this.state.exam.questions.map((question, index) => {
        const optionItems = question.options.map((option, index) => {
          return (
            <Radio onChange={(e)=>{
              console.log(e)
            }} value={option.key} key={option.key}>
              {option.content}
            </Radio>
          )
        })
        return (
          <li key={question.id} style={{marginBottom:10}}>
            {question.description}
            <br/>
            <Radio.Group onChange={(e) => {
              let choices = this.state.choices
              choices[index] = e.target.value
              this.setState({
                choices: choices
              })
            }}>
              {optionItems}
            </Radio.Group>
          </li>
        )
      })
      return (
        <div>
          <ol>
            {questionItems}
          </ol>
          <Button type='primary' onClick={this.submit}>交卷</Button>
        </div>
      )
    }else{
      return (
        <div>
          加载中
        </div>
      )
    }

  }
}

export const ExamParticipate = withRouter(C)
