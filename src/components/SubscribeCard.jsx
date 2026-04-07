import { Wifi } from 'lucide-react'
import { Input } from "components/input";
import { Button } from "components/button";
import { useWebSocket } from '../hooks/useWebSocket.js'
import { useState } from 'react'
import { MessageList } from "components/messageList";

export function SubscribeCard({ title, wsUrlBuilder, placeholder = 'subject/stream' }) {
    const [target, setTarget] = useState('')
    const wsUrl = target ? wsUrlBuilder(target) : null
    const { status, messages, connect, disconnect } = useWebSocket(wsUrl)

    const isConnected = status === 'connected'

    return (
        <section className="card">
            <h3><Wifi size={18} /> {title}</h3>
            <div className="row">
                <Input value={target} onChange={setTarget} placeholder={placeholder} />
                <Button
                    variant={isConnected ? 'danger' : 'success'}
                    onClick={isConnected ? disconnect : connect}
                    disabled={!target}
                    icon={isConnected ? 'wifi-off' : 'wifi'}
                >
                    {isConnected ? 'Disconnect' : 'Connect'}
                </Button>
            </div>
            <MessageList messages={messages} />
        </section>
    )
}
