import React, { Component } from 'react'
import * as api from '../../api'
import {withRouter} from 'react-router-dom'
import {formItemLayoutWithLabel, formItemLayoutWithoutLabel} from '../../form'
import {message, Form, Select, AutoComplete, Button, Input, List, Icon} from 'antd'


export class C extends Component {
  id = null

  constructor(props){
    super(props)
    this.id = this.props.match.params.id
    this.state = {}//TODO initial state
    if(this.id){
      api.get(`/question/group/${this.id}/`).then((data) => {
        //TODO set state
      })
    }
  }

  submit = (data) =>{
    console.log(data)
    let p
    if (this.id) {
      p = api.post(`/question/group/${this.id}/update/`, data).then(() => {
        message.success('修改成功')
      })
    }else{
      p = api.post('/question/group/create/', data).then(() => {
        message.success('创建成功')
      })
    }
    p.then(() => {
      this.props.history.push('/question/group/list')
    })
  }

  render(){
    return (
      <div>
        <Form>
          <Form.Item {...formItemLayoutWithLabel} label='题目描述'>
            <Input/>
          </Form.Item>
          <Form.Item {...formItemLayoutWithoutLabel}>
            <Button type="primary" onClick={this.submit}>提交</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}


export const QuestionGroup = withRouter(C)
