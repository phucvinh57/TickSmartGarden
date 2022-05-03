import { useState, useEffect } from 'react'


export default function useLastData(adaClient, feeds) {

  const [datum, setLastData] = useState({})

  useEffect(() => {
    let mounted = true
    const subscribeMqtt = async () => {
      if (!adaClient) return
      if (!feeds) return
      adaClient.subArray(feeds, (incomingTopic, message) => {
        let topic = [...feeds].filter(f => String(incomingTopic).includes(f))[0]
        if (!topic || !mounted) return
        setLastData(prevData => ({
          ...prevData,
          [topic]: String(message)
        }))
      })
    }
    subscribeMqtt().catch(console.error)

    return () => { mounted = false }
  }, [adaClient]);
  

  useEffect(() => {
    let mounted = true
    const fetchInitValue = async () => {
      if (!adaClient) return
      if (!feeds) return
      console.log('fetchInitValue ')
      for (let i in feeds) {
        const incomingTopic = feeds[i]
        const message = await adaClient.fetchLastData(incomingTopic)
        let topic = [...feeds].filter(f => String(incomingTopic).includes(f))[0]
        if (!topic || !mounted) return
        setLastData(prevData => ({
          ...prevData,
          [topic]: String(message)
        }))
      }
    }
    fetchInitValue().catch(console.error)

    return () => { mounted = false }
  }, [])
  
  const publishMqtt = (feedKey, value) => {
    // if (!adaClient) return
    adaClient.pub(feedKey, value)
  }
 
  return [datum, publishMqtt]
}