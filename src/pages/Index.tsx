
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, Target, Calendar } from 'lucide-react';
import TimeTracker from '@/components/TimeTracker';
import ProductivityChart from '@/components/ProductivityChart';
import ActivityList from '@/components/ActivityList';
import WeeklyReport from '@/components/WeeklyReport';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for demonstration
  const todayStats = {
    totalTime: 6.5,
    productiveTime: 4.2,
    productivityScore: 65
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Web Savvy Tracker
          </h1>
          <p className="text-gray-600">
            Track your time and boost your productivity
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'tracker', label: 'Time Tracker', icon: Clock },
            { id: 'activities', label: 'Activities', icon: Target },
            { id: 'reports', label: 'Weekly Report', icon: Calendar }
          ].map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? 'default' : 'outline'}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>

        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Time Today</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.totalTime}h</div>
                  <p className="text-xs text-muted-foreground">+2.1h from yesterday</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Productive Time</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.productiveTime}h</div>
                  <p className="text-xs text-muted-foreground">64% of total time</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Productivity Score</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.productivityScore}%</div>
                  <Badge variant={todayStats.productivityScore >= 70 ? 'default' : 'secondary'}>
                    {todayStats.productivityScore >= 70 ? 'Good' : 'Needs Improvement'}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProductivityChart />
              <ActivityList />
            </div>
          </div>
        )}

        {/* Time Tracker */}
        {activeTab === 'tracker' && <TimeTracker />}

        {/* Activities */}
        {activeTab === 'activities' && <ActivityList showManagement />}

        {/* Weekly Report */}
        {activeTab === 'reports' && <WeeklyReport />}
      </div>
    </div>
  );
};

export default Index;
