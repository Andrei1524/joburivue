

export default function ({ app, $axios, redirect }) {
  $axios.onError(error => {
    $nuxt.$emit('startNotificationService', {
      type: 'showError',
      error
    })
  })
}