import React, { Component } from 'react'
import {Home} from '../home/home'
import {QuestionList} from '../question-list/question-list'
import {Switch, Route} from 'react-router-dom'
import {QuestionGroupList} from '../question-group-list/question-group-list'
import {Question} from '../question/question'


export class Routes extends Component {

  // QuestionPage = ({ match }) => (
  //   <Question id={match.params.id} create/>
  // );

  render(){
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/home' component={Home}/>
        <Route path='/question-group/list' component={QuestionGroupList}/>
        <Route path='/question/list' component={QuestionList}/>
        <Route path='/question/:id(\d+)' component={Question}/>
        <Route path='/question/create' component={Question}/>

      </Switch>
    )
  }
}
