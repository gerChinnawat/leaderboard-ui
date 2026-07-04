'use client';

import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Item, ItemContent, ItemTitle } from '@/components/ui/item';

import { racers } from '../data/racers';
import { Racer } from '../types/racer.interface';
import { toMillisecond } from '../utils/toMillisecond';
import AddRacerFrom from '../components/AddRacerForm';
import { toTimeStampForm, diffFromLeader } from '../utils';

import { MAX_RACER } from '../constants/racer.constant';

const LeaderboardScreen = () => {
  const [boardleader, setboardleader] = useState<Racer[]>(racers);
  const [leader, setLeader] = useState<Racer>();
  const [parent] = useAutoAnimate();

  const onAddRacer = (racer: Racer) => {
    const newRacer: Racer = {
      id: boardleader.length + 1,
      name: racer.name,
      colorTag: racer.colorTag,
      timeStamp: toTimeStampForm(racer.timeStamp),
    };
    setboardleader((prev) => {
      const newRacers = [...prev, newRacer];
      const sortedRacers = newRacers.sort(
        (a, b) => toMillisecond(a.timeStamp) - toMillisecond(b.timeStamp),
      );
      setLeader(sortedRacers[0]);
      return sortedRacers;
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-2 w-full max-w-5xl">
      <AddRacerFrom onAddRacer={onAddRacer} disable={boardleader.length >= MAX_RACER} />
      <div
        ref={parent}
        className="grid grid-cols-1 sm:grid-flow-col sm:grid-rows-10 lg:grid-rows-10 gap-1 w-full md:w-auto sm:min-w-fit"
      >
        {boardleader.map((racer: Racer, index) => (
          <div
            key={racer.id}
            className={'flex w-full max-w-full flex-col gap-4 min-w-0 sm:min-w-60'}
          >
            <Item variant="outline" className="bg-gray-50 py-1.5 px-4">
              <ItemContent>
                <ItemTitle className="text-black font-bold text-[16px]">
                  <div
                    data-testid="racer-position"
                    className={
                      index === 0
                        ? 'bg-red-500 h-6 w-6 text-center rounded-xl'
                        : 'h-6 w-6 text-center'
                    }
                  >
                    {index + 1}
                  </div>
                  <div className="flex gap-2">
                    <div
                      style={{ backgroundColor: racer.colorTag }}
                      className="w-5 h-5 rounded-sm"
                    />
                    {racer.name}
                  </div>
                </ItemTitle>
                <div className="text-black text-[16px] font-bold">
                  <div className="flex w-full justify-between">
                    <div data-testid="racer-time">{racer.timeStamp}</div>
                    {index === 0 ? (
                      'LEADER'
                    ) : (
                      <div className="text-red-500">
                        +{diffFromLeader(leader?.timeStamp || racers[0].timeStamp, racer.timeStamp)}
                      </div>
                    )}
                  </div>
                </div>
              </ItemContent>
            </Item>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardScreen;
