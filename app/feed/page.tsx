'use client';

import { MumbleCard } from '@/components/mumble-card/MumbleCard';
import { EMediaTypes } from '@/utils/enums/general.enum';
import { GeneralTemplate } from '@/templates/general/GeneralTemplate';

export default function Home() {
  return (
    <div className="flex ">
      <GeneralTemplate
        title="Welcome to Mumble"
        description="Did you hear that? They've shut down the main reactor. We'll be destroyed for sure. This is madness! We're doomed! There'll be no escape for the Princess this time. What's that? Artoo! Artoo-Detoo, where are you? At last! Where have you been? They're heading in this direction."
      >
        <MumbleCard
          creator={{
            id: 12564894,
            avatarUrl: 'https://placekitten.com/200/200',
            username: 'Bladimir',
          }}
          mediaUrl={'https://placekitten.com/1500/800'}
          id="01BX5ZZKBKACTAV9WEVGEMMVRY"
          likedBySelf={false}
          likes={100}
          mediaType={EMediaTypes.IMAGE}
          replies={32}
          text="Into the garbage chute, wise guy. Get in there you big furry oaf! I don't care what you smell! Get in there and don't worry about it. Wonderful girl! Either I'm going to kill her or I'm beginning to like her. Get in there! Oh! The garbage chute was a really wonderful idea."
          onLike={() => {}}
          onUnlike={() => {}}
        />
      </GeneralTemplate>
    </div>
  );
}
