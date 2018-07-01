import React, { Component } from 'react'
import * as api from '../../api'
import {withRouter} from 'react-router-dom'
import {formItemLayoutWithLabel, formItemLayoutWithoutLabel} from '../../form'
import {
  TimePicker,
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
      choices: [],
      time:null,
      hours:9999,
      minutes:9999,
      seconds:9999,
    }
    api.get(`/exam/${this.props.match.params.id}/participate/`).then((data) => {
      console.log(data)
      this.setState({
        exam: data,
        time:(data.availableEndTime-data.availableStartTime)
      })
    })

  }

  submit = () => {
    console.log(this.state.choices)
    api.post(`/exam/${this.props.match.params.id}/submit/`,this.state.choices).then((data) => {
      console.log(data)
    })
  }
  tick = () => {
    console.log(this.state.time)
    let date=new Date(this.state.time)
    this.setState({
      time: this.state.time - 1000,
      hours:date.getHours(),
      minutes:date.getMinutes(),
      seconds:date.getSeconds(),
    })
    if(this.state.hours===0 && this.state.minutes===0 && this.state.seconds===0){
      this.submit()
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
          <div>剩余时间:{this.state.hours+':'+this.state.minutes+':'+this.state.seconds}<br/></div>
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
