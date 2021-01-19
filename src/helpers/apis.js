import axios from 'axios'
import CONSTANTS from '@/constants/constants'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.responseType = 'json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default class ApiHelper {
  static async getJobsList (component) {
    const { description, location, fullTimeOnly } = component.search
    const { nextPage } = component

    const params = {
      description,
      location,
      full_time: fullTimeOnly,
      page: nextPage
    }

    await ApiHelper.fetchJobsList(component, params)
  }

  static async getJobDetails (component) {
    const { id } = component
    const url = `${CONSTANTS.PREFIX}/${CONSTANTS.GIT_HUB_JOB_DETAILS_URL}/${id}.json`

    axios.get(url).then(function (response) {
      component.jobDetails = response.data || []
    }).catch(function (error) {
      console.log(error)
    })
  }

  static async getDefaultGeoLocation (component) {
    const { description, location, fullTimeOnly } = component.search
    const { nextPage } = component
    let params = {
      description,
      location,
      full_time: fullTimeOnly,
      page: nextPage
    }

    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(function (position) {
        params.lat = position.coords.latitude
        params.long = position.coords.longitude
        return ApiHelper.fetchJobsList(component, params)
      }, function (error) {
        console.log(error)
        return ApiHelper.fetchJobsList(component, params)
      })
    }

    return ApiHelper.fetchJobsList(component, params)
  }

  static async fetchJobsList (component, params) {
    const url = `${CONSTANTS.PREFIX}/${CONSTANTS.GIT_HUB_JOBS_URL}`

    axios.get(url, {
      params
    }).then(function (response) {
      let data = response.data || []
      ApiHelper.setJobsData(component, data, params)
    }).catch(function (error) {
      console.log(error)
    })
  }

  static setJobsData (component, data, params) {
    component.setMoreDataExist({
      moreDataExist: (data.length === CONSTANTS.DEFAULT_PAGE_SIZE)
    })

    component.setNextPage({
      nextPage: params.page + 1
    })

    const jobsListPayload = {
      jobsList: data
    }
    component.setJobsList(jobsListPayload)
  }
}
