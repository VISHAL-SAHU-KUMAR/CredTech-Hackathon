import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RetrainingProgress = () => {
  const [currentJob, setCurrentJob] = useState(null);
  const [jobHistory, setJobHistory] = useState([]);
  const [isRetraining, setIsRetraining] = useState(false);

  const retrainingJobs = [
    {
      id: 'job-001',
      name: 'Quarterly Model Update',
      status: 'completed',
      progress: 100,
      startTime: new Date('2025-08-20T09:00:00Z'),
      endTime: new Date('2025-08-20T11:30:00Z'),
      duration: '2h 30m',
      accuracy: 94.2,
      improvement: '+0.4%',
      dataSize: '2.5M records',
      features: 45,
      algorithm: 'XGBoost Enhanced'
    },
    {
      id: 'job-002',
      name: 'Feature Engineering Update',
      status: 'running',
      progress: 67,
      startTime: new Date('2025-08-22T14:15:00Z'),
      estimatedEnd: new Date('2025-08-22T16:45:00Z'),
      duration: '1h 20m elapsed',
      dataSize: '1.8M records',
      features: 52,
      algorithm: 'Random Forest + Neural Net',
      currentStage: 'Model Training'
    },
    {
      id: 'job-003',
      name: 'Emergency Drift Correction',
      status: 'failed',
      progress: 45,
      startTime: new Date('2025-08-21T16:00:00Z'),
      endTime: new Date('2025-08-21T16:45:00Z'),
      duration: '45m',
      error: 'Insufficient training data quality',
      dataSize: '800K records',
      features: 38,
      algorithm: 'Gradient Boosting'
    }
  ];

  const trainingMetrics = [
    { epoch: 1, loss: 0.45, accuracy: 87.2, val_loss: 0.48, val_accuracy: 86.8 },
    { epoch: 2, loss: 0.38, accuracy: 89.1, val_loss: 0.41, val_accuracy: 88.5 },
    { epoch: 3, loss: 0.32, accuracy: 90.8, val_loss: 0.36, val_accuracy: 90.2 },
    { epoch: 4, loss: 0.28, accuracy: 92.1, val_loss: 0.31, val_accuracy: 91.7 },
    { epoch: 5, loss: 0.25, accuracy: 93.2, val_loss: 0.28, val_accuracy: 92.8 },
    { epoch: 6, loss: 0.22, accuracy: 93.9, val_loss: 0.26, val_accuracy: 93.4 },
    { epoch: 7, loss: 0.20, accuracy: 94.2, val_loss: 0.24, val_accuracy: 93.8 }
  ];

  const resourceUsage = [
    { time: '14:15', cpu: 85, memory: 78, gpu: 92, disk: 45 },
    { time: '14:30', cpu: 88, memory: 82, gpu: 94, disk: 48 },
    { time: '14:45', cpu: 86, memory: 80, gpu: 93, disk: 52 },
    { time: '15:00', cpu: 89, memory: 84, gpu: 95, disk: 55 },
    { time: '15:15', cpu: 87, memory: 81, gpu: 94, disk: 58 },
    { time: '15:30', cpu: 90, memory: 85, gpu: 96, disk: 61 },
    { time: '15:44', cpu: 88, memory: 83, gpu: 95, disk: 59 }
  ];

  const scheduledJobs = [
    {
      id: 'scheduled-001',
      name: 'Monthly Performance Review',
      scheduledFor: new Date('2025-09-01T02:00:00Z'),
      frequency: 'Monthly',
      autoTrigger: true,
      conditions: ['Accuracy < 93%', 'Data drift > 0.15']
    },
    {
      id: 'scheduled-002',
      name: 'Weekly Data Refresh',
      scheduledFor: new Date('2025-08-29T01:00:00Z'),
      frequency: 'Weekly',
      autoTrigger: true,
      conditions: ['New data available', 'Feature importance change']
    }
  ];

  useEffect(() => {
    const runningJob = retrainingJobs?.find(job => job?.status === 'running');
    setCurrentJob(runningJob);
    setIsRetraining(!!runningJob);
    setJobHistory(retrainingJobs?.filter(job => job?.status !== 'running'));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'running': return 'text-accent bg-accent/10';
      case 'failed': return 'text-error bg-error/10';
      case 'scheduled': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'running': return 'Play';
      case 'failed': return 'XCircle';
      case 'scheduled': return 'Clock';
      default: return 'Circle';
    }
  };

  const formatDuration = (start, end) => {
    if (!end) return 'In progress';
    const diff = new Date(end) - new Date(start);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatScheduledTime = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStartRetraining = () => {
    console.log('Starting new retraining job');
    setIsRetraining(true);
  };

  const handleStopRetraining = () => {
    console.log('Stopping current retraining job');
    setIsRetraining(false);
  };

  return (
    <div className="space-y-6">
      {/* Current Job Status */}
      {currentJob && (
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Play" size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Active Retraining Job</h3>
                <p className="text-sm text-muted-foreground">{currentJob?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Pause">
                Pause
              </Button>
              <Button variant="destructive" size="sm" iconName="Square" onClick={handleStopRetraining}>
                Stop
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-card-foreground">Overall Progress</span>
                  <span className="text-sm font-medium text-card-foreground">{currentJob?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${currentJob?.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Started</p>
                  <p className="font-medium text-card-foreground">
                    {new Date(currentJob.startTime)?.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">ETA</p>
                  <p className="font-medium text-card-foreground">
                    {new Date(currentJob.estimatedEnd)?.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Stage</span>
                <span className="text-sm font-medium text-accent">{currentJob?.currentStage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Data Size</span>
                <span className="text-sm font-medium text-card-foreground">{currentJob?.dataSize}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Features</span>
                <span className="text-sm font-medium text-card-foreground">{currentJob?.features}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Algorithm</span>
                <span className="text-sm font-medium text-card-foreground">{currentJob?.algorithm}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-card-foreground">Resource Usage</h4>
              {['CPU', 'Memory', 'GPU', 'Disk']?.map((resource, index) => {
                const usage = [88, 83, 95, 59]?.[index];
                return (
                  <div key={resource} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{resource}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            usage > 90 ? 'bg-error' : usage > 70 ? 'bg-warning' : 'bg-success'
                          }`}
                          style={{ width: `${usage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-card-foreground w-8">{usage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Training Metrics Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trainingMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="epoch" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  formatter={(value, name) => [
                    typeof value === 'number' ? value?.toFixed(3) : value, 
                    name?.replace('_', ' ')?.toUpperCase()
                  ]}
                  labelStyle={{ color: '#0F172A' }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#059669"
                  strokeWidth={2}
                  name="Training Accuracy"
                  dot={{ fill: '#059669', strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="val_accuracy"
                  stroke="#0EA5E9"
                  strokeWidth={2}
                  name="Validation Accuracy"
                  dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="loss"
                  stroke="#D97706"
                  strokeWidth={2}
                  name="Training Loss"
                  dot={{ fill: '#D97706', strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="val_loss"
                  stroke="#DC2626"
                  strokeWidth={2}
                  name="Validation Loss"
                  dot={{ fill: '#DC2626', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {/* Job History and Scheduling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job History */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Retraining History</h3>
              <p className="text-sm text-muted-foreground">Recent training jobs</p>
            </div>
            {!isRetraining && (
              <Button variant="default" size="sm" iconName="Play" onClick={handleStartRetraining}>
                Start New Job
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {jobHistory?.map((job) => (
              <div key={job?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg ${getStatusColor(job?.status)?.split(' ')?.[1]} flex items-center justify-center`}>
                      <Icon name={getStatusIcon(job?.status)} size={16} className={getStatusColor(job?.status)?.split(' ')?.[0]} />
                    </div>
                    <div>
                      <h4 className="font-medium text-card-foreground">{job?.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(job.startTime)?.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job?.status)}`}>
                    {job?.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium text-card-foreground">{job?.duration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Data Size</p>
                    <p className="font-medium text-card-foreground">{job?.dataSize}</p>
                  </div>
                  {job?.status === 'completed' && (
                    <>
                      <div>
                        <p className="text-muted-foreground">Final Accuracy</p>
                        <p className="font-medium text-success">{job?.accuracy}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Improvement</p>
                        <p className="font-medium text-success">{job?.improvement}</p>
                      </div>
                    </>
                  )}
                  {job?.status === 'failed' && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Error</p>
                      <p className="text-sm text-error">{job?.error}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Jobs */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Scheduled Retraining</h3>
              <p className="text-sm text-muted-foreground">Automated job scheduling</p>
            </div>
            <Button variant="outline" size="sm" iconName="Plus">
              Add Schedule
            </Button>
          </div>

          <div className="space-y-4">
            {scheduledJobs?.map((job) => (
              <div key={job?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Icon name="Clock" size={16} className="text-warning" />
                    </div>
                    <div>
                      <h4 className="font-medium text-card-foreground">{job?.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        Next run: {formatScheduledTime(job?.scheduledFor)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job?.autoTrigger ? 'text-success bg-success/10' : 'text-muted-foreground bg-muted'
                    }`}>
                      {job?.autoTrigger ? 'Auto' : 'Manual'}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Frequency</span>
                    <span className="font-medium text-card-foreground">{job?.frequency}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Trigger Conditions:</p>
                    <div className="space-y-1">
                      {job?.conditions?.map((condition, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="Check" size={12} className="text-success" />
                          <span className="text-xs text-muted-foreground">{condition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetrainingProgress;