import { Message } from '@/hooks/useChat';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  const isLoading = message.isLoading;

  return (
    <div
      className={cn(
        'flex w-full gap-3 p-4 animate-in fade-in-0 slide-in-from-bottom-2',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
          <Bot size={16} />
        </div>
      )}
      
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-3 shadow-sm transition-all duration-300',
          isUser
            ? 'bg-chat-user text-chat-user-foreground ml-auto'
            : 'bg-chat-assistant text-chat-assistant-foreground border'
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse"></div>
              <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse [animation-delay:0.2s]"></div>
              <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse [animation-delay:0.4s]"></div>
            </div>
            <span className="text-sm text-muted-foreground">Processando...</span>
          </div>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        )}
        
        <div className="mt-2 text-xs opacity-60">
          {message.timestamp.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md">
          <User size={16} />
        </div>
      )}
    </div>
  );
};