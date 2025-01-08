'use client';

import React, { useState } from 'react';

import { ChatMistralAI } from '@langchain/mistralai';
import { HumanMessage } from '@langchain/core/messages';
import { PromptTemplate } from '@langchain/core/prompts';

import Sidebar from '../../components/sidebar';
import RewrittenOutput from '../../components/outputText';

const PostGenerator = () => {
  const [apiKey, setApiKey] = useState('');
  const [topic, setTopic] = useState('');
  const [error, setError] = useState('');
  const [rewrittenText, setRewrittenText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    // Validation

    if (!topic || topic.length > 200) {
      setError('Text must be between 1 and 200 characters.');
      return;
    }
    setError('');
    console.log('API Key:', apiKey);
    console.log('Text:', topic);
    let key = '';
    setIsLoading(true);
    if (!apiKey) {
      key = 'YDwBGqM1dP4HsQBBFRK7YAiOrvjcE2sd';
    } else {
      key = apiKey;
    }
    const model = new ChatMistralAI({
      apiKey: key,
      model: 'mistral-large-latest',
      temperature: 0,
    });

    const template = `As experienced startup and venture capital writer, 
    generate a 400-word blog post about {topic}
    
    Your response should be in this format:
    First, print the blog post.
    Then, sum the total number of words on it and print the result like this: This post has X words`;
    const prompt = new PromptTemplate({
      template,
      inputVariables: ['topic'],
    });

    const draft = await prompt.format({ topic });
    const response = await model.invoke([new HumanMessage(draft)]);
    console.log('🚀 ~ handleRewrite ~ response:', response);

    setRewrittenText(response.content.toString());
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start w-full mx-auto p-6 ml-52">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Generator</h1>
        <p className="text-gray-600 mb-6">
          Generate posts with different tones and styles using Mistral AI.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-2 text-red-600 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}

        {/* API Key Input */}
        <div className="w-1/2 mb-6">
          <label htmlFor="apiKey" className="block text-gray-700 font-medium mb-2">
            Enter Your Mistral API Key to use your own account (Optional)
          </label>
          <input
            type="password"
            id="apiKey"
            aria-label="API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key..."
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          />
        </div>

        {/* Text Input */}
        <div className="w-1/2 mb-6">
          <label htmlFor="textInput" className="block text-gray-700 font-medium mb-2">
            Enter the subject on which you want to write the post (up to 200 characters)
          </label>
          <textarea
            id="textInput"
            aria-label="Text Input"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Your subject..."
            className="w-full p-3 border border-gray-300 rounded-md text-black"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 disabled:bg-gray-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          {isLoading ? 'Generating...' : 'Generate Post'}
        </button>
        <div className="w-3/4 mb-6">
          <RewrittenOutput
            rewrittenText={rewrittenText}
            label={`Your post text for: ${topic}`}
          />
        </div>
      </div>
    </main>
  );
};

export default PostGenerator;
