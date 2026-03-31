import {
    RtkStage,
    RtkGrid,
    RtkNotifications,
    RtkParticipantsAudio,
} from '@cloudflare/realtimekit-react-ui';
import MeetingHeader from './meeting-header';
import MeetingControlBar from './meeting-control-bar';
import MeetingSideBar from './meeting-sidebar';
import Facetime, { FaceTimeGrid, FaceTimePip } from './facetime';

function InMeetingPreBuilt() {
    return (
        <div className="flex flex-col w-full h-full">
            <header>
                <MeetingHeader />
            </header>
            <main className="flex w-full flex-1">
                <RtkStage className="flex w-full flex-1 p-2">
                    <RtkGrid />
                    <RtkNotifications />
                    <MeetingSideBar />
                </RtkStage>
                <RtkParticipantsAudio />
            </main>
            <footer className="flex w-full overflow-visible">
                <MeetingControlBar />
            </footer>
        </div>
    );
}

function InMeetingWithFaceTime() {
    return (
        <div className="flex flex-col w-full h-full">
            <header>
                <MeetingHeader />
            </header>
            <main className="flex w-full flex-1">
                <RtkStage className="flex w-full flex-1 p-2">
                    <FaceTimeGrid />
                    <RtkNotifications />
                    <MeetingSideBar />
                    <FaceTimePip />
                </RtkStage>
                <RtkParticipantsAudio />
            </main>
            <footer className="flex w-full overflow-visible">
                <MeetingControlBar />
            </footer>
        </div>
    );
}

function InMeeting() {
    return <InMeetingWithFaceTime />;
}

export default InMeeting;
