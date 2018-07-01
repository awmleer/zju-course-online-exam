import React, { Component } from 'react'
import * as api from '../../api'
import {withRouter} from 'react-router-dom'
import {formItemLayoutWithLabel, formItemLayoutWithoutLabel} from '../../form'
import {Radio,Checkbox,Modal,message, Form, Select, AutoComplete, Button, Input, List, Icon} from 'antd'


export class C extends Component {
  id = null

  constructor(props){
    super(props)
    this.id = this.props.match.params.id
    this.state = {
      name:'',
      description:'',
      questionList:[],
      questionEntryList:[],
      questionEntryBuffer:[],
      questionEntryListVisible:false,
      questionGroupList:[],
      questionGroupBuffer:null,
      questionGroupListVisible:false
    }
    if(this.id){
      api.get(`/question/group/${this.id}/`).then((data) => {
        //TODO set state
      })
    }
    api.get(`/question/list/`).then((data) => {
      this.state.questionEntryList=data
    })
    api.get(`/question/group/list/`).then((data) => {
      this.state.questionGroupList = data
    })
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

  addQuestion=()=>{
    // console.log(this.state.questionEntryBuffer)
    const temp=this.state.questionList.concat(this.state.questionEntryBuffer)
    console.log(temp)
    this.setState({
      questionList:temp,
      questionEntryBuffer:[],
      questionEntryListVisible:false
    })
    console.log(this.state.questionList)
  }

  addQuestionGroup=()=>{
    if(this.state.questionGroupBuffer!=null){
      api.get(`/question/group/${this.state.questionGroupBuffer.id}`).then((data) => {
        const temp=this.state.questionList.concat(data.questions)
        this.setState({
          questionList:temp,
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
        <Form.Item label={'题目'+(index+1)} key={question.id}>
          类型：{question.type}  描述：{question.description}
          <Button type={"danger"} onClick={(e)=>{
            const index=this.state.questionList.indexOf(question)
            console.log(index)
            console.log(this.state.questionList)
            this.state.questionList.splice(index,1)
            this.setState({
              questionList:this.state.questionList
            })
          }}>删除</Button>
        </Form.Item>
      )
    })
    const questionEntryList = this.state.questionEntryList.map((questionEntry,index)=>{
      return(
        <Checkbox onChange={(e)=>{
          if(e.target.checked){
          this.state.questionEntryBuffer=e.target.value}

        }} value={questionEntry} key={questionEntry.id}>
          {/*{console.log(questionEntry)}*/}
          <p>类型：{questionEntry.type}  描述：{questionEntry.description}</p>
        </Checkbox>
      )
    })
    const questionGroupList = this.state.questionGroupList.map((questionGroup,index)=>{
      return(
        <Radio onChange={(e)=>{
          this.state.questionGroupBuffer=e.target.value
        }} value={questionGroup} key={questionGroup.id}>
          {questionGroup.name}
        </Radio>
      )
    })
    return (
      <div>
        <Form>
          <Form.Item {...formItemLayoutWithLabel} label='题目组名称'>
            <Input placeholder='请输入题目组名称' onChange={(e)=>{this.setState({name:e.target.value})}} value={this.state.name}/>
            {/*{console.log(this.state.name)}*/}
          </Form.Item>
          <Form.Item {...formItemLayoutWithLabel} label='描述'>
            <Input placeholder='请输入对这个题目组的描述' onChange={(e)=>{this.setState({description:e.target.value})}} value={this.state.description}/>
            {/*{console.log(this.state.name)}*/}
          </Form.Item>
          {questionList}
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
          <Modal title='添加题目组' visible={this.state.questionGroupListVisible} onOk={this.addQuestionGroup} onCancel={this.handleCancel} >
            {questionGroupList}
          </Modal>
          <Form.Item {...formItemLayoutWithoutLabel}>
            <Button type="primary" onClick={this.submit}>提交</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}


export const QuestionGroup = withRouter(C)
