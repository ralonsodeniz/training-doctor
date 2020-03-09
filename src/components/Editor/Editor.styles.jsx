import styledComponents from 'styled-components';
import styled from '@material-ui/core/styles/styled';

import Container from '@material-ui/core/Container';

export const EditorContainer = styled(Container)({
  font: "400 16px/1.5 'Helvetica Neue', Helvetica, Arial, sans-serif",
  color: '#111',
  backgroundColor: '#fdfdfd',
  fontFeatureSettings: "'kern' 1",
  fontKerning: 'normal',
  padding: 30,
  textAlign: 'justify',
  maxWidth: '100%',

  '@media only screen and (max-width: 600px)': {
    padding: 5,

    '& .content': {
      padding: '0px 20px 20px 20px !important',
    },
  },

  '& .content': {
    margin: 0,
    marginBottom: 10,
    maxWidth: 900,
    border: '1px solid #e1e4e8',
    padding: '10px 40px',
    paddingBottom: 20,
    borderRadius: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  '& hr': {
    color: '#bbb',
    backgroundColor: ' #bbb',
    height: 1,
    flex: '0 1 auto',
    margin: '1em 0',
    padding: 0,
    border: 'none',
  },

  '& a': {
    color: '#0366d6',
    textDecoration: 'none',
  },

  '& a:visited': {
    color: '#0366d6',
  },

  '& a:hover': {
    color: '#0366d6',
    textDecoration: 'underline',
  },

  '& pre': {
    backgroundColor: '#f6f8fa',
    borderRadius: 3,
    fontSize: '85%',
    lineHeight: '1.45',
    overflow: 'auto',
    padding: 16,
  },

  '& code': {
    backgroundColor: 'rgba(27, 31, 35, 0.05)',
    borderRadius: 3,
    fontSize: '85%',
    margin: 0,
    wordWrap: 'break-word',
    padding: '0.2em 0.4em',
    fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace,',
  },

  '& pre > code': {
    backgroundolor: 'transparent',
    border: 0,
    display: 'inline',
    lineHeight: 'inherit',
    margin: 0,
    overflow: 'visible',
    padding: 0,
    wordWrap: 'normal',
    fontSize: '100%',
  },

  '& blockquote': {
    marginLeft: 30,
    marginTop: 0,
    marginBottom: 16,
    borderLeftWidth: 3,
    padding: '0 1em',
    color: '#828282',
    borderLeft: '4px solid #e8e8e8',
    paddingLeft: 15,
    fontSize: 18,
    letterSpacing: -1,
    fontStyle: 'italic',
  },

  '& blockquote *': {
    fontStyle: 'normal !important',
    letterSpacing: 0,
    color: '#6a737d !important',
  },

  '& table': {
    borderSpacing: 2,
    display: 'block',
    fontSize: 14,
    overflow: 'auto',
    width: '100%',
    marginBottom: 16,
    borderCollapse: 'collapse',
  },

  '& td': {
    padding: '6px 13px',
    border: '1px solid #dfe2e5',
  },

  '& th': {
    fontWeight: 600,
    padding: '6px 13px',
    border: '1px solid #dfe2e5',
  },

  '& tr': {
    backgroundColor: '#fff',
    borderTop: '1px solid #c6cbd1',
  },

  '& table tr:nth-child(2n)': {
    backgroundColor: '#f6f8fa',
  },

  '& img': {
    maxWidth: '100%',
  },

  '& p': {
    fontWeight: 400,
    fontSize: 16,
    color: '#24292e',
  },

  '& ul': {
    marginTop: 0,
  },

  '& li': {
    color: '#24292e',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
  },

  '& li + li': {
    marginTop: '0.25em',
  },

  '& *': {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    color: '#24292e',
  },

  '& h1, h2,h3': {
    borderBottom: '1px solid #eaecef',
    color: '#111',
  },
});

export const placeholder = styledComponents.div``;
