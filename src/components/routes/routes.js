import React, { Component } from 'react'
import {Home} from '../home/home'
import {QuestionList} from '../question-list/question-list'
import {Switch, Route} from 'react-router-dom'
import {QuestionGroupList} from '../question-group-list/question-group-list'
import {Question} from '../question/question'
import {QuestionGroup} from '../question-group/question-group'
import {ExamList} from '../exam-list/exam-list'
import {Exam} from '../exam/exam'
import {ExamParticipate} from '../exam-participate/exam-participate'
import {ExamResult} from '../exam-result/exam-result'


export class Routes extends Component {

  render(){

    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/home' component={Home}/>
        <Route path='/question-group/list' component={QuestionGroupList}/>
        <Route path='/question-group/:id(\d+)' component={QuestionGroup}/>
        <Route path='/question-group/create' component={QuestionGroup}/>
        <Route path='/question/list' component={QuestionList}/>
        <Route path='/question/:id(\d+)' component={Question}/>
        <Route path='/question/create' component={Question}/>
        <Route path='/exam/list/:type' component={ExamList}/>
        <Route path='/exam/:id(\d+)/participate' component={ExamParticipate}/>
        <Route path='/exam/:id(\d+)/result' component={ExamResult}/>
        <Route path='/exam/:id(\d+)' component={Exam}/>
        <Route path='/exam/create' component={Exam}/>
      </Switch>
    )
  }
}
