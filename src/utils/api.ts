//TODO: Вынести домены в переменные окружения
const API_BASE = 'http://localhost:3030/api/v1';
const WS_BASE = 'ws://localhost:3030/api/v1';

//TODO: Типизировать headers и data;
export const api = {
  publishCore: async (subject: string, headers: never, data: never) =>
    fetch(`${API_BASE}/nats-core/publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, header: headers, data }),
    }),

  publishJetStream: async (subject: string, headers: never, data: never) =>
    fetch(`${API_BASE}/jetstream/publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, header: headers, data }),
    }),

  getStreamInfo: async (stream: string) => fetch(`${API_BASE}/jetstream/info/${stream}`),
};

export const wsUrls = {
  coreSubscribe: (subject: string) => `${WS_BASE}/nats-core/subscribe/${subject}`,
  jetStreamSubscribe: (stream: string) => `${WS_BASE}/jetstream/subscribe/${stream}`,
};
