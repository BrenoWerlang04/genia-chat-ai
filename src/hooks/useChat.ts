import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

// API service para CrewAI
const sendToCrewAI = async (message: string): Promise<string> => {
  try {
    const response = await fetch('http://127.0.0.1:8000/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        solicitacao: message
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    
    // Assumindo que a resposta vem em um campo específico
    // Ajuste conforme a estrutura de resposta do seu endpoint
    return data.resposta || data.message || data.content || JSON.stringify(data);
    
  } catch (error) {
    console.error('Erro ao comunicar com CrewAI:', error);
    throw new Error('Não foi possível conectar com o sistema de agentes. Verifique se o servidor está rodando.');
  }
};

export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Sou seu assistente de e-commerce inteligente. Como posso te ajudar hoje?',
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      // Chama a API do CrewAI (mock)
      const response = await sendToCrewAI(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => 
        prev.map(msg => 
          msg.isLoading ? assistantMessage : msg
        )
      );
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => 
        prev.map(msg => 
          msg.isLoading ? errorMessage : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: '1',
        content: 'Olá! Sou seu assistente de e-commerce inteligente. Como posso te ajudar hoje?',
        role: 'assistant',
        timestamp: new Date(),
      }
    ]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
  };
};