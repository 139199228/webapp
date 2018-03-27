import React from 'react'
import {
  Route,
} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import topicDetail from '../views/topic-detail/index'

export default () => [
  <Route path="/" component={TopicList} exact />,
  <Route path="/list" component={TopicList} />,
  <Route path="/detail" component={topicDetail} />,
]
