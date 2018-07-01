import React, { Component } from 'react'
import {Item, ItemList} from '../item-list/item-list'
import {Button} from 'antd'
import * as api from '../../api'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {message} from 'antd/lib/index'


export class C extends Component {

  constructor(props){
    super(props)
    this.state = {
      exams: []
    }
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList = ()=>{
    api.get('/exam/list/').then((data) => {
      console.log(data)
      this.setState({
        exams: data
      })
    })
  }

  delete = (id)=>{
    return ()=>{
      api.get(`/exam/${id}/delete/`).then(() => {
        message.success('删除成功')
        this.fetchList()
      })
    }
  }

  render(){
    const examItems = this.state.exams.map((exam) => {
      return (
        <Item key={exam.id.toString()} title={exam.name}>
          <Link to={'/exam/'+exam.id}>
            <Button type='default'>编辑</Button>
          </Link>
          <Button type='danger' onClick={this.delete(exam.id)}>删除</Button>
        </Item>
      )
    })
    return (
      <div>
        {
          this.props.type === 'teacher' &&
          <Link to="/exam/create">
            <Button type='primary'>创建考试</Button>
          </Link>
        }
        <ItemList>
          {examItems}
        </ItemList>
      </div>
    )
  }
}

export const ExamList = withRouter(C)
