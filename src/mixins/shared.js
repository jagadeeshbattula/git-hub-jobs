import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isDarkTheme: 'isDarkTheme'
    }),
    setThemeAttribute () {
      return (this.isDarkTheme === true) ? 'dark' : 'light'
    }
  }
}
