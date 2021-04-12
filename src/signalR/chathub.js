import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@aspnet/signalr'
export default {
  install (Vue) {
    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:44381/chathub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Information)
      .build()
      
      let startedPromise = null
      function start () {
        startedPromise = connection.start().catch(err => {
          console.error('Failed to connect with hub', err)
          return new Promise((resolve, reject) => 
            setTimeout(() => start().then(resolve).catch(reject), 5000))
        })
        return startedPromise
      }
      connection.onclose(() => start())
       
      start()

    // use new Vue instance as an event bus
    const chathub = new Vue() 
    // every component will use this.$questionHub to access the event bus
    Vue.prototype.$chathub = chathub
    // forward server side SignalR events through $chathub, where components will listen to them
    connection.on('MessageSent', chatMessage => {
        chathub.$emit('message-sent', chatMessage)
    })

    chathub.messageSent = (message) => {
        return startedPromise.then(() => connection.invoke('MessageSent', message)).catch(console.error)
    }

    chathub.roomJoined = (roomID) => {
        return startedPromise.then(() => connection.invoke('JoinRoom', roomID)).catch(console.error)
    }
    chathub.roomLeft = (roomID) => {
        return startedPromise.then(() => connection.invoke('LeaveRoom', roomID)).catch(console.error)
    }
  }
}