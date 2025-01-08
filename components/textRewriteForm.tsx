'use client';

import React, { useState } from 'react';
import SelectField from './selectField';
import RewrittenOutput from './outputText';
import { ChatMistralAI } from '@langchain/mistralai';
import { HumanMessage } from '@langchain/core/messages';
import { PromptTemplate } from '@langchain/core/prompts';

const TextRewriteForm: React.FC = () => {
  const [apiKey, setApiKey] = useState('YDwBGqM1dP4HsQBBFRK7YAiOrvjcE2sd');
  const [text, setText] = useState('');
  const [tone, setTone] = useState('Formal');
  const [dialect, setDialect] = useState('American');
  const [rewrittenText, setRewrittenText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRewrite = async () => {
    if (!text) {
      setError('Text is required.');
      return;
    }

    if (text.length > 200) {
      setError('Maximum 200 characters are allowed!');
      return;
    }
    let key = '';
    if (!apiKey) {
      key = 'YDwBGqM1dP4HsQBBFRK7YAiOrvjcE2sd';
    } else {
      key = apiKey;
    }

    setError(null); // Clear previous errors
    setIsLoading(true); // Set loading state

    try {
      // Initialize the Mistral model
      const model = new ChatMistralAI({
        apiKey: key,
        model: 'mistral-large-latest',
        temperature: 0,
      });

      const template = `
      Below is a draft text that may be poorly worded.
      Your goal is to:
      - Properly redact the draft text
      - Convert the draft text to a specified tone
      - Convert the draft text to a specified dialect

      Below is the draft text, tone, and dialect:
      DRAFT: {draft}
      TONE: {tone}
      DIALECT: {dialect}

      YOUR {dialect} RESPONSE:
      `;

      const prompt = new PromptTemplate({
        template,
        inputVariables: ['tone', 'dialect', 'draft'],
      });

      const draft = await prompt.format({ tone, dialect, draft: text });
      const response = await model.invoke([new HumanMessage(draft)]);
      console.log('🚀 ~ handleRewrite ~ response:', response);

      setRewrittenText(response.content.toString());
    } catch (err: unknown) {
      console.error('Error rewriting text:', err);
      setError('An error occurred while rewriting the text. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Re-write your text</h1>
      <p className="text-gray-600 mb-6">
        Re-write your text in different styles. Contact{' '}
        <a href="#" className="text-blue-500 underline">
          AI Accelera
        </a>{' '}
        to build your AI Projects.
      </p>

      {/* API Key Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Enter Your Mistral API Key to use your own account
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key..."
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        />
      </div>

      {/* Text Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Enter the text you want to re-write (upto 200 characters)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your text..."
          className="w-full p-2 border border-gray-300 rounded-md text-black"
          rows={4}
        />
      </div>

      {/* Tone and Dialect Selection */}
      <div className="flex flex-wrap gap-4 mt-4">
        <SelectField
          label="Which tone would you like your redaction to have?"
          options={['Formal', 'Casual', 'Professional']}
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        />

        <SelectField
          label="Which English Dialect would you like?"
          options={['American', 'British']}
          value={dialect}
          onChange={(e) => setDialect(e.target.value)}
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Rewrite Button */}
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        onClick={handleRewrite}
        disabled={isLoading}
      >
        {isLoading ? 'Rewriting...' : 'Rewrite Text'}
      </button>

      {/* Output */}
      <RewrittenOutput rewrittenText={rewrittenText} label={"Your re-written text:"} />
    </div>
  );
};

export default TextRewriteForm;
