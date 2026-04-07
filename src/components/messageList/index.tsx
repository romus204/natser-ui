import { useEffect, useRef } from 'react';
import { Message } from '../../hooks/useWebs';
import cn from 'classnames';
import css from './index.module.css';

type MessageListProps = {
  messages: Message[];
};

export function MessageList({ messages }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevLength = useRef(0);

  useEffect(() => {
    if (containerRef.current && messages.length > prevLength.current) {
      containerRef.current.classList.add('flash');
      setTimeout(() => containerRef.current?.classList.remove('flash'), 300);
    }
    prevLength.current = messages.length;
  }, [messages.length]);

  return (
    <div className={cn(css.list, messages.length > 0 && css.expanded)} ref={containerRef}>
      {messages.length <= 0 && <span className={css.empty}>No messages</span>}
      {messages.length > 0 &&
        messages.map((message, index) => (
          <div key={`message_${index}_${message.time}`} className={css.message}>
            <span className={css.time}>{message.time}</span>
            {message.headers && Object.keys(message.headers).length > 0 && (
              <div className={css.headers}>
                {Object.entries(message.headers).map(([key, value]) => (
                  <span key={`header_${key}`} className={css.tag}>
                    {key}: {Array.isArray(value) ? value.join(', ') : value}
                  </span>
                ))}
              </div>
            )}
            <pre className={css.raw}>{JSON.stringify(message.data, null, 2)}</pre>
          </div>
        ))}
    </div>
  );
}
