import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

import SaveIcon from '@material-ui/icons/Save';
import DownloadIcon from '@material-ui/icons/CloudDownload';

import { EditorContainer } from './Editor.styles';

const App = () => {
  const [mdFile, setMdFile] = useState(null);
  const [state, setState] = useState({
    category: '',
    pathology: '',
    definition: '',
    epidemiology: '',
    pathophysiology: '',
    aetiology: '',
    diagnosis: '',
    treatment: '',
  });

  const {
    category,
    pathology,
    definition,
    epidemiology,
    pathophysiology,
    aetiology,
    diagnosis,
    treatment,
  } = state;

  //   useEffect(() => {
  //     // we create an abort controller to cleanup the fetch in the case the component is unmounted and the fetch has not finished
  //     const source = axios.CancelToken.source();

  //     const fetchMdFile = async () => {
  //       try {
  //         // we do not need to put the entire rest api url, just the endpoint, because in te pacakge.json we have added the proxy key with the url to the rest api
  //         const res = await axios.get('/categories/cardiology/aneurysm', {
  //           cancelToken: source.token,
  //         });

  //         setMdFile(res.data.pathologyData);
  //       } catch (error) {
  //         if (axios.isCancel(error)) {
  //           console.log('Api cancelled');
  //         } else {
  //           console.log(error.message);
  //         }
  //       }
  //     };

  //     fetchMdFile();
  //     // cleanup function to cancel the api request
  //     return () => {
  //       source.cancel();
  //     };
  //   }, []);

  const onChange = event => {
    let { value } = event.target;
    const { name } = event.target;
    if (name === 'category' || name === 'pathology') value = value.toLowerCase();
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmitText = useCallback(
    async (section, data) => {
      await axios.post(`/categories/${category}/${pathology}/${section}`, {
        data,
      });
    },
    [category, pathology]
  );

  const handleDownloadPathology = useCallback(async () => {
    const res =
      !!category && !!pathology && (await axios.get(`/categories/${category}/${pathology}`));
    if (res) {
      const { pathologyData } = res.data;
      setMdFile(pathologyData);
      setState(prevState => ({
        ...prevState,
        definition: pathologyData.definition ? pathologyData.definition : '',
        epidemiology: pathologyData.epidemiology ? pathologyData.epidemiology : '',
        pathophysiology: pathologyData.pathophysiology ? pathologyData.pathophysiology : '',
        aetiology: pathologyData.aetiology ? pathologyData.aetiology : '',
        diagnosis: pathologyData.diagnosis ? pathologyData.diagnosis : '',
        treatment: pathologyData.treatment ? pathologyData.treatment : '',
      }));
    }
  }, [category, pathology]);

  return (
    <EditorContainer>
      <Grid container className="content">
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Category"
            variant="outlined"
            name="category"
            value={category}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Pathology"
            variant="outlined"
            name="pathology"
            value={pathology}
            onChange={onChange}
          />
        </Grid>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadPathology}
          style={{ marginTop: 20 }}
        >
          Download pathology
        </Button>

        <Grid item xs={12}>
          <h2>Definition</h2>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={20}
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value={definition}
            name="definition"
            onChange={onChange}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={() => handleSubmitText('definition', definition)}
            style={{ marginBottom: 10 }}
          >
            Save
          </Button>
          <ReactMarkdown source={definition} escapeHtml={false} className="content" />
        </Grid>
        <Grid item xs={12}>
          <h2>Epidemiology</h2>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={20}
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value={epidemiology}
            name="epidemiology"
            onChange={onChange}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={() => handleSubmitText('epidemiology', epidemiology)}
            style={{ marginBottom: 10 }}
          >
            Save
          </Button>
          <ReactMarkdown source={epidemiology} escapeHtml={false} className="content" />
        </Grid>
        <Grid item xs={12}>
          <h2>Pathophysiology</h2>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={20}
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value={pathophysiology}
            name="pathophysiology"
            onChange={onChange}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={() => handleSubmitText('pathophysiology', pathophysiology)}
            style={{ marginBottom: 10 }}
          >
            Save
          </Button>
          <ReactMarkdown source={pathophysiology} escapeHtml={false} className="content" />
        </Grid>
        <Grid item xs={12}>
          <h2>Aetiology</h2>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={20}
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value={aetiology}
            name="aetiology"
            onChange={onChange}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={() => handleSubmitText('aetiology', aetiology)}
            style={{ marginBottom: 10 }}
          >
            Save
          </Button>
          <ReactMarkdown source={aetiology} escapeHtml={false} className="content" />
        </Grid>
        <Grid item xs={12}>
          <h2>Diagnosis</h2>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={20}
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value={diagnosis}
            name="diagnosis"
            onChange={onChange}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={() => handleSubmitText('diagnosis', diagnosis)}
            style={{ marginBottom: 10 }}
          >
            Save
          </Button>
          <ReactMarkdown source={diagnosis} escapeHtml={false} className="content" />
        </Grid>
        <Grid item xs={12}>
          <h2>Treatment</h2>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={20}
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value={treatment}
            name="treatment"
            onChange={onChange}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={() => handleSubmitText('treatment', treatment)}
            style={{ marginBottom: 10 }}
          >
            Save
          </Button>
          <ReactMarkdown source={treatment} escapeHtml={false} className="content" />
        </Grid>
      </Grid>
      {mdFile && (
        <Container className="content">
          <h1>{mdFile.pathology}</h1>
          <h2>Definition</h2>
          <ReactMarkdown source={mdFile.definition} escapeHtml={false} />
          <h2>Epidemiology</h2>
          <ReactMarkdown source={mdFile.epidemiology} escapeHtml={false} />
          <h2>Pathophysiology</h2>
          <ReactMarkdown source={mdFile.pathophysiology} escapeHtml={false} />
          <h2>Aetiology</h2>
          <ReactMarkdown source={mdFile.aetiology} escapeHtml={false} />
          <h2>Diagnosis</h2>
          <ReactMarkdown source={mdFile.diagnosis} escapeHtml={false} />
          <h2>Treatment</h2>
          <ReactMarkdown source={mdFile.treatment} escapeHtml={false} />
        </Container>
      )}
    </EditorContainer>
  );
};

export default App;
