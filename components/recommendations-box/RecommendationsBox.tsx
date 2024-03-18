/**
 * Author: bladimirardiles
 * Component File Name: RecomendationsBox.js
 * Component Name: RecomendationsBox
 * Project: nextjs-app
 * Date: Mon 18/03/2024 - 20:46
 */
import Recommendation from '@/components/recommendation/Recommendation';

const mockData = [
  {
    firstname: 'Christoph',
    lastname: 'Bühler',
    id: '229387640351294793',
    username: 'christoph@smartive.ch',
    avatarUrl: null,
  },
  {
    firstname: 'Christoph',
    lastname: 'Bühler',
    id: '243142103851459040',
    username: 'cb-auth-demo',
    avatarUrl: null,
  },
  {
    firstname: 'Peter',
    lastname: 'Manser',
    id: '243752335757595349',
    username: 'petermanser',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/74a47cec-8de0-4675-8b41-d11ef904f0a7',
  },
  {
    firstname: 'Patrick',
    lastname: 'Lehmann',
    id: '245807822799993686',
    username: 'patrick',
    avatarUrl: null,
  },
  {
    firstname: 'Albin',
    lastname: 'Hoti',
    id: '245807989095758678',
    username: 'allphii_🔺',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/d116d06e-b254-4aa3-b02b-b759a3f786fe',
  },
  {
    firstname: 'Nico',
    lastname: 'Lutz',
    id: '245808067160180753',
    username: 'nico',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/3dd7812f-1161-4ba2-915d-e38ae9a3e251',
  },
  {
    firstname: 'Claudio',
    lastname: 'Steffen',
    id: '245808142053636950',
    username: 'claudio',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/96249871-b544-48cf-b3ae-bad12deca7fb',
  },
  {
    firstname: 'R',
    lastname: 'Vögeli',
    id: '245808535730944854',
    username: 'richard',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/19b781c1-08bb-42f7-86e8-915cee9b54b6',
  },
  {
    firstname: 'Malinovic',
    lastname: 'Danijel',
    id: '245808936706407254',
    username: 'malinovic',
    avatarUrl: null,
  },
  {
    firstname: 'André',
    lastname: 'Ceres',
    id: '245809311459051537',
    username: 'andre',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/28e17313-a62b-411f-8128-f005b908a853',
  },
  {
    firstname: 'Bladimir',
    lastname: 'Ardiles Cruz',
    id: '245810520291018769',
    username: 'Bladimir',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/a38e4d67-abd2-4a87-91c9-570949945f33',
  },
];

import React from 'react';

interface IProps {}

const RecommendationsBox = ({}: IProps) => {
  return (
    <div className="flex flex-wrap">
      {mockData.map((item, index) => {
        return (
          <div
            key={item.id}
            className={`${(index + 1) % 3 === 0 ? '' : 'mr-[2%]'} w-[32%] mb-4`}
          >
            <Recommendation
              id={item.id}
              username={item.username}
              avatarUrl={item.avatarUrl}
              firstname={item.firstname}
              lastname={item.lastname}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RecommendationsBox;
