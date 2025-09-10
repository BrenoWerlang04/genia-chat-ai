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

// Mock API service para CrewAI
const sendToCrewAI = async (message: string): Promise<string> => {
  // Simula delay da API
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
  
  // Mock de respostas do CrewAI baseadas em e-commerce
  const responses = [
    `Entendo que você está procurando ajuda com ${message.toLowerCase()}. Como assistente de e-commerce, posso te auxiliar com recomendações de produtos, informações sobre pedidos, ou qualquer dúvida sobre nossa loja.`,
    `Ótima pergunta! Baseado na sua solicitação sobre "${message}", posso sugerir algumas opções que temos disponíveis em nossa loja. Você gostaria de ver produtos relacionados?`,
    `Analisando sua mensagem, vejo que você está interessado em "${message}". Nossa equipe de IA processou sua solicitação e encontrou algumas sugestões personalizadas para você.`,
    `Obrigado por sua pergunta sobre "${message}". Como seu assistente de compras inteligente, posso te ajudar a encontrar exatamente o que precisa em nosso catálogo.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
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