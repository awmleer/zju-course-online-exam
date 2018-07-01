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
      participations: []
    }
    api.get(`/exam/${this.props.match.params.id}/`).then((data) => {
      console.log(data)
      this.setState({
        exam: data
      })
      api.get(`/exam/${this.props.match.params.id}/result/`).then((data) => {
        this.setState({
          participations: data
        })
      })
    })
  }

  render(){
    if(this.state.exam){
      const participationItems = this.state.participations.map((p, index) => {
        const answerItems = p.answer.map((a, index) => {
          return (
            <Tag key={index}>{a}</Tag>
          )
        })
        return (
          <div key={index} style={{margin:'10px 0'}}>
            用户：{p.user}<br/>
            得分：{p.score}<br/>
            内容：{answerItems}
          </div>
        )
      })
      return (
        <div>
          <h3>{this.state.exam.name} 的成绩单</h3>
          {participationItems}
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

export const ExamResult = withRouter(C)
