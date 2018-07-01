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
      groups: []
    }
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList = ()=>{
    api.get('/question/group/list/').then((data) => {
      console.log(data)
      this.setState({
        groups: data
      })
    })
  }

  delete = (id)=>{
    return ()=>{
      api.get(`/question/group/${id}/delete/`).then(() => {
        message.success('删除成功')
        this.fetchList()
      })
    }
  }

  render(){
    const groupItems = this.state.groups.map((group) => {
      return (
        <Item key={group.id.toString()} title={group.name}>
          <Link to={'/question-group/'+group.id}>
            <Button type='default'>编辑</Button>
          </Link>
          <Button type='danger' onClick={this.delete(group.id)}>删除</Button>
        </Item>
      )
    })
    return (
      <div>
        <Link to="/question-group/create">
          <Button type='primary'>创建题目组</Button>
        </Link>
        <ItemList>
          {groupItems}
        </ItemList>
      </div>
    )
  }
}

export const QuestionGroupList = withRouter(C)
