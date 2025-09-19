import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Users, 
  Plus, 
  Edit, 
  Trash2,
  UserCheck,
  UserX,
  Settings,
  Crown,
  Key
} from 'lucide-react';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'tournament_director' | 'technical_director' | 'finance' | 'media_manager' | 'volunteer_coordinator';
  status: 'active' | 'inactive' | 'suspended';
  permissions: string[];
  lastLogin: string;
  createdAt: string;
  avatar?: string;
}

interface AdminManagerProps {
  admins: AdminUser[];
  currentUserId: string;
  onCreateAdmin: (admin: Omit<AdminUser, 'id' | 'createdAt' | 'lastLogin'>) => Promise<void>;
  onUpdateAdmin: (id: string, updates: Partial<AdminUser>) => Promise<void>;
  onDeleteAdmin: (id: string) => Promise<void>;
  onToggleStatus: (id: string, status: AdminUser['status']) => Promise<void>;
}

const ADMIN_ROLES = {
  super_admin: {
    label: 'Super Admin',
    description: 'Full system access and user management',
    permissions: ['all'],
    color: 'text-red-600'
  },
  tournament_director: {
    label: 'Tournament Director',
    description: 'Tournament management and oversight',
    permissions: ['tournament_management', 'fixture_management', 'results_management'],
    color: 'text-blue-600'
  },
  technical_director: {
    label: 'Technical Director',
    description: 'Technical operations and system management',
    permissions: ['system_management', 'user_support', 'technical_operations'],
    color: 'text-green-600'
  },
  finance: {
    label: 'Finance Manager',
    description: 'Payment processing and financial oversight',
    permissions: ['payment_management', 'financial_reports', 'invoice_management'],
    color: 'text-orange-600'
  },
  media_manager: {
    label: 'Media Manager',
    description: 'Content and media management',
    permissions: ['content_management', 'media_uploads', 'announcement_management'],
    color: 'text-purple-600'
  },
  volunteer_coordinator: {
    label: 'Volunteer Coordinator',
    description: 'Volunteer management and coordination',
    permissions: ['volunteer_management', 'task_assignment', 'schedule_coordination'],
    color: 'text-teal-600'
  }
} as const;

export const AdminManager = ({ 
  admins, 
  currentUserId, 
  onCreateAdmin, 
  onUpdateAdmin, 
  onDeleteAdmin, 
  onToggleStatus 
}: AdminManagerProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'tournament_director' as AdminUser['role'],
    status: 'active' as AdminUser['status'],
    permissions: [] as string[],
    avatar: ''
  });
  const { toast } = useToast();

  const handleCreateAdmin = async () => {
    if (!newAdmin.name.trim() || !newAdmin.email.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const permissions = [...ADMIN_ROLES[newAdmin.role].permissions];
      await onCreateAdmin({
        ...newAdmin,
        permissions
      });

      toast({
        title: "Admin created",
        description: `${newAdmin.name} has been added as ${ADMIN_ROLES[newAdmin.role].label}`,
      });

      setNewAdmin({
        name: '',
        email: '',
        role: 'tournament_director',
        status: 'active',
        permissions: [],
        avatar: ''
      });
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast({
        title: "Failed to create admin",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const handleUpdateAdmin = async (updates: Partial<AdminUser>) => {
    if (!editingAdmin) return;

    try {
      await onUpdateAdmin(editingAdmin.id, updates);
      toast({
        title: "Admin updated",
        description: "Admin details have been updated successfully",
      });
      setEditingAdmin(null);
    } catch (error) {
      toast({
        title: "Failed to update admin",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    if (adminId === currentUserId) {
      toast({
        title: "Cannot delete yourself",
        description: "You cannot delete your own admin account",
        variant: "destructive"
      });
      return;
    }

    try {
      await onDeleteAdmin(adminId);
      toast({
        title: "Admin deleted",
        description: "Admin account has been removed",
      });
    } catch (error) {
      toast({
        title: "Failed to delete admin",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const handleToggleStatus = async (adminId: string, currentStatus: AdminUser['status']) => {
    if (adminId === currentUserId) {
      toast({
        title: "Cannot modify yourself",
        description: "You cannot change your own account status",
        variant: "destructive"
      });
      return;
    }

    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    
    try {
      await onToggleStatus(adminId, newStatus);
      toast({
        title: "Status updated",
        description: `Admin account has been ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Failed to update status",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: AdminUser['status']) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      suspended: 'destructive'
    } as const;

    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const getRoleInfo = (role: AdminUser['role']) => {
    return ADMIN_ROLES[role] || ADMIN_ROLES.tournament_director;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Admin Management</h2>
          <p className="text-muted-foreground">
            Manage administrator accounts and permissions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Admin</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={newAdmin.role} onValueChange={(value: AdminUser['role']) => setNewAdmin(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ADMIN_ROLES).map(([key, role]) => (
                      <SelectItem key={key} value={key}>
                        <div>
                          <p className="font-medium">{role.label}</p>
                          <p className="text-xs text-muted-foreground">{role.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAdmin}>
                  Create Admin
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Admin List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {admins.map((admin) => {
          const roleInfo = getRoleInfo(admin.role);
          const isCurrentUser = admin.id === currentUserId;

          return (
            <Card key={admin.id} className={isCurrentUser ? 'ring-2 ring-primary' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={admin.avatar} />
                      <AvatarFallback>
                        {admin.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{admin.name}</h3>
                        {isCurrentUser && <Crown className="h-4 w-4 text-yellow-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{admin.email}</p>
                    </div>
                  </div>
                  {getStatusBadge(admin.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className={`h-4 w-4 ${roleInfo.color}`} />
                    <span className="font-medium">{roleInfo.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{roleInfo.description}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {admin.permissions.slice(0, 3).map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission.replace('_', ' ')}
                      </Badge>
                    ))}
                    {admin.permissions.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{admin.permissions.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>Last login: {new Date(admin.lastLogin).toLocaleDateString()}</p>
                  <p>Created: {new Date(admin.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingAdmin(admin)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {!isCurrentUser && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(admin.id, admin.status)}
                      >
                        {admin.status === 'active' ? (
                          <UserX className="h-4 w-4" />
                        ) : (
                          <UserCheck className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAdmin(admin.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Admin Dialog */}
      {editingAdmin && (
        <Dialog open={!!editingAdmin} onOpenChange={() => setEditingAdmin(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Admin: {editingAdmin.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  defaultValue={editingAdmin.name}
                  onChange={(e) => setEditingAdmin(prev => prev ? { ...prev, name: e.target.value } : null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={editingAdmin.email}
                  onChange={(e) => setEditingAdmin(prev => prev ? { ...prev, email: e.target.value } : null)}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select 
                  value={editingAdmin.role} 
                  onValueChange={(value: AdminUser['role']) => setEditingAdmin(prev => prev ? { ...prev, role: value } : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ADMIN_ROLES).map(([key, role]) => (
                      <SelectItem key={key} value={key}>
                        <div>
                          <p className="font-medium">{role.label}</p>
                          <p className="text-xs text-muted-foreground">{role.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingAdmin(null)}>
                  Cancel
                </Button>
                <Button onClick={() => handleUpdateAdmin(editingAdmin)}>
                  Update Admin
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};