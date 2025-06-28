import React, { useState } from 'react';
import { Clock, Star, BookOpen, Users, Calendar, Video } from 'lucide-react';

const Dashboard = () => {
  const [user] = useState({
    name: 'Alex Johnson',
    avatar: '👨‍💻',
    skillsOffered: ['React', 'Python', 'UI Design'],
    skillsWanted: ['Machine Learning', 'Spanish', 'Photography'],
    rating: 4.8,
    sessions: 23
  });

  const [upcomingSessions] = useState([
    {
      id: 1,
      title: 'Python Data Analysis',
      time: 'Today 3:00 PM',
      instructor: 'Mike Davis',
      type: 'attending'
    },
    {
      id: 2,
      title: 'React Components Workshop',
      time: 'Tomorrow 11:00 AM',
      instructor: 'You',
      type: 'teaching'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}! {user.avatar}</h2>
        <p className="text-blue-100">Ready to learn something new or share your knowledge?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sessions Completed</p>
              <p className="text-2xl font-bold text-gray-900">{user.sessions}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">{user.rating}</p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Skills Offered</p>
              <p className="text-2xl font-bold text-gray-900">{user.skillsOffered.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Learning Goals</p>
              <p className="text-2xl font-bold text-gray-900">{user.skillsWanted.length}</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-500" />
          Upcoming Sessions
        </h3>
        <div className="space-y-3">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{session.title}</h4>
                <p className="text-sm text-gray-600">{session.time} • {session.instructor}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  session.type === 'teaching' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {session.type}
                </span>
                <button className="text-blue-600 hover:text-blue-800">
                  <Video className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 text-green-700">Skills I Offer</h3>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
          <button className="mt-3 text-green-600 hover:text-green-800 text-sm font-medium">
            + Add more skills
          </button>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 text-purple-700">Skills I Want to Learn</h3>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
          <button className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-medium">
            + Add learning goals
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;