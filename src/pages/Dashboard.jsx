import React, { useState } from 'react';
import { Clock, Star, BookOpen, Users, Calendar, Video, Plus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  const [skillsOffered, setSkillsOffered] = useState(['React', 'Python', 'UI Design']);
  const [skillsWanted, setSkillsWanted] = useState(['Machine Learning', 'Spanish', 'Photography']);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newGoal, setNewGoal] = useState('');

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

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkillsOffered([...skillsOffered, newSkill.trim()]);
      setNewSkill('');
      setShowAddSkillModal(false);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkillsOffered(skillsOffered.filter(skill => skill !== skillToRemove));
  };

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setSkillsWanted([...skillsWanted, newGoal.trim()]);
      setNewGoal('');
      setShowAddGoalModal(false);
    }
  };

  const handleRemoveGoal = (goalToRemove) => {
    setSkillsWanted(skillsWanted.filter(goal => goal !== goalToRemove));
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name || 'User'}! {user?.avatar || '👨‍💻'}
        </h2>
        <p className="text-blue-100">Ready to learn something new or share your knowledge?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sessions Completed</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Skills Offered</p>
              <p className="text-2xl font-bold text-gray-900">{skillsOffered.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Learning Goals</p>
              <p className="text-2xl font-bold text-gray-900">{skillsWanted.length}</p>
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
        {/* Skills I Offer */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 text-green-700">Skills I Offer</h3>
          <div className="flex flex-wrap gap-2">
            {skillsOffered.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2">
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:bg-green-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <button
            onClick={() => setShowAddSkillModal(true)}
            className="mt-3 text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add more skills
          </button>
        </div>

        {/* Skills I Want to Learn */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 text-purple-700">Skills I Want to Learn</h3>
          <div className="flex flex-wrap gap-2">
            {skillsWanted.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                {skill}
                <button
                  onClick={() => handleRemoveGoal(skill)}
                  className="hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <button
            onClick={() => setShowAddGoalModal(true)}
            className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add learning goals
          </button>
        </div>
      </div>

      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add a New Skill</h3>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              placeholder="e.g., JavaScript, Photography, Guitar"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              autoFocus
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddSkill}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Skill
              </button>
              <button
                onClick={() => {
                  setShowAddSkillModal(false);
                  setNewSkill('');
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add a Learning Goal</h3>
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
              placeholder="e.g., Data Science, French, Digital Marketing"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddGoal}
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Goal
              </button>
              <button
                onClick={() => {
                  setShowAddGoalModal(false);
                  setNewGoal('');
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;