const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export const adminApi = {
  ingestText: async (content: string, source: string, apiKey: string) => {
    const res = await fetch(`${BASE_URL}/api/admin/ingest/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({ content, source }),
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error('Unauthorized: Invalid API Key');
      throw new Error('Failed to ingest text. Check backend logs.');
    }
    return res.json();
  },

  ingestPdf: async (file: File, source: string, apiKey: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (source) formData.append('source', source);

    const res = await fetch(`${BASE_URL}/api/admin/ingest/pdf`, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey, 
      },
      body: formData,
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error('Unauthorized: Invalid API Key');
      throw new Error('Failed to upload PDF. Check file size limits.');
    }
    return res.json();
  },
};