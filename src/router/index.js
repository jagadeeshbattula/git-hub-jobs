import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import JobPostDetails from '@/components/JobPostDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: JobPostDetails
    }
  ]
})
