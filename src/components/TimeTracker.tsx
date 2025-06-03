
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Square, Clock } from 'lucide-react';

const TimeTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activity, setActivity] = useState('');
  const [category, setCategory] = useState('');
  const [sessions, setSessions] = useState([
    {
      id: 1,
      activity: 'React Development',
      category: 'productive',
      duration: 120,
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      activity: 'Social Media',
      category: 'unproductive',
      duration: 45,
      timestamp: new Date(Date.now() - 7200000).toISOString()
    }
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!activity || !category) {
      alert('Please enter activity and select category');
      return;
    }
    setIsTracking(true);
  };

  const handlePause = () => {
    setIsTracking(false);
  };

  const handleStop = () => {
    if (currentTime > 0) {
      const newSession = {
        id: sessions.length + 1,
        activity,
        category,
        duration: currentTime,
        timestamp: new Date().toISOString()
      };
      setSessions([newSession, ...sessions]);
    }
    setIsTracking(false);
    setCurrentTime(0);
    setActivity('');
    setCategory('');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Timer Display */}
          <div className="text-center">
            <div className="text-6xl font-mono font-bold text-gray-800 mb-4">
              {formatTime(currentTime)}
            </div>
            
            {/* Controls */}
            <div className="flex justify-center gap-2 mb-6">
              {!isTracking ? (
                <Button onClick={handleStart} className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Start
                </Button>
              ) : (
                <Button onClick={handlePause} variant="outline" className="flex items-center gap-2">
                  <Pause className="h-4 w-4" />
                  Pause
                </Button>
              )}
              <Button onClick={handleStop} variant="destructive" className="flex items-center gap-2">
                <Square className="h-4 w-4" />
                Stop
              </Button>
            </div>
          </div>

          {/* Activity Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="activity">Activity</Label>
              <Input
                id="activity"
                placeholder="What are you working on?"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="productive">Productive</SelectItem>
                  <SelectItem value="unproductive">Unproductive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions.slice(0, 5).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                <div>
                  <div className="font-medium">{session.activity}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(session.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={session.category === 'productive' ? 'default' : 'secondary'}>
                    {session.category}
                  </Badge>
                  <div className="font-mono text-sm">
                    {formatTime(session.duration)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeTracker;
