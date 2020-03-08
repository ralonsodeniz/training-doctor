import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import unified from 'unified';
import markdown from 'remark-parse';
import slug from 'remark-slug';
import toc from 'remark-toc';
import github from 'remark-github';
import remark2rehype from 'remark-rehype';
import highlight from 'rehype-highlight';
import rehype2react from 'rehype-react';

import styles from './App.css';

const Others = () => {
  const [mdFile, setMdFile] = useState(null);
  const [text, setText] = useState('');
  const [rehypeText, setRehypeText] = useState(
    '# Hello\n\n## Table of Contents\n\n## @rhysd'
  );

  useEffect(() => {
    // we create an abort controller to cleanup the fetch in the case the component is unmounted and the fetch has not finished
    const source = axios.CancelToken.source();

    const fetchMdFile = async () => {
      try {
        // we do not need to put the entire rest api url, just the endpoint, because in te pacakge.json we have added the proxy key with the url to the rest api
        const res = await axios.get(
          // 'https://firebasestorage.googleapis.com/v0/b/training-doctor.appspot.com/o/cardiologia%2Ftest.md?alt=media&token=386b178f-561a-4d73-8c31-d013edbaedbe',
          'http://localhost:5001/training-doctor/europe-west1/api/categories/cardiology/zAMkcZdM9xrSCeoIpTpU',
          {
            cancelToken: source.token,
          }
        );

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

  const onSuccess = googleUser => {
    console.log(
      `Logged in as: ${googleUser.getBasicProfile().getName()}`
    );
    const idToken = googleUser.getAuthResponse().id_token;
    console.log(idToken);
  };

  const onFailure = error => {
    console.log(error);
  };

  const onChange = event => {
    setText(event.target.value);
  };

  const onChangeRehype = event => {
    setRehypeText(event.target.value);
  };

  const handleSubmitText = async () => {
    await axios.post(
      'http://localhost:5001/training-doctor/europe-west1/api/categories/cardiology/zAMkcZdM9xrSCeoIpTpU',
      { text }
    );
  };

  const processor = unified()
    .use(markdown)
    .use(slug)
    .use(toc)
    .use(github, { repository: 'rehypejs/rehype-react' })
    .use(remark2rehype)
    .use(highlight)
    .use(rehype2react, { createElement: React.createElement });

  return (
    <>
      <GoogleLogin
        clientId="848269204736-fh2fec8akmkb3d11vmdna2uiti6lp11j.apps.googleusercontent.com"
        buttonText="Google Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        scope="profile email"
      />
      <GoogleLogout
        clientId="848269204736-fh2fec8akmkb3d11vmdna2uiti6lp11j.apps.googleusercontent.com"
        buttonText="Google Logout"
        onLogoutSuccess={() => console.log('GTFO')}
      />
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
      <div>
        <textarea value={rehypeText} onChange={onChangeRehype} />
        <div id="preview">
          {processor.processSync(rehypeText).contents}
        </div>
      </div>
    </>
  );
};

export default Others;
