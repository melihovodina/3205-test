import React from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap';
import './linkTable.css'

type Props = {}

function LinkTable({}: Props) {
  const urls = [
    { originalUrl: 'https://example.com', shortUrl: 'https://short.ly/abc123', createdAt: '2025-03-16' },
    { originalUrl: 'https://anotherexample.com', shortUrl: 'https://short.ly/def456', createdAt: '2025-03-15' },
  ];

  return (
    <>
      <Row>
        <Col>
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url, index) => (
                  <tr key={index}>
                    <td><a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a></td>
                    <td><a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></td>
                    <td>{url.createdAt}</td> 
                    <td className="action-buttons">
                      <Button variant='danger'>Delete</Button> 
                      <Button>Info</Button>
                    </td> 
                  </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}

export default LinkTable