import React, { Component } from 'react'
import {Item, ItemList} from '../item-list/item-list'
import {Button} from 'antd'

export class QuestionGroupList extends Component {
  groups = [
    {id: 1, name: 'test'},
    {id: 2, name: 'test'},
    {id: 3, name: 'test'}
  ];
  render(){
    const questionItems = this.groups.map((group) => {
      return (
        <Item key={group.id.toString()} title={group.name}>
          <Button type="primary">Primary</Button>
        </Item>
      )
    })
    return (
      <ItemList>
        {questionItems}
      </ItemList>
    )
  }
}
