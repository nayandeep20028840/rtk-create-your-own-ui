import {
    RtkAudioVisualizer,
    RtkAvatar,
    RtkNameTag,
    RtkParticipantTile,
    RtkSimpleGrid,
    provideRtkDesignSystem,
} from '@cloudflare/realtimekit-react-ui';
import { useRealtimeKitMeeting, useRealtimeKitSelector } from '@cloudflare/realtimekit-react';
import clsx from 'clsx';
import { useEffect } from 'react';
import Draggable from 'react-draggable';

export function FaceTimeGrid() {
    const { meeting } = useRealtimeKitMeeting();
    const participants = useRealtimeKitSelector((m) => m.participants.active);

    return (
        <div className="relative flex place-items-center justify-center flex-1 overflow-hidden">
            {participants.size === 0 && (
                <p className="text-2xl text-white">People haven't joined yet.</p>
            )}
            {participants.size === 1 && (
                <RtkParticipantTile
                    participant={participants.toArray()[0]}
                    meeting={meeting}
                    className="w-full h-full"
                />
            )}
            {participants.size > 1 && (
                <RtkSimpleGrid
                    participants={participants.toArray()}
                    meeting={meeting}
                    gap={8}
                />
            )}
        </div>
    );
}

export function FaceTimePip() {
    const { meeting } = useRealtimeKitMeeting();

    return (
        <Draggable bounds="parent">
            <RtkParticipantTile
                participant={meeting.self}
                meeting={meeting}
                key={meeting.self.id}
                className="z-10 absolute bottom-4 right-4 sm:bottom-4 shadow-black shadow-2xl aspect-square w-52 h-auto cursor-move duration-0"
            >
                <RtkAvatar participant={meeting.self} size="md" />
                <RtkNameTag participant={meeting.self} size="md">
                    <RtkAudioVisualizer
                        participant={meeting.self}
                        size="md"
                        slot="start"
                    />
                </RtkNameTag>
            </RtkParticipantTile>
        </Draggable>
    );
}

export default function Facetime() {
    const { meeting } = useRealtimeKitMeeting();

    const roomJoined = useRealtimeKitSelector((m) => m.self.roomJoined);

    useEffect(() => {
        provideRtkDesignSystem(document.body, {
            colors: {
                'video-bg': '#333333',
            },
        });
    }, []);

    if (!roomJoined) {
        return (
            <div className="bg-black text-white w-full h-full flex place-items-center justify-center">
                <p className="text-2xl">You are not in the meeting.</p>
            </div>
        );
    }

    return (
        <>
            <FaceTimeGrid />
            <FaceTimePip />
        </>
    );
}
