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
  onClearAll?: () => void;
  onActionClick?: (message: InboxMessage) => void;
}

export const PlayerInbox = ({ 
  messages, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onDeleteMessage,
  onClearAll,
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
    <div className="space-y-4">
      {/* Mobile/Desktop Inbox Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="h-5 w-5" />
              Inbox
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onMarkAllAsRead}
                  className="w-full sm:w-auto"
                >
                  Mark all read
                </Button>
              )}
              {messages.length > 0 && onClearAll && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onClearAll}
                  className="w-full sm:w-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {/* Messages Layout - Mobile: Single column, Desktop: Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Message List */}
        <Card className="h-[400px] lg:h-[500px]">
          <CardContent className="p-0">
            <ScrollArea className="h-full">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">No messages yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Your inbox is empty</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 sm:p-4 cursor-pointer hover:bg-muted/50 border-l-4 ${getPriorityColor(message.priority)} ${
                        selectedMessage?.id === message.id ? 'bg-muted' : ''
                      } ${!message.isRead ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}
                      onClick={() => handleMessageClick(message)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          {getTypeIcon(message.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              {!message.isRead ? (
                                <Mail className="h-3 w-3 text-blue-500 flex-shrink-0" />
                              ) : (
                                <MailOpen className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              )}
                              <p className={`font-medium text-xs sm:text-sm truncate ${!message.isRead ? 'font-semibold' : ''}`}>
                                {message.title}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground truncate mt-1">
                              {message.content}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-muted-foreground truncate">
                                {message.sender}
                              </span>
                              <span className="text-xs text-muted-foreground flex-shrink-0">
                                {formatRelativeTime(message.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {message.priority === 'high' && (
                            <AlertTriangle className="h-3 w-3 text-red-500 flex-shrink-0" />
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteMessage(message.id);
                            }}
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Detail */}
        <Card className="h-[400px] lg:h-[500px]">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              {selectedMessage ? (
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getTypeIcon(selectedMessage.type)}
                  <span className="text-base sm:text-lg truncate">{selectedMessage.title}</span>
                  {selectedMessage.priority === 'high' && (
                    <Badge variant="destructive" className="text-xs">High Priority</Badge>
                  )}
                </div>
              ) : (
                <span className="text-base sm:text-lg">Select a message</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-5rem)] overflow-y-auto">
            {selectedMessage ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">From: {selectedMessage.sender}</span>
                  </div>
                  <span className="text-xs sm:text-sm">{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                </div>
                <Separator />
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-sm">{selectedMessage.content}</p>
                </div>
                {selectedMessage.actionRequired && (
                  <div className="bg-muted p-3 sm:p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-medium text-sm">Action Required</p>
                        <p className="text-xs text-muted-foreground">
                          This message requires your attention
                        </p>
                      </div>
                      <Button 
                        onClick={() => handleActionClick(selectedMessage)}
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        {selectedMessage.actionText || 'Take Action'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Mail className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Select a message to read</p>
                <p className="text-xs text-muted-foreground mt-1">Choose a message from the list to view its details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};