<template>
  <div class="app-header">
    <h4 class="app-header-title">Github Jobs</h4>
    <div class="app-header-theme-toggle">
      <font-awesome-icon icon="sun" />
      <toggle-button :value="isDarkTheme"
                     :color="checkboxColorOptions"
                     @change="toggleTheme"/>
      <font-awesome-icon icon="moon" />
    </div>
  </div>
</template>

<script>

import ToggleButton from 'vue-js-toggle-button'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { mapGetters, mapActions } from 'vuex'
import CONSTANTS from '@/constants/constants'

library.add(faMoon, faSun)

export default {
  name: 'AppHeader',
  comments: {
    ToggleButton
  },
  data () {
    return {
      checkboxColorOptions: CONSTANTS.CHECKBOX_TOGGLE_COLORS
    }
  },
  computed: {
    ...mapGetters({
      isDarkTheme: 'isDarkTheme'
    })
  },
  mounted () {
    this.onMounted()
  },
  methods: {
    ...mapActions({
      setTheme: 'setTheme'
    }),
    toggleTheme () {
      const themePayload = {
        isDarkTheme: (this.isDarkTheme === false)
      }
      this.setTheme(themePayload)
      const currentTheme = localStorage.getItem('theme')

      if (currentTheme === 'dark') {
        document.body.classList.toggle('light-mode')
      } else if (currentTheme === 'light') {
        document.body.classList.toggle('dark-mode')
      }
    },
    onMounted () {
      window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
        if (e.matches) {
          console.log('dark mode is enabled')
        } else {
          console.log('dark mode is disabled')
        }
      })
      if (window.matchMedia('prefers-color-scheme: dark').matches) {
        // It's a dark theme...
      } else {
        // It's not a dark theme...
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-header {
  background-image: url('~@/assets/images/app_header_background.jpg');
  background-color: #7fc8ff;
  height: 100px;
  border-radius: 0 0 0 75px;
  padding: 17px 50px;
}

.app-header-title {
  display: inline-block;
  float: left;
  margin-bottom: 0;
}

.app-header-theme-toggle {
  display: inline-block;
  float: right;
}
</style>
