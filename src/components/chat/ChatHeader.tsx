import { ShoppingCart } from 'lucide-react';
import assistantIcon from '@/assets/ai-assistant-icon.png';

export const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-6 border-b bg-card shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-lg overflow-hidden">
          <img 
            src={assistantIcon} 
            alt="AI Assistant" 
            className="w-10 h-10 object-contain"
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Assistente E-commerce IA
          </h1>
          <p className="text-sm text-muted-foreground">
            Powered by CrewAI • Sempre online
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-primary">
        <ShoppingCart size={18} />
        <span className="text-sm font-medium">Loja Virtual</span>
      </div>
    </div>
  );
};