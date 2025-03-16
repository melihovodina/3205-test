import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { deleteUrl, UrlInfo, getAllUrls, getAnalytics } from '../../api/api';
import ModalWindow from '../modalWindow/ModalWindow';
import './linkTable.css';

const LinkTable = forwardRef((props, ref) => {
  const [urls, setUrls] = useState<UrlInfo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [analytics, setAnalytics] = useState<{ clickCount: number; recentIps: string[] } | null>(null);

  useImperativeHandle(ref, () => ({
    refreshUrls() {
      fetchUrls();
    }
  }));

  const fetchUrls = async () => {
    try {
      const response = await getAllUrls();
      setUrls(response);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (shortUrl: string) => {
    try {
      await deleteUrl(shortUrl);
      setUrls(urls.filter(url => url.shortUrl !== shortUrl));
    } catch (error) {
      console.error('Ошибка при удалении URL:', error);
    }
  };

  const handleInfo = async (shortUrl: string) => {
    try {
      const analyticsData = await getAnalytics(shortUrl);
      setAnalytics(analyticsData);
      setShowModal(true);
    } catch (error) {
      console.error('Ошибка при получении информации о URL:', error);
    }
  };

  const handleRedirect = (shortUrl: string) => {
    window.location.href = `http://localhost:5000/${shortUrl}`;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAnalytics(null);
  };

  return (
    <>
      <Row>
        <Col>
          <Table striped bordered hover>
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
                  <td><a onClick={() => handleRedirect(url.shortUrl)}>{url.shortUrl}</a></td>
                  <td>{new Date(url.createdAt).toLocaleString()}</td>
                  <td className="action-buttons">
                    <Button onClick={() => handleInfo(url.shortUrl)}>Info</Button>
                    <Button variant="danger" onClick={() => handleDelete(url.shortUrl)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <ModalWindow
        show={showModal}
        onHide={handleCloseModal}
        bodyContent={
          analytics ? (
            <div>
              <p><strong>Click Count:</strong> {analytics.clickCount}</p>
              <p><strong>Recent IPs:</strong></p>
              <ul>
                {analytics.recentIps.map((ip, index) => (
                  <li key={index}>{ip}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Loading...</p>
          )
        }
      />
    </>
  );
});

export default LinkTable;