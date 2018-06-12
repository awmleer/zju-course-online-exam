import React, { Component } from 'react'
import {Home} from '../home/home'
import {QuestionList} from '../question-list/question-list'
import {Switch, Route, Link} from 'react-router-dom'


export class Routes extends Component {
  render(){
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/question/list' component={QuestionList}/>
      </Switch>
    )
  }
}
