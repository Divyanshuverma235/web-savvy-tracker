
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ProductivityChart = () => {
  const weeklyData = [
    { day: 'Mon', productive: 6, unproductive: 2 },
    { day: 'Tue', productive: 5, unproductive: 3 },
    { day: 'Wed', productive: 7, unproductive: 1 },
    { day: 'Thu', productive: 4, unproductive: 4 },
    { day: 'Fri', productive: 6, unproductive: 2 },
    { day: 'Sat', productive: 3, unproductive: 5 },
    { day: 'Sun', productive: 2, unproductive: 6 }
  ];

  const categoryData = [
    { name: 'Development', value: 45, color: '#3b82f6' },
    { name: 'Research', value: 25, color: '#10b981' },
    { name: 'Meetings', value: 15, color: '#f59e0b' },
    { name: 'Social Media', value: 10, color: '#ef4444' },
    { name: 'Other', value: 5, color: '#6b7280' }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Weekly Productivity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="productive" fill="#3b82f6" name="Productive" />
              <Bar dataKey="unproductive" fill="#ef4444" name="Unproductive" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Time Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductivityChart;
