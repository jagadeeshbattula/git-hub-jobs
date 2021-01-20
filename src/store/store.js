import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isDarkTheme: false,
    search: {
      description: '',
      location: '',
      fullTimeOnly: false
    },
    jobsList: [],
    nextPage: 1,
    moreDataExist: false
  },
  mutations: {
    setTheme (state, themePayload) {
      const { isDarkTheme } = themePayload
      state.isDarkTheme = isDarkTheme
    },
    setSearch (state, searchPayload) {
      const { search } = searchPayload
      state.search = search
    },
    setJobsList (state, jobsListPayload) {
      const { jobsList } = jobsListPayload
      const currentJobs = state.jobsList
      state.jobsList = [
        ...currentJobs,
        ...jobsList
      ]
    },
    setNextPage (state, nextPagePayload) {
      const { nextPage } = nextPagePayload
      state.nextPage = nextPage
    },
    setMoreDataExist (state, moreDataExistPayload) {
      const { moreDataExist } = moreDataExistPayload
      state.moreDataExist = moreDataExist
    },
    resetSearchData (state) {
      state.jobsList = []
      state.nextPage = 1
      state.moreDataExist = false
    }
  },
  actions: {
    setTheme ({ commit }, themePayload) {
      commit('setTheme', themePayload)
    },
    setSearch ({ commit }, searchPayload) {
      commit('setSearch', searchPayload)
    },
    setJobsList ({ commit }, jobsListPayload) {
      commit('setJobsList', jobsListPayload)
    },
    setNextPage ({ commit }, nextPagePayload) {
      commit('setNextPage', nextPagePayload)
    },
    setMoreDataExist ({ commit }, moreDataExistPayload) {
      commit('setMoreDataExist', moreDataExistPayload)
    },
    resetSearchData ({ commit }) {
      commit('resetSearchData')
    }
  },
  getters: {
    search: state => {
      return state.search
    },
    isDarkTheme: state => {
      return (state.isDarkTheme === true)
    },
    jobsList: state => {
      return state.jobsList
    },
    nextPage: state => {
      return state.nextPage
    },
    moreDataExist: state => {
      return state.moreDataExist
    }
  }
})

export default store
