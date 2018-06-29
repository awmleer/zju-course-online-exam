import React, { Component } from 'react'
import {Form,Select,AutoComplete,Button,Input,List} from 'antd'
import * as api from '../../api'
const FormItem = Form.Item
const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option
const Item = List.Item
const {TextArea} = Input

const option_index = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T']

export class Question extends Component {
  constructor(props){
    super(props)
    this.state = {
      Question: {
        question_name:'',
        description:'',
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
    console.log(name,value)
    // this.setState({
    //   Question[name]: value
    // })
    console.log(this.state.Question.question_type)
  }
  render(){
    const getFieldDecorator = this.props.form
    const option_list=this.state.Question.options.map((option,index)=>{
        return (
          <Item key={option_index[index]} >
            <TextArea>{option_index[index]+' : '+option.content}</TextArea>
            <Button type={'danger'}>删除</Button>
          </Item>
        )
      }
    )
    // console.log(option_list)
    // const options = this.state.options.map((option)=>{
    //     return (
    //       <Option name={}/>
    //     )
    //   }
    //
    // )
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label={'题目名称'}>
          <TextArea name='question_name' value={this.state.Question.question_name} onChange={(value)=>this.handleChange('question_name',value)}/>
        </FormItem>
        <FormItem label={'描述'}>
          <TextArea name='description' value={this.state.Question.description} onChange={this.handleChange} rows={4}/>
        </FormItem>
        <FormItem label={'题型'}>
          <Select   name='question_type' value={this.state.Question.question_type} onChange={(value)=>this.handleChange('question_type',value)}>
            <Option value={'判断题'}>判断题</Option>
            <Option value={'选择题'}>选择题</Option>
          </Select>
        </FormItem>
        <FormItem label={'所考察知识点'}>
          <TextArea name='knowledge_points' value={this.state.Question.knowledge_points} onChange={this.handleChange} rows={5}/>
        </FormItem>
        <FormItem label={'选项列表'}>
          <List>
            {option_list}
          </List>
        </FormItem>
        <FormItem label={'正确答案'} >
          <Select >
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    )
  }
}
