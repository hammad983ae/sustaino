/**
 * ============================================================================
 * SAM VIDEO STREAMING PLATFORM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Advanced Video Streaming Platform with Live ESG Content
 * Patent Pending: AU2025001400 - Real-time Video ESG Analytics
 * ============================================================================
 */
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  Download,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Users,
  Eye,
  Clock,
  Calendar,
  Zap,
  Video,
  Radio,
  Film,
  Monitor,
  Wifi,
  Camera,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff
} from 'lucide-react';

interface VideoStreamingPlatformProps {
  className?: string;
}

const VideoStreamingPlatform: React.FC<VideoStreamingPlatformProps> = ({ className }) => {
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(1247);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock streaming content
  const liveStreams = [
    {
      id: 'live-1',
      title: 'ESG Property Assessment - Live Demo',
      presenter: 'Dr. Sarah Chen',
      viewers: 2450,
      duration: '45:23',
      thumbnail: '/placeholder-video-thumb.jpg',
      isLive: true,
      category: 'ESG Assessment'
    },
    {
      id: 'live-2',
      title: 'Crypto Trading Strategies for Sustainability',
      presenter: 'Mark Rodriguez',
      viewers: 1890,
      duration: '32:15',
      thumbnail: '/placeholder-video-thumb.jpg',
      isLive: true,
      category: 'Crypto Trading'
    },
    {
      id: 'live-3',
      title: 'SAM Platform Tutorial - Getting Started',
      presenter: 'Jennifer Kim',
      viewers: 987,
      duration: '28:45',
      thumbnail: '/placeholder-video-thumb.jpg',
      isLive: true,
      category: 'Tutorial'
    }
  ];

  const vodContent = [
    {
      id: 'vod-1',
      title: 'Complete ESG Assessment Masterclass',
      presenter: 'Prof. Michael Green',
      views: 45600,
      duration: '2:15:30',
      thumbnail: '/placeholder-video-thumb.jpg',
      uploadDate: '2025-01-10',
      category: 'Education',
      rating: 4.8
    },
    {
      id: 'vod-2',
      title: 'AI Forecasting Deep Dive',
      presenter: 'Dr. Lisa Wang',
      views: 32100,
      duration: '1:45:20',
      thumbnail: '/placeholder-video-thumb.jpg',
      uploadDate: '2025-01-08',
      category: 'AI Technology',
      rating: 4.9
    },
    {
      id: 'vod-3',
      title: 'Property Valuation Best Practices',
      presenter: 'Robert Taylor',
      views: 28900,
      duration: '1:32:15',
      thumbnail: '/placeholder-video-thumb.jpg',
      uploadDate: '2025-01-05',
      category: 'Valuation',
      rating: 4.7
    }
  ];

  const webinarSchedule = [
    {
      id: 'webinar-1',
      title: 'Future of ESG in Real Estate',
      presenter: 'Industry Panel',
      scheduledTime: '2025-01-20 14:00',
      registrations: 1450,
      category: 'Panel Discussion'
    },
    {
      id: 'webinar-2',
      title: 'Advanced SAM Platform Features',
      presenter: 'Development Team',
      scheduledTime: '2025-01-22 16:00',
      registrations: 890,
      category: 'Product Demo'
    }
  ];

  useEffect(() => {
    // Simulate live viewer count updates
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const sendChatMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Platform Header */}
      <Card className="bg-gradient-to-r from-red-50 to-purple-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Video className="h-8 w-8 text-red-600" />
            SAM Streaming Platform
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              <Radio className="h-3 w-3 mr-1" />
              LIVE
            </Badge>
          </CardTitle>
          <CardDescription>
            Live streaming platform for ESG education, crypto trading insights, and SAM tutorials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-red-100 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{viewers.toLocaleString()}</div>
              <div className="text-sm text-red-700">Live Viewers</div>
            </div>
            <div className="text-center p-3 bg-purple-100 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4K</div>
              <div className="text-sm text-purple-700">Streaming Quality</div>
            </div>
            <div className="text-center p-3 bg-blue-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-blue-700">Available</div>
            </div>
            <div className="text-center p-3 bg-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-600">Global</div>
              <div className="text-sm text-green-700">Coverage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Streaming Interface */}
      <Tabs defaultValue="live" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-background/50 backdrop-blur-sm">
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Radio className="h-4 w-4" />
            Live Streams
          </TabsTrigger>
          <TabsTrigger value="vod" className="flex items-center gap-2">
            <Film className="h-4 w-4" />
            Video Library
          </TabsTrigger>
          <TabsTrigger value="webinars" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Scheduled Events
          </TabsTrigger>
          <TabsTrigger value="broadcast" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Go Live
          </TabsTrigger>
        </TabsList>

        {/* Live Streams Tab */}
        <TabsContent value="live" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Video Player */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Featured Live Stream</span>
                  <Badge className="bg-red-500 text-white animate-pulse">
                    <Radio className="h-3 w-3 mr-1" />
                    LIVE
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                  {/* Video Element Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
                    <div className="text-center text-white">
                      <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <h3 className="text-xl font-semibold">ESG Property Assessment - Live Demo</h3>
                      <p className="text-sm opacity-80">Click to join live stream</p>
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <Button size="sm" variant="ghost" onClick={handlePlayPause}>
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={toggleMute}>
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </Button>
                        <div className="flex items-center gap-2">
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={volume}
                            onChange={(e) => handleVolumeChange(Number(e.target.value))}
                            className="w-20"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Live Indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">LIVE</span>
                    <span className="text-white text-sm">{viewers.toLocaleString()} viewers</span>
                  </div>
                </div>

                {/* Video Info */}
                <div className="mt-4 space-y-3">
                  <h3 className="text-lg font-semibold">ESG Property Assessment - Live Demo</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button size="sm" variant="outline">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        245
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Started 45 minutes ago
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Chat */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Live Chat
                  <Badge variant="secondary">{viewers.toLocaleString()} viewers</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Chat Messages */}
                  <div className="h-64 border rounded-lg p-3 overflow-y-auto bg-gray-50">
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium text-blue-600">Sarah_ESG</span>
                        <span className="text-muted-foreground mx-2">2m ago</span>
                        <div>This assessment framework is amazing! 🌱</div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-green-600">PropExpert</span>
                        <span className="text-muted-foreground mx-2">3m ago</span>
                        <div>How does this integrate with existing valuation tools?</div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-purple-600">Moderator</span>
                        <span className="text-muted-foreground mx-2">5m ago</span>
                        <div>Welcome to the live demo! Questions in chat please 👋</div>
                      </div>
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className="text-sm">
                          <span className="font-medium text-blue-600">{msg.user}</span>
                          <span className="text-muted-foreground mx-2">{msg.timestamp}</span>
                          <div>{msg.message}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    />
                    <Button onClick={sendChatMessage}>Send</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Other Live Streams */}
          <Card>
            <CardHeader>
              <CardTitle>Other Live Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {liveStreams.map((stream) => (
                  <div key={stream.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-3 relative">
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        LIVE
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {stream.duration}
                      </div>
                    </div>
                    <h4 className="font-medium mb-1">{stream.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{stream.presenter}</p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="outline">{stream.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {stream.viewers.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Video Library Tab */}
        <TabsContent value="vod" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Video Library</CardTitle>
              <CardDescription>
                On-demand educational content and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vodContent.map((video) => (
                  <div key={video.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-3 relative">
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        ★ {video.rating}
                      </div>
                    </div>
                    <h4 className="font-medium mb-1">{video.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{video.presenter}</p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="outline">{video.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {video.views.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {video.uploadDate}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webinars Tab */}
        <TabsContent value="webinars" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Webinars</CardTitle>
              <CardDescription>
                Register for live educational sessions and Q&A
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webinarSchedule.map((webinar) => (
                  <div key={webinar.id} className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{webinar.title}</h4>
                      <p className="text-sm text-muted-foreground">{webinar.presenter}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4" />
                          {webinar.scheduledTime}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-4 w-4" />
                          {webinar.registrations} registered
                        </div>
                        <Badge variant="outline">{webinar.category}</Badge>
                      </div>
                    </div>
                    <Button>Register</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Broadcast Tab */}
        <TabsContent value="broadcast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Go Live - Broadcast Studio
              </CardTitle>
              <CardDescription>
                Start your own live stream to share knowledge and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Broadcast Setup */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Stream Title</label>
                    <Input placeholder="Enter your stream title..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>ESG Assessment</option>
                      <option>Crypto Trading</option>
                      <option>Property Valuation</option>
                      <option>Tutorial</option>
                      <option>Q&A Session</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea 
                      className="w-full p-2 border rounded-lg h-20" 
                      placeholder="Describe what you'll be covering..."
                    />
                  </div>
                  
                  {/* Broadcast Controls */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Camera
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mic className="h-4 w-4 mr-2" />
                      Microphone
                    </Button>
                    <Button variant="outline" size="sm">
                      <Monitor className="h-4 w-4 mr-2" />
                      Share Display
                    </Button>
                  </div>

                  <Button className="w-full" size="lg">
                    <Radio className="h-5 w-5 mr-2" />
                    Start Live Stream
                  </Button>
                </div>

                {/* Preview */}
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Camera className="h-12 w-12 mx-auto mb-2" />
                      <p>Camera Preview</p>
                      <p className="text-sm">Click camera button to enable</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Stream Quality</span>
                      <Badge variant="secondary">1080p 60fps</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Connection</span>
                      <div className="flex items-center gap-1">
                        <Wifi className="h-4 w-4 text-green-500" />
                        <span>Excellent</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Estimated Viewers</span>
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VideoStreamingPlatform;
