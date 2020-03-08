import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

import SaveIcon from '@material-ui/icons/Save';

import { EditorContainer } from './Editor.styles';

const App = () => {
  const [mdFile, setMdFile] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    // we create an abort controller to cleanup the fetch in the case the component is unmounted and the fetch has not finished
    const source = axios.CancelToken.source();

    const fetchMdFile = async () => {
      try {
        // we do not need to put the entire rest api url, just the endpoint, because in te pacakge.json we have added the proxy key with the url to the rest api
        const res = await axios.get(
          '/categories/cardiology/zAMkcZdM9xrSCeoIpTpU',
          {
            cancelToken: source.token,
          }
        );

        setMdFile(res.data);
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
    <EditorContainer>
      <Grid container className="content">
        <Grid item xs={12} sm={6}>
          <TextField required label="Category" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label="Pathology" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <h2>Definition</h2>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={20}
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value={text}
            onChange={onChange}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={handleSubmitText}
            style={{ marginBottom: 10 }}
          >
            Save
          </Button>
          <ReactMarkdown
            source={text}
            escapeHtml={false}
            className="content"
          />
        </Grid>
        <Grid item xs={12}>
          <h2>Epidemiology</h2>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={20}
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value={text}
            onChange={onChange}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={handleSubmitText}
            style={{ marginBottom: 10 }}
          >
            Save
          </Button>
          <ReactMarkdown
            source={text}
            escapeHtml={false}
            className="content"
          />
        </Grid>
        <Grid item xs={12}>
          <h2>Pathophysiology</h2>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={20}
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value={text}
            onChange={onChange}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={handleSubmitText}
            style={{ marginBottom: 10 }}
          >
            Save
          </Button>
          <ReactMarkdown
            source={text}
            escapeHtml={false}
            className="content"
          />
        </Grid>
        <Grid item xs={12}>
          <h2>Aetiology</h2>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={20}
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value={text}
            onChange={onChange}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={handleSubmitText}
            style={{ marginBottom: 10 }}
          >
            Save
          </Button>
          <ReactMarkdown
            source={text}
            escapeHtml={false}
            className="content"
          />
        </Grid>
        <Grid item xs={12}>
          <h2>Diagnosis</h2>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={20}
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value={text}
            onChange={onChange}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={handleSubmitText}
            style={{ marginBottom: 10 }}
          >
            Save
          </Button>
          <ReactMarkdown
            source={text}
            escapeHtml={false}
            className="content"
          />
        </Grid>
        <Grid item xs={12}>
          <h2>Treatment</h2>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={20}
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value={text}
            onChange={onChange}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={handleSubmitText}
            style={{ marginBottom: 10 }}
          >
            Save
          </Button>
          <ReactMarkdown
            source={text}
            escapeHtml={false}
            className="content"
          />
        </Grid>
      </Grid>

      {mdFile !== null && (
        <Container className="content">
          <h1>{mdFile.pathology.pathology}</h1>
          <h2>Definition</h2>
          <ReactMarkdown
            source={mdFile.pathology.definition}
            escapeHtml={false}
          />
          <h2>Epidemiology</h2>
          <ReactMarkdown
            source={mdFile.pathology.epidemiology}
            escapeHtml={false}
          />
          <h2>Pathophysiology</h2>
          <ReactMarkdown
            source={mdFile.pathology.pathophysiology}
            escapeHtml={false}
          />
          <h2>Aetiology</h2>
          <ReactMarkdown
            source={mdFile.pathology.aetiology}
            escapeHtml={false}
          />
          <h2>Diagnosis</h2>
          <ReactMarkdown
            source={mdFile.pathology.diagnosis}
            escapeHtml={false}
          />
          <h2>Treatment</h2>
          <ReactMarkdown
            source={mdFile.pathology.treatment}
            escapeHtml={false}
          />
        </Container>
      )}
    </EditorContainer>
  );
};

export default App;
