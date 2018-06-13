import React, { Component } from 'react'
import {Item, ItemList} from '../item-list/item-list'

export class QuestionList extends Component {
  questions = [
    {id: 1, description: 'test'},
    {id: 2, description: 'test'},
    {id: 3, description: 'test'}
  ];
  render(){
    const questionItems = this.questions.map((question) => {
      return (
        <Item key={question.id.toString()}>
          {question.description}
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
