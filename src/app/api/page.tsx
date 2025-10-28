"use client";

import React, { useState } from "react";

export default function Page() {
  const [response, setResponse] = useState<string>("");

  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utter);
    }
  };

  const handleCommand = async (command: string) => {
    try {
      const apiRes = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: command,
          max_tokens: 150
        })
      });

      const data = await apiRes.json();
      const responseText = data.choices?.[0]?.text?.trim() ?? "";
      setResponse(responseText);
      speak(responseText);
    } catch (error) {
      console.error("Error fetching data from OpenAI:", error);
      setResponse("I encountered an error. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={() => handleCommand("Hello from client")}>Run</button>
      <p>{response}</p>
    </div>
  );
}