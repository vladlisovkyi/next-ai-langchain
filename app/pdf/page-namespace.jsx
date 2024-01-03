"use client";

import React, { useState } from "react";
import ResultWithSources from "../components/ResultWithSources";
import PromptBox from "../components/PromptBox";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import Title from "../components/Title";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ButtonContainer from "../components/ButtonContainer";
import "../globals.css";

const PDFLoader = () => {
  const [prompt, setPrompt] = useState("How to get rich?");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I'm a Naval AI. What would you like to know?",
      type: "bot",
    },
  ]);
  const [error, setError] = useState("");
  const [bookId, setBookId] = useState("101");

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleBookIdChange = (e) => {
    setBookId(e.target.value);
  };

  const handleSubmit = async (endpoint) => {
    try {
      console.log(`sending ${prompt}`);
      console.log(`using ${endpoint}`);

      const response = await fetch(`/api/${endpoint}?bookId=${bookId}`, {
        method: "GET",
      });

      const searchRes = await response.json();
      console.log(searchRes);
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleSubmitPrompt = async (endpoint) => {
    try {
      setPrompt("");

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: "user", sourceDocuments: null },
      ]);

      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: prompt, bookId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const searchRes = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: searchRes.result.text,
          type: "bot",
          sourceDocuments: searchRes.result.sourceDocuments,
        },
      ]);

      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <>
      <Title emoji="💬" headingText="PDF-GPT" />
      <TwoColumnLayout
        leftChildren={
          <>
            <PageHeader
              heading="Ask Naval Anything"
              boldText="How to get rich? How to be happy?"
              description="This tool will
            let you ask anything contained in a PDF document. This tool uses
            Embeddings, Pinecone, VectorDBQAChain, and VectorStoreAgents. Head over to Module 1 to
            get started!"
            />
            <ButtonContainer>
              <Button
                handleSubmit={handleSubmit}
                endpoint="pdf-upload"
                buttonText="Upload Book 📚"
                className="Button"
              />
            </ButtonContainer>
            <select value={bookId} onChange={handleBookIdChange}>
              <option value={101}>Bitcoin</option>
              <option value={102}>Naval</option>
            </select>
          </>
        }
        rightChildren={
          <>
            <ResultWithSources messages={messages} pngFile="pdf" />
            <PromptBox
              prompt={prompt}
              handlePromptChange={handlePromptChange}
              handleSubmit={() => handleSubmitPrompt("/pdf-query")}
              placeHolderText={"How to get rich?"}
              error={error}
            />
          </>
        }
      />
    </>
  );
};

export default PDFLoader;
