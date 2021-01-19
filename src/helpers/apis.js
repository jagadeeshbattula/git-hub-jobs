import axios from 'axios'
import CONSTANTS from '@/constants/constants'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With, content-type'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.responseType = 'json'

export default class ApiHelper {
  static async getJobsList (component) {
    const { description, location, fullTimeOnly } = component.search

    const params = {
      description,
      location,
      full_time: fullTimeOnly
    }

    await ApiHelper.fetchJobsList(component, params)
  }

  static async getJobDetails (component) {
    const { id } = component
    const url = `${CONSTANTS.PREFIX}/${CONSTANTS.GIT_HUB_JOB_DETAILS_URL}/${id}.json`

    axios.get(url).then(function (response) {
      let data = response.data || []
      component.jobDetails = data
    }).catch(function (error) {
      console.log(error)
    })
  }

  static async getDefaultGeoLocation (component) {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(function (position) {
        // const params = {
        //   lat: position.coords.latitude,
        //   long: position.coords.longitude
        // }
        return ApiHelper.fetchJobsList(component, {})
      }, function () {
        return ApiHelper.fetchJobsList(component, {})
      })
    }

    return ApiHelper.fetchJobsList(component, {})
  }

  static async fetchJobsList (component, params) {
    const url = `${CONSTANTS.GIT_HUB_JOBS_URL}`

    axios.get(url, {
      params
    }).then(function (response) {
      let data = response.data || []
      const jobsListPayload = {
        jobsList: data
      }
      component.setJobsList(jobsListPayload)
    }).catch(function (error) {
      console.log(error)
    })
  }
}
