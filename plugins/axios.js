export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
      console.log('Making request to ' + config.url)
    })
  
    $axios.onError(error => {
        if(error.response.status != 200) {
            let isMaintain = $axios.get('https://raw.githubusercontent.com/playbaby/maintenance/master/maintain_status.json')
            
          }
    })
  }