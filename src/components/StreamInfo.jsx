import { useState } from 'react'
import { Box } from 'lucide-react'
import { Input } from "components/input";
import { Button } from "components/button";

export function StreamInfo({ onGetInfo }) {
    const [stream, setStream] = useState('')
    const [info, setInfo] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleGetInfo = async () => {
        setLoading(true)
        try {
            const res = await onGetInfo(stream)
            setInfo(await res.json())
        } catch (e) {
            alert('✗ ' + e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="card">
            <h3><Box size={18} /> Stream Info</h3>
            <div className="row">
                <Input value={stream} onChange={setStream} placeholder="Stream name" />
                <Button variant="secondary" onClick={handleGetInfo} disabled={loading || !stream}>
                    {loading ? 'Loading...' : 'Get Info'}
                </Button>
            </div>
            {info && <pre className="info-output">{JSON.stringify(info, null, 2)}</pre>}
        </section>
    )
}
