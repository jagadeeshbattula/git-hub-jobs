<template>
  <div class="container search-container">
    <div v-bind:inner-background-color="setThemeAttribute" v-bind:text-color="setThemeAttribute" class="row search-row">
      <div class="form-inline">
        <div class="input-group m-2 mr-sm-2">
          <div class="input-group-prepend">
            <div class="input-group-text"><font-awesome-icon icon="search" /></div>
          </div>
          <input v-bind:inner-background-color="setThemeAttribute" type="text" class="form-control" id="job-description" v-model="searchData.description" placeholder="Job description">
        </div>

        <div class="input-group m-2 mr-sm-2">
          <div class="input-group-prepend">
            <div class="input-group-text"><font-awesome-icon icon="map-marker" /></div>
          </div>
          <input v-bind:inner-background-color="setThemeAttribute" type="text" class="form-control" id="job-location" v-model="searchData.location" placeholder="Job location">
        </div>

        <div class="form-check m-2 mr-sm-2">
          <input v-bind:inner-background-color="setThemeAttribute" class="form-check-input" type="checkbox" v-model="searchData.fullTimeOnly" id="full-time-jobs">
          <label class="form-check-label" for="full-time-jobs">
            Full time only
          </label>
        </div>

        <div class="form-check m-2 mr-sm-2">
          <button type="submit" class="btn btn-primary m-2" @click.prevent="getSearchResults">Submit</button>
          <button v-show="!searchFieldsEmpty" type="button" class="btn btn-secondary m-2" @click.prevent="resetSearch">Clear</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ApiHelper from '@/helpers/apis'
import { isEmpty as _isEmpty } from 'lodash'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faMapMarker } from '@fortawesome/free-solid-svg-icons'
import SharedMixin from '@/mixins/shared'

library.add(faSearch, faMapMarker)

export default {
  name: 'SearchPanel',
  mixins: [SharedMixin],
  data () {
    return {
      searchData: {
        description: '',
        location: '',
        fullTimeOnly: false
      }
    }
  },
  mounted () {
    this.onMounted()
  },
  computed: {
    ...mapGetters({
      search: 'search',
      nextPage: 'nextPage',
      moreDataExist: 'moreDataExist',
      jobsList: 'jobsList'
    }),
    hasNoSearchData () {
      return this.searchFieldsEmpty && _isEmpty(this.jobsList)
    },
    searchFieldsEmpty () {
      return _isEmpty(this.searchData.description) &&
        _isEmpty(this.searchData.location) &&
        this.searchData.fullTimeOnly === false
    }
  },
  methods: {
    ...mapActions({
      setSearch: 'setSearch',
      setJobsList: 'setJobsList',
      setNextPage: 'setNextPage',
      setMoreDataExist: 'setMoreDataExist',
      resetSearchData: 'resetSearchData'
    }),
    async onMounted () {
      this.searchData = this.search
      if (this.hasNoSearchData) {
        await ApiHelper.getDefaultGeoLocation(this)
      }
    },
    async getSearchResults () {
      this.resetSearchData()
      const searchPayload = {
        search: this.searchData
      }
      this.setSearch(searchPayload)
      await ApiHelper.getJobsList(this)
    },
    resetSearch () {
      this.resetSearchData()
      const emptySearchFields = {
        description: '',
        location: '',
        fullTimeOnly: false
      }
      this.searchData = emptySearchFields
      const searchPayload = {
        search: emptySearchFields
      }
      this.setSearch(searchPayload)
    }
  }
}
</script>

<style scoped>
.search-container {
  margin-top: -30px;
}

.search-row {
  max-width: 845px;
  border-radius: 5px;
  margin: 0 auto
}
</style>
