import React, { Component } from 'react'
import {Item, ItemList} from '../item-list/item-list'
import './question-list.scss'
import {Button, message} from 'antd'
import * as api from '../../api'
import {Link} from 'react-router-dom'

export class QuestionList extends Component {
  constructor(props){
    super(props)
    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList = ()=>{
    api.get('/question/list/').then((data) => {
      console.log(data)
      this.setState({
        questions: data
      })
    })
  }

  delete = (questionId)=>{
    return ()=>{
      api.get(`/question/${questionId}/delete/`).then(() => {
        message.success('删除成功')
        this.fetchList()
      })
    }
  }

  render(){
    const questionItems = this.state.questions.map((question) => {
      return (
        <Item key={question.id.toString()} title={question.description}>
          <Link to={'/question/'+question.id}>
            <Button type='default'>编辑</Button>
          </Link>
          <Button type='danger' onClick={this.delete(question.id)}>删除</Button>
        </Item>
      )
    })
    return (
      <div>
        <Link to="/question/create">
          <Button type='primary' onClick={this.test}>创建题目</Button>
        </Link>
        <ItemList>
          {questionItems}
        </ItemList>
      </div>
    )
  }
}
