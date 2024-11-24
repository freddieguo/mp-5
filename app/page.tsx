"use client";

import { useState, FormEvent } from "react";
import styled from "styled-components";
import { GlobalStyle } from "./global-styles";

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const Message = styled.p<{ error?: boolean }>`
  color: ${(props) => (props.error ? "red" : "green")};
  font-weight: bold;
`;

const ShortenedLink = styled.a`
  color: #4caf50;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function AliasPage() {
  const [alias, setAlias] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [shortenedURL, setShortenedURL] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    const response = await fetch("/api/alias/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alias, url }),
    });

    const data = await response.json();
    if (response.ok) {
      setShortenedURL(`${window.location.origin}/alias/${alias}`);
      setMessage("Alias created successfully!");
    } else {
      setMessage(data.message || "Error creating alias");
    }
  };

  return (
      <>
        <GlobalStyle />
        <Container>
          <Title>URL Shortener</Title>
          <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                required
            />
            <Input
                type="url"
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            <button type="submit">Submit</button>
          </Form>
          {message && <Message error={!shortenedURL}>{message}</Message>}
          {shortenedURL && (
              <div>
                <p>Shortened URL:</p>
                <ShortenedLink
                    href={shortenedURL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  {shortenedURL}
                </ShortenedLink>
              </div>
          )}
        </Container>
      </>
  );
}
