import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Send, 
  Users, 
  User, 
  Bell,
  CreditCard,
  AlertTriangle,
  Info,
  MessageSquare
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  email: string;
  university: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  documentStatus: 'complete' | 'incomplete';
}

interface AdminMessagingProps {
  players: Player[];
  onSendMessage: (message: {
    recipients: string[];
    type: 'announcement' | 'payment_reminder' | 'document_request' | 'system';
    title: string;
    content: string;
    priority: 'low' | 'medium' | 'high';
    actionRequired: boolean;
    actionText?: string;
    actionUrl?: string;
  }) => Promise<void>;
}

export const AdminMessaging = ({ players, onSendMessage }: AdminMessagingProps) => {
  const [messageType, setMessageType] = useState<'announcement' | 'payment_reminder' | 'document_request' | 'system'>('announcement');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [recipientFilter, setRecipientFilter] = useState<'all' | 'pending_payment' | 'incomplete_docs' | 'custom'>('all');
  const [actionRequired, setActionRequired] = useState(false);
  const [actionText, setActionText] = useState('');
  const [actionUrl, setActionUrl] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const getFilteredPlayers = () => {
    switch (recipientFilter) {
      case 'pending_payment':
        return players.filter(p => p.paymentStatus !== 'paid');
      case 'incomplete_docs':
        return players.filter(p => p.documentStatus === 'incomplete');
      case 'custom':
        return players.filter(p => selectedRecipients.includes(p.id));
      default:
        return players;
    }
  };

  const handleRecipientFilterChange = (filter: typeof recipientFilter) => {
    setRecipientFilter(filter);
    if (filter !== 'custom') {
      setSelectedRecipients([]);
    }
  };

  const handlePlayerSelection = (playerId: string, checked: boolean) => {
    setSelectedRecipients(prev => 
      checked 
        ? [...prev, playerId]
        : prev.filter(id => id !== playerId)
    );
  };

  const getMessageTypeIcon = (type: typeof messageType) => {
    switch (type) {
      case 'announcement':
        return <Bell className="h-4 w-4" />;
      case 'payment_reminder':
        return <CreditCard className="h-4 w-4" />;
      case 'document_request':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getQuickTemplates = () => {
    switch (messageType) {
      case 'payment_reminder':
        return [
          {
            title: 'Payment Reminder - Registration Fee',
            content: 'Dear Player,\n\nThis is a friendly reminder that your registration fee payment is still pending. Please complete your payment at your earliest convenience to confirm your participation in the tournament.\n\nAmount Due: ₹[AMOUNT]\nDue Date: [DATE]\n\nThank you for your cooperation.'
          },
          {
            title: 'Payment Overdue Notice',
            content: 'Dear Player,\n\nYour tournament registration fee payment is now overdue. Please complete your payment immediately to avoid cancellation of your registration.\n\nAmount Due: ₹[AMOUNT]\nOriginal Due Date: [DATE]\n\nPlease contact us if you need assistance.'
          }
        ];
      case 'document_request':
        return [
          {
            title: 'Document Submission Required',
            content: 'Dear Player,\n\nWe need you to submit the following documents to complete your registration:\n\n• Student ID Card\n• Medical Certificate\n• Photo ID Proof\n\nPlease upload these documents through your player dashboard within 48 hours.\n\nThank you.'
          }
        ];
      case 'announcement':
        return [
          {
            title: 'Tournament Schedule Update',
            content: 'Dear Players,\n\nWe have some important updates regarding the tournament schedule. Please check your match timings and venue details in your dashboard.\n\nFor any queries, please contact the tournament desk.\n\nBest regards,\nTournament Committee'
          }
        ];
      default:
        return [];
    }
  };

  const handleQuickTemplate = (template: { title: string; content: string }) => {
    setTitle(template.title);
    setContent(template.content);
  };

  const handleSendMessage = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in title and content",
        variant: "destructive"
      });
      return;
    }

    const recipients = recipientFilter === 'custom' 
      ? selectedRecipients 
      : getFilteredPlayers().map(p => p.id);

    if (recipients.length === 0) {
      toast({
        title: "No recipients",
        description: "Please select at least one recipient",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    
    try {
      await onSendMessage({
        recipients,
        type: messageType,
        title,
        content,
        priority,
        actionRequired,
        actionText: actionRequired ? actionText : undefined,
        actionUrl: actionRequired ? actionUrl : undefined
      });

      toast({
        title: "Message sent",
        description: `Message sent to ${recipients.length} recipient(s)`,
      });

      // Reset form
      setTitle('');
      setContent('');
      setSelectedRecipients([]);
      setActionRequired(false);
      setActionText('');
      setActionUrl('');
      
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const filteredPlayers = getFilteredPlayers();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Message Composer */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Send Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Message Type */}
          <div className="space-y-2">
            <Label>Message Type</Label>
            <Select value={messageType} onValueChange={(value: any) => setMessageType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="announcement">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    General Announcement
                  </div>
                </SelectItem>
                <SelectItem value="payment_reminder">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Payment Reminder
                  </div>
                </SelectItem>
                <SelectItem value="document_request">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Document Request
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    System Notice
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Templates */}
          {getQuickTemplates().length > 0 && (
            <div className="space-y-2">
              <Label>Quick Templates</Label>
              <div className="flex flex-wrap gap-2">
                {getQuickTemplates().map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickTemplate(template)}
                  >
                    {template.title}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Subject</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter message subject"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Message Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your message..."
              rows={6}
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Required */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="actionRequired"
                checked={actionRequired}
                onCheckedChange={(checked) => setActionRequired(checked as boolean)}
              />
              <Label htmlFor="actionRequired">Requires player action</Label>
            </div>

            {actionRequired && (
              <div className="space-y-2 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="actionText">Action Button Text</Label>
                  <Input
                    id="actionText"
                    value={actionText}
                    onChange={(e) => setActionText(e.target.value)}
                    placeholder="e.g., Make Payment, Upload Documents"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actionUrl">Action URL (optional)</Label>
                  <Input
                    id="actionUrl"
                    value={actionUrl}
                    onChange={(e) => setActionUrl(e.target.value)}
                    placeholder="https://example.com/payment"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Send Button */}
          <Button 
            onClick={handleSendMessage} 
            disabled={isSending}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSending ? 'Sending...' : `Send to ${filteredPlayers.length} recipient(s)`}
          </Button>
        </CardContent>
      </Card>

      {/* Recipients */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recipients ({filteredPlayers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Recipient Filter */}
          <div className="space-y-2">
            <Label>Select Recipients</Label>
            <Select value={recipientFilter} onValueChange={handleRecipientFilterChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Players</SelectItem>
                <SelectItem value="pending_payment">Pending Payments</SelectItem>
                <SelectItem value="incomplete_docs">Incomplete Documents</SelectItem>
                <SelectItem value="custom">Custom Selection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Custom Player Selection */}
          {recipientFilter === 'custom' && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {players.map((player) => (
                <div key={player.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={player.id}
                    checked={selectedRecipients.includes(player.id)}
                    onCheckedChange={(checked) => handlePlayerSelection(player.id, checked as boolean)}
                  />
                  <Label htmlFor={player.id} className="flex-1 text-sm">
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-xs text-muted-foreground">{player.university}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          )}

          {/* Recipients Preview */}
          <div className="space-y-2">
            <Label>Recipients Preview</Label>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {filteredPlayers.slice(0, 10).map((player) => (
                <div key={player.id} className="flex items-center justify-between text-sm">
                  <span>{player.name}</span>
                  <div className="flex gap-1">
                    <Badge variant={player.paymentStatus === 'paid' ? 'default' : 'secondary'} className="text-xs">
                      {player.paymentStatus}
                    </Badge>
                  </div>
                </div>
              ))}
              {filteredPlayers.length > 10 && (
                <p className="text-xs text-muted-foreground">
                  ...and {filteredPlayers.length - 10} more
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};