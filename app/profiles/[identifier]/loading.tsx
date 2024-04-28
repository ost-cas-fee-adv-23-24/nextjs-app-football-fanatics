import React from 'react';
import { ProfileHeaderPlaceholder } from '@/components/placeholders/ProfileHeaderPlaceholder';
import { ProfileSwitchPlaceholder } from '@/components/placeholders/ProfileSwitchPlaceholder';

export default function Loading() {
  return (
    <div className="global-width mx-auto md:pt-4">
      <div>
        <ProfileHeaderPlaceholder />
      </div>
      <div>
        <ProfileSwitchPlaceholder />
      </div>
    </div>
  );
}
