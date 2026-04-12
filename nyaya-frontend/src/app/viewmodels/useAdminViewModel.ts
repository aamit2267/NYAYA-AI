import { useState, useEffect } from 'react';
import { adminApi } from '@/app/models/api/adminApi';

export function useAdminViewModel() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });
  
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showReliefModal, setShowReliefModal] = useState(false);

  useEffect(() => {
    const cachedKey = localStorage.getItem('nyaya_admin_key');
    if (cachedKey) setApiKey(cachedKey);
  }, []);

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    localStorage.setItem('nyaya_admin_key', key);
  };

  const handleError = (error: any) => {
    if (error.message.includes('Unauthorized')) {
      setShowWarningModal(true);
      setStatus({ type: 'error', message: 'Authentication Failed.' });
    } else {
      setStatus({ type: 'error', message: error.message });
    }
  };

  const submitText = async (content: string, source: string) => {
    if (!apiKey) return setStatus({ type: 'error', message: 'API Key is required.' });
    if (!content) return setStatus({ type: 'error', message: 'Content cannot be empty.' });

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      await adminApi.ingestText(content, source, apiKey);
      setStatus({ type: 'success', message: 'Text successfully vectorized and stored in PostgreSQL!' });
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const submitPdf = async (file: File | null, source: string) => {
    if (!apiKey) return setStatus({ type: 'error', message: 'API Key is required.' });
    if (!file) return setStatus({ type: 'error', message: 'Please select a PDF file.' });

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      await adminApi.ingestPdf(file, source, apiKey);
      setStatus({ type: 'success', message: 'PDF uploaded successfully. Vectorization is running in the background!' });
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  
  const acknowledgeWarning = () => {
    setShowWarningModal(false);
    setShowReliefModal(true);
  };

  const dismissRelief = () => {
    setShowReliefModal(false);
    setApiKey(''); 
    localStorage.removeItem('nyaya_admin_key');
  };

  return { 
    apiKey, handleApiKeyChange, submitText, submitPdf, loading, status,
    showWarningModal, showReliefModal, acknowledgeWarning, dismissRelief 
  };
}