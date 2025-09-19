import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, 
  Mail, 
  MailOpen, 
  Clock, 
  CreditCard, 
  AlertTriangle,
  Info,
  CheckCircle,
  Trash2
} from 'lucide-react';

export interface InboxMessage {
  id: string;
  type: 'announcement' | 'payment_reminder' | 'document_request' | 'match_update' | 'system';
  title: string;
  content: string;
  sender: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionRequired?: boolean;
  actionUrl?: string;
  actionText?: string;
}

interface PlayerInboxProps {
  messages: InboxMessage[];
  onMarkAsRead: (messageId: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteMessage: (messageId: string) => void;
  onActionClick?: (message: InboxMessage) => void;
}

export const PlayerInbox = ({ 
  messages, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onDeleteMessage,
  onActionClick 
}: PlayerInboxProps) => {
  const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(null);
  const { toast } = useToast();

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  const getTypeIcon = (type: InboxMessage['type']) => {
    switch (type) {
      case 'announcement':
        return <Bell className="h-4 w-4 text-blue-500" />;
      case 'payment_reminder':
        return <CreditCard className="h-4 w-4 text-orange-500" />;
      case 'document_request':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'match_update':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: InboxMessage['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-orange-500';
      default:
        return 'border-l-blue-500';
    }
  };

  const handleMessageClick = (message: InboxMessage) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      onMarkAsRead(message.id);
    }
  };

  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return messageTime.toLocaleDateString();
  };

  const handleActionClick = (message: InboxMessage) => {
    if (onActionClick) {
      onActionClick(message);
    } else if (message.actionUrl) {
      window.open(message.actionUrl, '_blank');
    }
    toast({
      title: "Action initiated",
      description: `${message.actionText || 'Action'} clicked for: ${message.title}`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Message List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Inbox
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onMarkAllAsRead}
              >
                Mark all read
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[480px]">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No messages yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 cursor-pointer hover:bg-muted/50 border-l-4 ${getPriorityColor(message.priority)} ${
                      selectedMessage?.id === message.id ? 'bg-muted' : ''
                    } ${!message.isRead ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        {getTypeIcon(message.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {!message.isRead ? (
                              <Mail className="h-3 w-3 text-blue-500" />
                            ) : (
                              <MailOpen className="h-3 w-3 text-muted-foreground" />
                            )}
                            <p className={`font-medium text-sm truncate ${!message.isRead ? 'font-semibold' : ''}`}>
                              {message.title}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {message.content}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {message.sender}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatRelativeTime(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {message.priority === 'high' && (
                        <AlertTriangle className="h-3 w-3 text-red-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Message Detail */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {selectedMessage ? (
              <div className="flex items-center gap-2">
                {getTypeIcon(selectedMessage.type)}
                <span className="text-lg">{selectedMessage.title}</span>
                {selectedMessage.priority === 'high' && (
                  <Badge variant="destructive">High Priority</Badge>
                )}
              </div>
            ) : (
              <span>Select a message</span>
            )}
            {selectedMessage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteMessage(selectedMessage.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedMessage ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>From: {selectedMessage.sender}</span>
                </div>
                <span>{new Date(selectedMessage.timestamp).toLocaleString()}</span>
              </div>
              <Separator />
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>
              {selectedMessage.actionRequired && (
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Action Required</p>
                      <p className="text-sm text-muted-foreground">
                        This message requires your attention
                      </p>
                    </div>
                    <Button onClick={() => handleActionClick(selectedMessage)}>
                      {selectedMessage.actionText || 'Take Action'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Mail className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Select a message to read</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};