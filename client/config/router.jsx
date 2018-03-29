import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import topicDetail from '../views/topic-detail/index'
import TestApi from '../views/test/api-test'


export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} component={TopicList} exact  key="first" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail" component={topicDetail} key="detail" />,
  <Route path="/test" component={TestApi} key="test" />,
]
