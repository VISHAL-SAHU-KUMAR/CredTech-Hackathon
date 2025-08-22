import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const RiskCategoryChart = ({ data }) => {
  const COLORS = {
    'Low': '#059669',      // success
    'Medium': '#D97706',   // warning  
    'High': '#DC2626',     // error
    'Critical': '#7C2D12'  // darker red
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground">
            {data?.name} Risk
          </p>
          <p className="text-sm text-muted-foreground">
            Count: {data?.value}
          </p>
          <p className="text-sm text-muted-foreground">
            Percentage: {((data?.value / data?.payload?.total) * 100)?.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry?.color }}
            ></div>
            <span className="text-sm text-muted-foreground">
              {entry?.value} ({entry?.payload?.value})
            </span>
          </div>
        ))}
      </div>
    );
  };

  const total = data?.reduce((sum, item) => sum + item?.value, 0);
  const dataWithTotal = data?.map(item => ({ ...item, total }));

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Risk Category Breakdown</h3>
        <div className="text-sm text-muted-foreground">
          Total Entities: {total}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithTotal}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {dataWithTotal?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[entry?.name]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskCategoryChart;