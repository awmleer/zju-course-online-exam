import React, { Component } from 'react'
import {Item, ItemList} from '../item-list/item-list'
import './question-list.scss'
import {Button} from 'antd'
import * as api from '../../api'

export class QuestionList extends Component {
  constructor(props){
    super(props)
    this.state = {
      questions: [
        {id: 1, description: 'test'},
      ]
    }
  }

  componentDidMount() {
    api.get('/question/list/').then((data) => {
      console.log(data)
      this.setState({
        questions: data
      })
    })
  }

  render(){
    const questionItems = this.state.questions.map((question) => {
      return (
        <Item key={question.id.toString()} title={question.description}>
          <Button type='default'>编辑</Button>
          <Button type='danger'>删除</Button>
        </Item>
      )
    })
    return (
      <div>
        <Button type='primary' onClick={this.test}>创建题目</Button>
        <ItemList>
          {questionItems}
        </ItemList>
      </div>
    )
  }
}
