"use client";

import { useEffect, useRef } from "react";

export default function ElevenAgent() {
  // Make the ref match the div type
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.createElement("elevenlabs-convai");

    // Sets attribute for div element to agent-id: "agent_8201k82qngrne47spe10wqfk748c"
    el.setAttribute("agent-id", "agent_8201k82qngrne47spe10wqfk748c");

    const handleEvent = (e: Event) => {
      console.log("Widget event:", e);
    };

    el.addEventListener("convai-ready", handleEvent); // Replace with actual event name

    // Append to container
    widgetRef.current?.appendChild(el);

    // Inject script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      el.removeEventListener("convai-ready", handleEvent);
      el.remove();
      script.remove();
    };
  }, []);

  return <div ref={widgetRef}></div>;
}