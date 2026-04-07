import { useState } from 'react'
import { Send } from 'lucide-react'
import { TextArea } from 'components/textarea'
import { HeadersEditor } from './HeadersEditor'
import { Button } from "components/button";
import { Input } from "components/input";

export function PublishForm({ title, onPublish, subjectPlaceholder = 'subject' }) {
    const [subject, setSubject] = useState('')
    const [data, setData] = useState('')
    const [headers, setHeaders] = useState({})
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            await onPublish(subject, headers, data)
        } catch (e) {
            alert('✗ ' + e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="card">
            <h3><Send size={18} /> {title}</h3>
            <Input label="Subject" value={subject} onChange={setSubject} placeholder={subjectPlaceholder} />
            <HeadersEditor value={Object.entries(headers).map(([k, v]) => ({ key: k, value: v[0] || '' }))} onChange={setHeaders} />
            <TextArea label="Data" value={data} onChange={setData} placeholder='Data' />
            <Button className='send' variant="primary" onClick={handleSubmit} disabled={loading || !subject} icon='send'>
                {loading ? 'Sending...' : 'Send'}
            </Button>
        </section>
    )
}
