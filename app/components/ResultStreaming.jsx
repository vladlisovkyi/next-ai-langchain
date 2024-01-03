import React from "react";

const ResultStreaming = ({ data }) => {
  return (
    <div className="bg-gray-100 p-6 rounded shadow mb-4">
      {typeof data === "string" && (
        <pre className="text-black-500 mb-4">{data}</pre>
      )}
      {data && <p className="text-black-500 mb-4">{data?.output}</p>}

      {data &&
        data.sourceDocuments &&
        data.sourceDocuments.map((doc, index) => (
          <div key={index} className="bg-grey-100 p-1 rounded shadow mb-2">
            <p>
              Source {index}: {doc.pageContent}
            </p>
            <p className="text-gray-700">From: {doc.metadata.source}</p>
          </div>
        ))}
    </div>
  );
};

export default ResultStreaming;
