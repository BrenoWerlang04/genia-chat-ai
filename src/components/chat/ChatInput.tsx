import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 p-4 border-t bg-card">
      <div className="flex-1 relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          disabled={disabled}
          className={cn(
            "min-h-[60px] max-h-[120px] resize-none pr-12 transition-all duration-200",
            "focus:shadow-md focus:border-primary/50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>
      
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        className={cn(
          "h-[60px] px-6 rounded-lg bg-primary hover:bg-primary/90 transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-md hover:shadow-lg hover:scale-105"
        )}
      >
        <Send size={20} />
      </Button>
    </form>
  );
};