const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export const chatApi = {
  streamChat: async (prompt: string, onChunk: (chunk: string) => void): Promise<void> => {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify({ question: prompt }),
    });

    if (!response.ok) {
      throw new Error(`Connection failed: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('ReadableStream not supported by this browser.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const dataStr = line.replace(/^data:\s*/, '').trim();
          
          if (dataStr) {
            try {
              const parsed = JSON.parse(dataStr);
              
              if (parsed.text === '[DONE]') {
                continue; 
              }
              
              onChunk(parsed.text);
            } catch (e) {
              console.error("Failed to parse SSE JSON chunk:", dataStr);
              if (dataStr !== '[DONE]' && !dataStr.includes('{"text":')) {
                onChunk(dataStr);
              }
            }
          }
        }
      }
    }
  }
};