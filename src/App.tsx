import { useMemo, useState } from 'react';
import { PublishForm } from 'components/PublishForm';
import { StreamInfo } from 'components/StreamInfo';
import { SubscribeCard } from 'components/SubscribeCard';
import { api, wsUrls } from './utils/api';

import { TabId, Tabs } from 'components/tabs';
import { Header } from 'components/header';

import './App.css';
import cn from 'classnames';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('core');

  const getTabData = useMemo(() => {
    switch (activeTab) {
      case 'core':
        return {
          api: api.publishCore,
          subscribeCardPlaceholder: 'Subject to subscribe',
          cardBuilder: wsUrls.coreSubscribe,
        };
      case 'jetstream':
        return {
          api: api.publishJetStream,
          subscribeCardPlaceholder: 'Stream name',
          cardBuilder: wsUrls.jetStreamSubscribe,
        };
      default:
        return {
          api: api.publishCore,
          subscribeCardPlaceholder: 'Subject to subscribe',
          cardBuilder: wsUrls.coreSubscribe,
        };
    }
  }, [activeTab]);

  return (
    <div className="app">
      <Header />
      <Tabs activeTab={activeTab} onChange={setActiveTab} />
      <main className="content">
        <div
          className={cn(
            'container',
            activeTab === 'core' && 'panel-2-col',
            activeTab === 'jetstream' && 'panel-jetstream'
          )}
        >
          <PublishForm
            title="Publish"
            onPublish={getTabData.api}
            subjectPlaceholder="Subject name"
          />
          <SubscribeCard
            title="Subscribe"
            wsUrlBuilder={getTabData.cardBuilder}
            placeholder={getTabData.subscribeCardPlaceholder}
          />
          {activeTab === 'jetstream' && <StreamInfo onGetInfo={api.getStreamInfo} />}
        </div>
      </main>
    </div>
  );
}

export default App;
