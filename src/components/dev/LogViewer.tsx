import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Trash2, RefreshCw } from 'lucide-react';

const LogViewer = () => {
  const [logs, setLogs] = useState(logger.getAllLogs());
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setLogs(logger.getAllLogs());
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const refreshLogs = () => {
    setLogs(logger.getAllLogs());
  };

  const clearLogs = () => {
    logger.clearLogs();
    setLogs([]);
  };

  const downloadLogs = () => {
    const logData = logger.exportLogs();
    const blob = new Blob([logData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tournament-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getLogsByCategory = (category: string) => {
    return logs.filter(log => log.category === category);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'destructive';
      case 'warn': return 'secondary';
      case 'info': return 'default';
      case 'debug': return 'outline';
      default: return 'default';
    }
  };

  const LogList = ({ logs: logList }: { logs: typeof logs }) => (
    <ScrollArea className="h-[400px]">
      <div className="space-y-2">
        {logList.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No logs available</p>
        ) : (
          logList.map((log, index) => (
            <div key={index} className="border rounded-lg p-3 text-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant={getLevelColor(log.level)}>
                    {log.level.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">{log.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <p className="font-medium mb-1">{log.message}</p>
              {log.data && (
                <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                  {JSON.stringify(log.data, null, 2)}
                </pre>
              )}
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );

  // Only show in development
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Application Logs</CardTitle>
            <CardDescription>
              Real-time application logs for debugging (Development only)
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto' : 'Manual'}
            </Button>
            <Button variant="outline" size="sm" onClick={refreshLogs}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={downloadLogs}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="destructive" size="sm" onClick={clearLogs}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({logs.length})</TabsTrigger>
            <TabsTrigger value="auth">Auth ({getLogsByCategory('auth').length})</TabsTrigger>
            <TabsTrigger value="firebase">Firebase ({getLogsByCategory('firebase').length})</TabsTrigger>
            <TabsTrigger value="api">API ({getLogsByCategory('api').length})</TabsTrigger>
            <TabsTrigger value="ui">UI ({getLogsByCategory('ui').length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <LogList logs={logs} />
          </TabsContent>
          
          <TabsContent value="auth">
            <LogList logs={getLogsByCategory('auth')} />
          </TabsContent>
          
          <TabsContent value="firebase">
            <LogList logs={getLogsByCategory('firebase')} />
          </TabsContent>
          
          <TabsContent value="api">
            <LogList logs={getLogsByCategory('api')} />
          </TabsContent>
          
          <TabsContent value="ui">
            <LogList logs={getLogsByCategory('ui')} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LogViewer;