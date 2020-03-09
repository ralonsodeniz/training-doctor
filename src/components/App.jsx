import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

import styles from './App.css';

const App = () => {
  const [mdFile, setMdFile] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    // we create an abort controller to cleanup the fetch in the case the component is unmounted and the fetch has not finished
    const source = axios.CancelToken.source();

    const fetchMdFile = async () => {
      try {
        // we do not need to put the entire rest api url, just the endpoint, because in te pacakge.json we have added the proxy key with the url to the rest api
        const res = await axios.get('/categories/cardiology/zAMkcZdM9xrSCeoIpTpU', {
          cancelToken: source.token,
        });

        setMdFile(res.data);
        setText(res.data.pathology.test);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Api cancelled');
        } else {
          console.log(error.message);
        }
      }
    };

    fetchMdFile();
    // cleanup function to cancel the api request
    return () => {
      source.cancel();
    };
  }, []);

  const onChange = event => {
    setText(event.target.value);
  };

  const handleSubmitText = async () => {
    await axios.post('/categories/cardiology/zAMkcZdM9xrSCeoIpTpU', {
      text,
    });
  };

  return (
    <>
      {mdFile !== null && (
        <div className={styles.content}>
          <h1>{mdFile.pathology.pathology}</h1>
          <h2>Definition</h2>
          <ReactMarkdown
            source={mdFile.pathology.definition}
            escapeHtml={false}
            // plugins={[slug]}
          />
          <h2>Epidemiology</h2>
          <ReactMarkdown
            source={mdFile.pathology.epidemiology}
            escapeHtml={false}
            // plugins={[slug]}
          />
          <h2>Pathophysiology</h2>
          <ReactMarkdown
            source={mdFile.pathology.pathophysiology}
            escapeHtml={false}
            // plugins={[slug]}
          />
          <h2>Aetiology</h2>
          <ReactMarkdown
            source={mdFile.pathology.aetiology}
            escapeHtml={false}
            // plugins={[slug]}
          />
          <h2>Diagnosis</h2>
          <ReactMarkdown
            source={mdFile.pathology.diagnosis}
            escapeHtml={false}
            // plugins={[slug]}
          />
          <h2>Treatment</h2>
          <ReactMarkdown
            source={mdFile.pathology.treatment}
            escapeHtml={false}
            // plugins={[slug]}
          />
        </div>
      )}
      <br />
      <textarea value={text} onChange={onChange} />
      <button type="button" onClick={handleSubmitText}>
        send text
      </button>
      <ReactMarkdown
        source={text}
        className={styles.content}
        escapeHtml={false}
        // plugins={[highlight]}
      />
    </>
  );
};

export default App;
