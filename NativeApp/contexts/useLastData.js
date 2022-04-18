import { useState, useEffect, useContext } from 'react'
import { GardenContext } from './GardenContext'

function DEBUG_LOG(msg) {
  // console.log(msg)
}

export default function useLastData(feeds) {
  // DEBUG_LOG(`useLastData(${feeds})`)
  const { adaClient: client } = useContext(GardenContext)

  const [lastData, setLastData] = useState(() => {
    let dict = {}
    for (let i in feeds) {
      dict[feeds[i]] = null
    }
    return dict
  })

  useEffect(() => {
    const subscribeMqtt = async () => {
      if (!client) return
      DEBUG_LOG('subscribeMqtt')
      client.subArray(feeds, _handleMessageArrived)
    }
    subscribeMqtt().catch(console.error)
  }, [client]);
  
  useEffect(() => {
    const fetchInitValue = async () => {
      if (!client) return
      DEBUG_LOG('fetchInitValue ')
      for (let i in feeds) {
        let value = await client.fetchLastData(feeds[i])
        _handleMessageArrived(feeds[i], value)
      }
    }
    fetchInitValue().catch(console.error)
  }, [])

  const _handleMessageArrived = (incomingTopic, message) => {
    let topic = null
    for (let i in feeds) {
      if (String(incomingTopic).includes(feeds[i])) {
        topic = feeds[i]
        break
      }
    }
    DEBUG_LOG(`_handleMessageArrived(${topic}, ${message})`)
    setLastData(prevData => ({
      ...prevData,
      [topic]: String(message)
    }))
  }
  
  const publish = (feedKey, value) => {
    DEBUG_LOG(`publish(${feedKey}, ${value})`)
    if (!client) return
    client.pub(feedKey, value)
  }
  
  return [lastData, publish]
}