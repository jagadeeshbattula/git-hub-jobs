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
    jobsList: []
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
      state.jobsList = jobsList
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
    }
  }
})

export default store
