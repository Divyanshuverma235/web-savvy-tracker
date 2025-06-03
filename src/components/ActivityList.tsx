
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Edit } from 'lucide-react';

interface ActivityListProps {
  showManagement?: boolean;
}

const ActivityList = ({ showManagement = false }: ActivityListProps) => {
  const [activities, setActivities] = useState([
    { id: 1, name: 'GitHub', category: 'productive', totalTime: 180 },
    { id: 2, name: 'Stack Overflow', category: 'productive', totalTime: 120 },
    { id: 3, name: 'Facebook', category: 'unproductive', totalTime: 90 },
    { id: 4, name: 'YouTube', category: 'unproductive', totalTime: 150 },
    { id: 5, name: 'Documentation', category: 'productive', totalTime: 200 }
  ]);

  const [newActivity, setNewActivity] = useState('');

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const addActivity = () => {
    if (newActivity.trim()) {
      const newId = Math.max(...activities.map(a => a.id)) + 1;
      setActivities([...activities, {
        id: newId,
        name: newActivity,
        category: 'neutral',
        totalTime: 0
      }]);
      setNewActivity('');
    }
  };

  const deleteActivity = (id: number) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const toggleCategory = (id: number) => {
    setActivities(activities.map(activity => {
      if (activity.id === id) {
        const categories = ['productive', 'unproductive', 'neutral'];
        const currentIndex = categories.indexOf(activity.category);
        const nextIndex = (currentIndex + 1) % categories.length;
        return { ...activity, category: categories[nextIndex] };
      }
      return activity;
    }));
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle>
          {showManagement ? 'Manage Activities' : 'Today\'s Activities'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showManagement && (
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add new activity..."
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addActivity()}
            />
            <Button onClick={addActivity} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="space-y-3">
          {activities
            .sort((a, b) => b.totalTime - a.totalTime)
            .slice(0, showManagement ? undefined : 8)
            .map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium">{activity.name}</div>
                    <div className="text-sm text-gray-500">
                      {formatDuration(activity.totalTime)} today
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge
                    variant={activity.category === 'productive' ? 'default' : 
                            activity.category === 'unproductive' ? 'destructive' : 'secondary'}
                    className={showManagement ? 'cursor-pointer' : ''}
                    onClick={showManagement ? () => toggleCategory(activity.id) : undefined}
                  >
                    {activity.category}
                  </Badge>
                  
                  {showManagement && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteActivity(activity.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
        </div>

        {!showManagement && activities.length > 8 && (
          <div className="text-center mt-4">
            <Button variant="outline">View All Activities</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityList;
