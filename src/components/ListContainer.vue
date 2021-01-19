<template>
  <div class="container jobs-list-container">
    <div class="jobs-list row">
      <job-post v-for="job in jobsList"
                :key="job.id"
                v-bind="getJobPostProps(job)" />
    </div>
    <div v-if="moreDataExist" class="d-flex justify-content-center mt-5 pb-4">
      <button class="btn btn-primary" @click.prevent="fetchNextPage">Load More</button>
    </div>
  </div>
</template>

<script>
import JobPost from '@/components/JobPost'
import { mapGetters, mapActions } from 'vuex'
import ApiHelper from '@/helpers/apis'

export default {
  name: 'ListContainer',
  components: {JobPost},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      search: 'search',
      nextPage: 'nextPage',
      moreDataExist: 'moreDataExist',
      jobsList: 'jobsList'
    })
  },
  methods: {
    ...mapActions({
      setSearch: 'setSearch',
      setJobsList: 'setJobsList',
      setNextPage: 'setNextPage',
      setMoreDataExist: 'setMoreDataExist',
      resetSearchData: 'resetSearchData'
    }),
    getJobPostProps (jobPostDetails) {
      return {
        id: jobPostDetails.id,
        company: jobPostDetails.company || '',
        companyLogo: jobPostDetails.company_logo || '',
        location: jobPostDetails.location || '',
        type: jobPostDetails.type || '',
        title: jobPostDetails.title || '',
        postedTime: jobPostDetails.created_at || ''
      }
    },
    fetchNextPage () {
      ApiHelper.getJobsList(this)
    }
  }
}
</script>

<style scoped>
.jobs-list-container {
  margin-top: 50px;
}

.jobs-list {
  max-width: 845px;
  border-radius: 5px;
  margin: 0 auto;
}
</style>
