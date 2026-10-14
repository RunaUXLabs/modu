import React from 'react';
import { StoreProvider } from './features/scheduling/model/store.jsx';
import { MEMBERS } from './features/scheduling/model/data.js';
import { MembersProvider } from '@design-system';
import MeetingPage from './pages/MeetingPage.jsx';

export default function App() {
  return (
    <StoreProvider>
      <MembersProvider members={MEMBERS}><MeetingPage /></MembersProvider>
    </StoreProvider>
  );
}
