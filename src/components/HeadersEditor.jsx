import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "components/button";

import './HeadersEditor.css'

export function HeadersEditor({ value, onChange }) {
    const [headers, setHeaders] = useState(value?.length ? value : [{ key: '', value: '' }])

    const updateHeaders = (newHeaders) => {
        setHeaders(newHeaders)
        const obj = {}
        newHeaders
            .filter(h => h.key.trim())
            .forEach(h => {
                obj[h.key] = h.value ? [h.value] : []
            })
        onChange(obj)
    }

    const addHeader = () => {
        updateHeaders([...headers, { key: '', value: '' }])
    }

    const removeHeader = (index) => {
        if (headers.length === 1) {
            updateHeaders([{ key: '', value: '' }])
        } else {
            updateHeaders(headers.filter((_, i) => i !== index))
        }
    }

    const updateHeader = (index, field, val) => {
        const newHeaders = [...headers]
        newHeaders[index][field] = val
        updateHeaders(newHeaders)
    }

    return (
        <div className="headers-editor">
            <label>Headers</label>
            {headers.map((h, i) => (
                <div key={i} className="header-row">
                    <input
                        placeholder="Key"
                        value={h.key}
                        onChange={(e) => updateHeader(i, 'key', e.target.value)}
                        className="header-key"
                    />
                    <input
                        placeholder="Value"
                        value={h.value}
                        onChange={(e) => updateHeader(i, 'value', e.target.value)}
                        className="header-value"
                    />
                    <button className="btn-remove" onClick={() => removeHeader(i)}>
                        <X size={14} />
                    </button>
                </div>
            ))}
            <Button variant="secondary" onClick={addHeader} icon='plus'>
                Add Header
            </Button>
        </div>
    )
}
