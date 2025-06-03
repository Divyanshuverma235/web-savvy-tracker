
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, Award } from 'lucide-react';

const WeeklyReport = () => {
  const weeklyStats = {
    totalHours: 42.5,
    productiveHours: 28.3,
    productivityScore: 67,
    improvementFromLastWeek: 8,
    topProductiveDay: 'Wednesday',
    goals: {
      dailyTarget: 6,
      achieved: 4,
      percentage: 67
    }
  };

  const insights = [
    {
      type: 'positive',
      title: 'Great Progress!',
      description: 'You spent 15% more time on coding this week compared to last week.',
      icon: TrendingUp
    },
    {
      type: 'warning',
      title: 'Weekend Focus',
      description: 'Consider reducing social media time on weekends to boost overall productivity.',
      icon: Target
    },
    {
      type: 'achievement',
      title: 'Consistency Win',
      description: 'You maintained a steady work rhythm throughout the week.',
      icon: Award
    }
  ];

  const topActivities = [
    { name: 'React Development', hours: 12.5, category: 'productive' },
    { name: 'Code Review', hours: 8.2, category: 'productive' },
    { name: 'Research', hours: 6.1, category: 'productive' },
    { name: 'Meetings', hours: 4.8, category: 'neutral' },
    { name: 'Social Media', hours: 3.2, category: 'unproductive' }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{weeklyStats.totalHours}h</div>
            <div className="text-sm text-gray-600">Total Time</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{weeklyStats.productiveHours}h</div>
            <div className="text-sm text-gray-600">Productive Time</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{weeklyStats.productivityScore}%</div>
            <div className="text-sm text-gray-600">Productivity Score</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">+{weeklyStats.improvementFromLastWeek}%</div>
            <div className="text-sm text-gray-600">vs Last Week</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goals Progress */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Weekly Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Daily 6-hour target</span>
                <span className="text-sm text-gray-600">
                  {weeklyStats.goals.achieved}/7 days
                </span>
              </div>
              <Progress value={weeklyStats.goals.percentage} className="h-2" />
              <div className="text-xs text-gray-500 mt-1">
                {weeklyStats.goals.percentage}% of weekly goal achieved
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm font-medium mb-2">Best Performance</div>
              <div className="text-lg font-bold text-green-600">
                {weeklyStats.topProductiveDay}
              </div>
              <div className="text-sm text-gray-600">Most productive day</div>
            </div>
          </CardContent>
        </Card>

        {/* Top Activities */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Top Activities This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded text-white text-sm flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{activity.name}</div>
                      <div className="text-sm text-gray-500">{activity.hours}h</div>
                    </div>
                  </div>
                  <Badge variant={
                    activity.category === 'productive' ? 'default' : 
                    activity.category === 'unproductive' ? 'destructive' : 'secondary'
                  }>
                    {activity.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Weekly Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div key={index} className="p-4 bg-white/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      insight.type === 'positive' ? 'bg-green-100 text-green-600' :
                      insight.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{insight.title}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {insight.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyReport;
