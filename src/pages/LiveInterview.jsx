import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Square,
  SkipForward,
  PhoneOff,
  Circle,
} from "lucide-react";
import AIAvatar from "../components/AIAvatar";
import AudioWaveform from "../components/AudioWaveform";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { interviewQuestions } from "../data/mockData";
import { useToast } from "../context/ToastContext";

const TOTAL_QUESTIONS = 10;

export default function LiveInterview() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [endOpen, setEndOpen] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [recording]);

  useEffect(() => {
    setSeconds(0);
    setRecording(false);
  }, [questionIndex]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  function nextQuestion() {
    if (questionIndex + 1 >= TOTAL_QUESTIONS) {
      navigate("/dashboard/results");
      return;
    }
    setQuestionIndex((i) => i + 1);
  }

  function confirmEnd() {
    setEndOpen(false);
    showToast("Interview ended early — generating feedback on what you completed.", "info");
    navigate("/dashboard/results");
  }

  const progressPct = ((questionIndex + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="font-medium text-ink-700 dark:text-ink-300">Question {questionIndex + 1} of {TOTAL_QUESTIONS}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
          <div className="h-full rounded-full bg-brand-500 transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Camera */}
        <div className="lg:col-span-2">
          <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[4/5] rounded-2xl bg-ink-900 overflow-hidden flex items-center justify-center">
            {cameraOn ? (
              <div className="flex flex-col items-center text-ink-400">
                <div className="h-24 w-24 rounded-full bg-ink-700 flex items-center justify-center text-3xl font-semibold text-ink-300">AS</div>
                <p className="mt-3 text-sm">Camera preview</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-ink-500">
                <VideoOff size={28} />
                <p className="mt-2 text-sm">Camera is off</p>
              </div>
            )}

            {recording && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-red-600/90 px-2.5 py-1 text-xs font-medium text-white">
                <Circle size={8} fill="white" className="animate-pulse" /> Recording
              </div>
            )}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className={`rounded-full p-1.5 ${muted ? "bg-red-500/90" : "bg-black/40"} text-white`}>
                {muted ? <MicOff size={14} /> : <Mic size={14} />}
              </span>
              <span className={`rounded-full p-1.5 ${!cameraOn ? "bg-red-500/90" : "bg-black/40"} text-white`}>
                {cameraOn ? <Video size={14} /> : <VideoOff size={14} />}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-center flex-wrap gap-2">
            <Button variant="secondary" size="sm" icon={muted ? MicOff : Mic} onClick={() => setMuted((m) => !m)}>
              {muted ? "Unmute" : "Mute"}
            </Button>
            <Button variant="secondary" size="sm" icon={cameraOn ? Video : VideoOff} onClick={() => setCameraOn((c) => !c)}>
              {cameraOn ? "Camera" : "Camera off"}
            </Button>
            <Button variant="danger" size="sm" icon={PhoneOff} onClick={() => setEndOpen(true)}>
              End Interview
            </Button>
          </div>
        </div>

        {/* AI Interviewer */}
        <div className="lg:col-span-3 rounded-2xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 p-6 sm:p-8 flex flex-col">
          <div className="flex items-center gap-4">
            <AIAvatar speaking={recording} />
            <div>
              <p className="text-sm font-medium text-ink-500 dark:text-ink-400">AI Coach Interviewer</p>
              <p className="text-xs text-ink-400">Question {questionIndex + 1} of {TOTAL_QUESTIONS}</p>
            </div>
          </div>

          <div className="mt-6 flex-1">
            <p className="font-display text-xl sm:text-2xl font-semibold text-ink-900 dark:text-white leading-snug">
              {interviewQuestions[questionIndex % interviewQuestions.length]}
            </p>
            <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">
              Take your time. When you're ready, start answering.
            </p>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-center">
              <AudioWaveform active={recording} />
            </div>
            <div className="mt-4 flex items-center justify-center gap-4">
              <span className="font-mono text-sm text-ink-500 dark:text-ink-400 w-12 text-right">{mm}:{ss}</span>
              <button
                onClick={() => setRecording((r) => !r)}
                className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors focus-ring ${
                  recording ? "bg-red-600 hover:bg-red-700" : "bg-brand-600 hover:bg-brand-700"
                } text-white shadow-md`}
                aria-label={recording ? "Stop recording" : "Start recording"}
              >
                {recording ? <Square size={20} fill="white" /> : <Mic size={22} />}
              </button>
              <span className="w-12" />
            </div>

            <div className="mt-6 flex justify-center">
              <Button variant="outlineBrand" iconRight={SkipForward} onClick={nextQuestion}>
                {questionIndex + 1 >= TOTAL_QUESTIONS ? "Finish Interview" : "Next Question"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={endOpen}
        onClose={() => setEndOpen(false)}
        title="End this interview?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEndOpen(false)}>Keep going</Button>
            <Button variant="danger" onClick={confirmEnd}>End interview</Button>
          </>
        }
      >
        You've answered {questionIndex} of {TOTAL_QUESTIONS} questions. You'll still get feedback based on what you've completed so far.
      </Modal>
    </div>
  );
}
