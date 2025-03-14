import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const FormattedBackendCode = ({ etape, contenu, code }) => {
  return (
    <div className="formatted-backend-code">
      <h1>{etape}</h1>
      <p>{contenu}</p>
      <SyntaxHighlighter language="javascript" style={docco}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default FormattedBackendCode;
