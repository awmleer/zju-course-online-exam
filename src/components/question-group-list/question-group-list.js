import React, { Component } from 'react'
import {Item, ItemList} from '../item-list/item-list'
import {Button} from 'antd'
import * as api from '../../api'

export class QuestionGroupList extends Component {

  constructor(props){
    super(props)
    this.state = {
      groups: [
        {id: 1, name: 'test'},
      ]
    }
  }

  componentDidMount() {
    api.get('/question/group/list/').then((data) => {
      console.log(data)
      this.setState({
        groups: data
      })
    })
  }

  test = ()=>{
    this.setState(prevState => ({
      groups: [
        {id: 1, name: 'test'},
        {id: 2, name: 'test'},
        {id: 3, name: 'test'},
      ]
    }))
  }



  render(){
    const questionItems = this.state.groups.map((group) => {
      return (
        <Item key={group.id.toString()} title={group.name}>
          <Button type='default'>Primary</Button>
        </Item>
      )
    })
    return (
      <div>
        <Button type='primary' onClick={this.test}>创建题库</Button>
        <ItemList>
          {questionItems}
        </ItemList>
      </div>
    )
  }
}
