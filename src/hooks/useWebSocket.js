import { useState, useEffect, useCallback, useRef } from 'react'

export function useWebSocket(url) {
  const [ws, setWs] = useState(null)
  const [status, setStatus] = useState('disconnected')
  const [messages, setMessages] = useState([])
  const urlRef = useRef(url)

  const connect = useCallback(() => {
    if (!url) return
    
    // Закрываем старое соединение если URL изменился
    if (urlRef.current !== url && ws) {
      ws.close()
    }
    
    urlRef.current = url
    const socket = new WebSocket(url)
    
    socket.onopen = () => setStatus('connected')
    socket.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        setMessages(prev => [{
          time: new Date().toLocaleTimeString(),
          data: data.data || data,
          headers: data.headers || {}
        }, ...prev])
      } catch {
        setMessages(prev => [{
          time: new Date().toLocaleTimeString(),
          data: e.data,
          headers: {}
        }, ...prev])
      }
    }
    socket.onclose = () => setStatus('disconnected')
    socket.onerror = () => setStatus('error')
    
    setWs(socket)
    setMessages([])
  }, [url])

  const disconnect = useCallback(() => {
    ws?.close()
    setWs(null)
    setStatus('disconnected')
  }, [ws])

  // Закрываем соединение при смене URL
  useEffect(() => {
    if (urlRef.current !== url && ws) {
      ws.close()
      setWs(null)
      setStatus('disconnected')
      urlRef.current = url
    }
  }, [url, ws])

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      ws?.close()
    }
  }, [ws])

  return { ws, status, messages, connect, disconnect, setMessages }
}
