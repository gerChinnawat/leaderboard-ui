'use client';

import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { racers } from '../data/racers';
import { IRacer } from '../interfaces/racer.interface';
import { toMillisecond } from '../utils/toMillisecond';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item";
import AddRacerFrom from '../components/add-racer-form';
import { toTimeStampForm } from '../utils/toTimeStampForm';

const LeaderboardScreen = () => {
    const [boardleader, setboardleader] = useState<IRacer[]>(racers);
    const [parent] = useAutoAnimate();

    const onAddRacer = (racer: IRacer) => {
        const newRacer: IRacer = {
            id: boardleader.length + 1,
            name: racer.name,
            colorTag: racer.colorTag,
            timeStamp: toTimeStampForm(racer.timeStamp),
        };
        setboardleader((prev) => {
            const newRacers = [...prev, newRacer];
            const sortedRacers = newRacers.sort((a, b) =>  toMillisecond(a.timeStamp) - toMillisecond(b.timeStamp));
            console.log(sortedRacers);
            return sortedRacers;
        });
    }

    return (
        <div className="flex gap-5">
            <AddRacerFrom
                onAddRacer={onAddRacer}
                disable={boardleader.length >= 20}
            />
            <div
                ref={parent}
                className="grid grid-flow-col grid-rows-10 gap-1"
            >
                {boardleader.map((racer: IRacer, index) => (
                    <div key={racer.id} className={"flex w-full max-w-md flex-col gap-4 min-w-60"}>
                        <Item variant="outline">
                            <ItemContent>
                                <ItemTitle><div style={{ backgroundColor: racer.colorTag }} className='w-4 h-4'></div>{index + 1}. {racer.name}</ItemTitle>
                                <ItemDescription>{racer.timeStamp}</ItemDescription>
                            </ItemContent>
                        </Item>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeaderboardScreen;