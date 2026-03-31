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


function InMeetingWithFaceTime() {
    return (
        <div className="flex flex-col w-full h-full">
            <header>
                <MeetingHeader />
            </header>
            <main className="flex w-full flex-1 relative">
                {/* This will shrink when sidebar opens */}
                <div className="flex flex-1 relative">
                    <RtkStage className="flex w-full flex-1 p-2">
                        <FaceTimeGrid />
                        <RtkNotifications />
                    </RtkStage>
                    <RtkParticipantsAudio />
                    {/* PiP stays scoped inside the stage area */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                        <FaceTimePip />
                    </div>
                </div>

                {/* Sidebar is now IN the flow — it pushes the stage */}
                <MeetingSideBar />
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
