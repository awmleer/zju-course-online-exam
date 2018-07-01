import React, { Component } from 'react'
import * as api from '../../api'
import {withRouter} from 'react-router-dom'
import {formItemLayoutWithLabel, formItemLayoutWithoutLabel} from '../../form'
import {DatePicker,TimePicker,Radio, Checkbox, Modal, message, Form, Select, AutoComplete, Button, Input, List, Icon, Tag} from 'antd'
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
      questionEntryList:[],
      questionEntryBuffer:[],
      questionEntryListVisible:false,
      questionGroupList:[],
      questionGroupBuffer:null,
      questionGroupListVisible:false
    }
    if(this.id){
      api.get(`/exam/${this.id}/`).then((data) => {
        console.log(data)
        this.setState({
          name:data.name,
          description:data.description,
          displayStartTime:data.displayStartTime,
          displayEndTime:data.displayEndTime,
          availableStartTime:data.availableStartTime,
          availableEndTime:data.availableEndTime,
          questionList:data.questions
        })
        console.log(this.state)
        // console.log(this.state.questionList)
      })
    }
    api.get(`/question/list/`).then((data) => {
      this.state.questionEntryList=data
    })
    api.get(`/question/group/list/`).then((data) => {
      this.state.questionGroupList = data
    })
  }

  submit = () =>{
    const data={
      name:this.state.name,
      description:this.state.description,
      displayStartTime:this.state.displayStartTime,
      displayEndTime:this.state.displayEndTime,
      availableStartTime:this.state.availableStartTime,
      availableEndTime:this.state.availableEndTime,
      questionIds:this.state.questionList.map((question,index)=>{
        return question.id
      })
    }
    let p
    if (this.id) {
      p = api.post(`/exam/${this.id}/update/`, data).then(() => {
        message.success('修改成功')
      })
    }else{
      p = api.post('/exam/create/', data).then(() => {
        message.success('创建成功')
      })
    }
    p.then(() => {
      this.props.history.push('/exam/list')
    })
  }

  addQuestion=()=>{
    // console.log(this.state.questionEntryBuffer)
    // console.log(this.state.questionEntryBuffer)
    for(let q of this.state.questionEntryBuffer){
      let flag = true
      for(let qq of this.state.questionList){
        if(qq.id===q.id)flag=false
      }
      if(flag)this.state.questionList.push(q)
    }
    this.setState({
      questionList:this.state.questionList,
      questionEntryBuffer:[],
      questionEntryListVisible:false
    })
    // console.log(this.state.questionList)
  }

  addQuestionGroup=(e)=>{
    if(this.state.questionGroupBuffer!=null){
      api.get(`/question/group/${this.state.questionGroupBuffer.id}`).then((data) => {
        for(let q of data.questions){
          let flag = true
          for(let qq of this.state.questionList){
            if(qq.id===q.id)flag=false
          }
          if(flag)this.state.questionList.push(q)
        }
        this.setState({
          questionList:this.state.questionList,
          questionGroupBuffer:null,
          questionGroupListVisible:false
        })
      })
    }
  }

  handleCancel=()=>{
    this.setState({
      questionEntryBuffer:[],
      questionGroupBuffer:null,
      questionEntryListVisible:false,
      questionGroupListVisible:false
    })
  }

  render(){
    const questionList=this.state.questionList.map((question,index)=>{
      return(
        <div key={question.id} className='question-box'>
          <Tag>{question.type}</Tag>
          <span className='description'>{question.description}</span>
          <Button type={"danger"} onClick={(e)=>{
            const index=this.state.questionList.indexOf(question)
            // console.log(index)
            // console.log(this.state.questionList)
            this.state.questionList.splice(index,1)
            this.setState({
              questionList:this.state.questionList
            })
          }}>删除</Button>
        </div>
      )
    })
    const questionEntryList = this.state.questionEntryList.map((questionEntry,index)=>{
      return(
        <Checkbox onChange={(e)=>{
          if(e.target.checked){
            this.state.questionEntryBuffer.push(questionEntry)}
          else{
            this.state.questionEntryBuffer.splice(this.state.questionEntryBuffer.indexOf(questionEntry))
          }
        }} value={questionEntry} key={questionEntry.id}>
          {/*{console.log(questionEntry)}*/}
          <span>类型：{questionEntry.type}  描述：{questionEntry.description}</span>
        </Checkbox>
      )
    })
    const questionGroupList = this.state.questionGroupList.map((questionGroup,index)=>{
      return(
        <Radio onChange={(e)=>{
          this.state.questionGroupBuffer=questionGroup
        }} value={questionGroup} key={questionGroup.id}>
          {questionGroup.name}
        </Radio>
      )
    })
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
            <DatePicker showTime={true} onChange={(date)=>{this.setState({displayStartTime:date})}} value={this.state.displayStartTime}/>
            {console.log(this.state.displayStartTime)}
          </Form.Item>
          <Form.Item {...formItemLayoutWithLabel} label='考试结束时间'>
            <DatePicker showTime={true} onChange={(date)=>{this.setState({displayEndTime:date})}} value={this.state.displayEndTime}/>
            {console.log(this.state.displayStartTime)}
          </Form.Item>
          <Form.Item {...formItemLayoutWithLabel} label='显示开始时间'>
            <DatePicker showTime={true} onChange={(date)=>{this.setState({availableStartTime:date})}} value={this.state.availableStartTime}/>
            {/*{console.log(this.state.displayStartTime)}*/}
          </Form.Item>
          <Form.Item {...formItemLayoutWithLabel} label='显示结束时间'>
            <DatePicker showTime={true} onChange={(date)=>{this.setState({availableEndTime:date})}} value={this.state.availableEndTime}/>
            {/*{console.log(this.state.displayStartTime)}*/}
          </Form.Item>
          <Form.Item {...formItemLayoutWithLabel} label='题目列表'>
            {questionList}
          </Form.Item>
          <Form.Item {...formItemLayoutWithoutLabel}>
            <Button type="dashed"  onClick={()=>this.setState({questionEntryListVisible:true})} style={{ width: '60%' }}>
              <Icon type="plus" /> 添加题目
            </Button>
          </Form.Item>
          <Modal title='添加题目' visible={this.state.questionEntryListVisible} onOk={this.addQuestion} onCancel={this.handleCancel} >
            {questionEntryList}
          </Modal>
          <Form.Item {...formItemLayoutWithoutLabel}>
            <Button type="dashed"  style={{ width: '60%' }} onClick={()=>this.setState({questionGroupListVisible:true})}>
              <Icon type="plus" /> 添加题目组
            </Button>
          </Form.Item>
          <Modal title='添加题目组' visible={this.state.questionGroupListVisible} onOk={(e)=>this.addQuestionGroup(e)} onCancel={this.handleCancel} >
            {questionGroupList}
          </Modal>
          <Form.Item {...formItemLayoutWithoutLabel}>
            <Button type="primary" onClick={this.submit}>提交</Button>
          </Form.Item>
        </Form>
      </div>
      )}

}

export const Exam = withRouter(C)
