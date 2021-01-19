<template>
  <div class="container jobs-list-container">
    <div class="jobs-list row">
      <job-post v-for="job in jobsList"
                :key="job.id"
                v-bind="getJobPostProps(job)" />
    </div>
  </div>
</template>

<script>
import JobPost from '@/components/JobPost'
import { mapGetters } from 'vuex'

export default {
  name: 'ListContainer',
  components: {JobPost},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      jobsList: 'jobsList'
    })
  },
  methods: {
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
