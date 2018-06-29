import React, { Component } from 'react'
import {Form, Select, AutoComplete, Button, Input, List} from 'antd'
import {formItemLayout, tailFormItemLayout} from '../../form'

const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option
const TextArea = Input.TextArea


class RawForm extends Component {
  constructor(props){
    super(props)
    this.state = props.question
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
  }
  
  render(){
    const { getFieldDecorator } = this.props.form;
    // const { autoCompleteResult } = this.state;



    const option_list=this.state.options.map((option)=>{
        return (
          <Form.Item>
            <TextArea>{option.title}</TextArea>
            <Button type={'danger'}>删除</Button>
          </Form.Item>
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
        {getFieldDecorator('description',{})(
          <Form.Item {...formItemLayout} label='题目名称'>
            <TextArea value={this.state.description} onChange={e=>this.setState({description:e.target.value})}/>
          </Form.Item>
        )}
        {/*<Form.Item {...formItemLayout} label={'描述'}>*/}
          {/*<TextArea name='description' value={this.state.description} onChange={this.handleChange} rows={4}/>*/}
        {/*</Form.Item>*/}
        {/*<Form.Item {...formItemLayout} label={'题型'}>*/}
          {/*<Select   name='question_type' value={this.state.question_type} onChange={(value)=>this.handleChange('question_type',value)}>*/}
            {/*<Option value={'判断题'}>判断题</Option>*/}
            {/*<Option value={'选择题'}>选择题</Option>*/}
          {/*</Select>*/}
        {/*</Form.Item>*/}
        {/*<Form.Item {...formItemLayout} label={'所考察知识点'}>*/}
          {/*<TextArea name='knowledge_points' value={this.state.knowledge_points} onChange={this.handleChange} rows={5}/>*/}
        {/*</Form.Item>*/}
        {/*<Form.Item {...formItemLayout} label={'选项列表'}>*/}
          {/*<List>*/}
            {/*{option_list}*/}
          {/*</List>*/}
        {/*</Form.Item>*/}
        {/*<Form.Item {...formItemLayout} label={'正确答案'} >*/}
          {/*<Select >*/}
          {/*</Select>*/}
        {/*</Form.Item>*/}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    )
  }

}


export const QuestionForm = Form.create()(RawForm);
