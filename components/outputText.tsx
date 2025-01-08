import React from 'react';

interface RewrittenOutputProps {
  rewrittenText: string;
  label: string;
}

const RewrittenOutput: React.FC<RewrittenOutputProps> = ({ rewrittenText, label }) => (
  <div className="mt-6">
    <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
    <p className="mt-2 p-4 bg-gray-100 text-black border border-gray-300 rounded-md">
      {rewrittenText || 'No text rewritten yet.'}
    </p>
  </div>
);

export default RewrittenOutput;
