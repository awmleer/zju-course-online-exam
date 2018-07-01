import React, { Component } from 'react'
import * as api from '../../api'
import {withRouter} from 'react-router-dom'
import {formItemLayoutWithLabel, formItemLayoutWithoutLabel} from '../../form'
import {DatePicker,Radio, Checkbox, Modal, message, Form, Select, AutoComplete, Button, Input, List, Icon, Tag} from 'antd'
import './exam.scss'



export class C extends Component {
  id = null
  constructor(props) {
    super(props)
    this.id = this.props.match.params.id
    this.state = {
      name: '',
      description:'',
      displayStartTime:null,
      displayEndTime:null,
      availableStartTime:null,
      availableEndTime:null,
      questionList:[],
    }
  }

  render(){
    return(
      <div>
        <Form>
          <Form.Item {...formItemLayoutWithLabel} label='考试名称'>
            <Input placeholder='请输入考试名称' onChange={(e)=>{this.setState({name:e.target.value})}} value={this.state.name}/>
            {/*{console.log(this.state.name)}*/}
          </Form.Item>
          <Form.Item {...formItemLayoutWithLabel} label='描述'>
            <Input placeholder='请输入考试名称' onChange={(e)=>{this.setState({description:e.target.value})}} value={this.state.description}/>
            {/*{console.log(this.state.name)}*/}
          </Form.Item>
          <Form.Item {...formItemLayoutWithLabel} label='考试开始时间'>
            <DatePicker onChange={onChange} />
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
