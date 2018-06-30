import React, { Component } from 'react'
import {Form, Select, AutoComplete, Button, Input, List, Icon} from 'antd'
import {formItemLayout, tailFormItemLayout} from '../../form'

const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option
const TextArea = Input.TextArea

const option_index = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S']

let uuid = 0
class RawForm extends Component {
  constructor(props){
    super(props)
    // this.state = props.question
  }

  remove = (option) => {
    const { form } = this.props;
    // can use data-binding to get
    const optionId = form.getFieldValue('optionId');
    // We need at least one option
    if (optionId.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      optionId: optionId.filter(key => key !== option),
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const optionId = form.getFieldValue('optionId');
    const nextOption = optionId.concat(uuid);
    // console.log(nextOption)
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      optionId: nextOption,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        const data = this.transferData()
      }
    });
  }

  transferData=()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data={
          type:values.type,
          description:values.description,
          keypoints:values.keypoints,
          options:values.optionContent,
          solution:values.optionContent[values.correctOptionId]
        }
        // console.log(values.correctOptionId)
        // console.log(data)
        return data
      }
    });
  }


  render(){
    const { getFieldDecorator,getFieldValue } = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    }
    getFieldDecorator('optionId', { initialValue: [] });
    const optionId = getFieldValue('optionId');
    const formItems = optionId.map((option, index) => {
      return (
        <Form.Item
          {...formItemLayout}
          label={'选项'+option_index[index]}
          required={false}
          key={option}
        >
          {getFieldDecorator(`optionContent[${option}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入选项内容",
            }],
          })(
            <Input placeholder="选项内容" style={{ width: '60%', marginRight: 8 }} />
          )}
          {optionId.length > 0 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={optionId.length === 0}
              onClick={() => this.remove(option)}
            />
          ) : null}
        </Form.Item>
      )
    })
    // const option_index_list=null
    // console.log(optionId)
    const option_index_list=optionId.map((option,index)=>{
      return(
        <Option key={option} value={option}>{option_index[index]}</Option>
      )
    })
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label='题目描述'>
          {getFieldDecorator('description',{})(
            <Input/>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={'题型'}>
          {getFieldDecorator('type')(
            <Select >
              <Option value={'判断题'}>判断题</Option>
              <Option value={'选择题'}>选择题</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={'所考察知识点'}>
          {getFieldDecorator('keypoints',{})(
            <Input/>
          )}
        </Form.Item>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加选项
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayout} label={'正确选项'}>
          {getFieldDecorator('correctOptionId')(
            <Select>
              {option_index_list}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    )
  }
}


export const QuestionForm = Form.create({
  mapPropsToFields(props) {
    let fieldObj = {}
    for(let key of Object.keys(props.question)){
      fieldObj[key] = Form.createFormField({
        value: props.question[key],
      })
    }
    return fieldObj
  },
})(RawForm)
