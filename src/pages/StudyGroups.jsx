import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Users, Calendar, MapPin, Clock, MessageCircle, X, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StudyGroupsPage = () => {
  const { user } = useAuth();
  const [studyGroups, setStudyGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState({});
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    subject: 'Programming',
    maxMembers: 15,
    location: 'Online',
    frequency: 'Weekly',
    difficulty: 'Beginner',
    tags: '',
    nextSession: ''
  });

  // Mock data for study groups
  const mockStudyGroups = [
    {
      id: 1,
      name: 'React Mastery Group',
      description: 'Weekly sessions to master React.js concepts and build projects together.',
      subject: 'Programming',
      members: 12,
      maxMembers: 15,
      nextSession: '2025-06-30T18:00:00',
      location: 'Online',
      frequency: 'Weekly',
      difficulty: 'Intermediate',
      tags: ['React', 'JavaScript', 'Frontend'],
      organizer: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isJoined: false,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Data Science Study Circle',
      description: 'Collaborative learning for data science concepts, statistics, and machine learning.',
      subject: 'Data Science',
      members: 8,
      maxMembers: 12,
      nextSession: '2025-06-28T16:00:00',
      location: 'Central Library, Room 204',
      frequency: 'Bi-weekly',
      difficulty: 'Advanced',
      tags: ['Python', 'Statistics', 'ML', 'Data Analysis'],
      organizer: 'Dr. Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isJoined: true,
      lastActivity: '1 day ago'
    },
    {
      id: 3,
      name: 'UX Design Workshop',
      description: 'Practice UX design principles through hands-on projects and peer feedback.',
      subject: 'Design',
      members: 15,
      maxMembers: 20,
      nextSession: '2025-07-01T14:00:00',
      location: 'Design Studio, Building A',
      frequency: 'Weekly',
      difficulty: 'Beginner',
      tags: ['UX', 'Design Thinking', 'Prototyping'],
      organizer: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      isJoined: false,
      lastActivity: '3 hours ago'
    }
  ];

  const filters = ['all', 'joined', 'available', 'online', 'in-person'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudyGroups(mockStudyGroups);
      setLoading(false);
      
      // Initialize chat messages for each group
      const initialMessages = {};
      mockStudyGroups.forEach(group => {
        initialMessages[group.id] = [
          { id: 1, sender: 'System', message: `Welcome to ${group.name}!`, time: new Date().toISOString() }
        ];
      });
      setChatMessages(initialMessages);
    }, 1000);
  }, []);

  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    switch (selectedFilter) {
      case 'joined':
        matchesFilter = group.isJoined;
        break;
      case 'available':
        matchesFilter = group.members < group.maxMembers;
        break;
      case 'online':
        matchesFilter = group.location === 'Online';
        break;
      case 'in-person':
        matchesFilter = group.location !== 'Online';
        break;
      default:
        matchesFilter = true;
    }
    
    return matchesSearch && matchesFilter;
  });

  const handleJoinLeaveGroup = (groupId) => {
    setStudyGroups(prevGroups =>
      prevGroups.map(group => {
        if (group.id === groupId) {
          const isCurrentlyJoined = group.isJoined;
          return {
            ...group,
            isJoined: !isCurrentlyJoined,
            members: isCurrentlyJoined ? group.members - 1 : group.members + 1
          };
        }
        return group;
      })
    );
  };

  const handleOpenChat = (group) => {
    if (!group.isJoined) {
      alert('Please join the group first to access the chat');
      return;
    }
    setSelectedGroup(group);
    setShowChatModal(true);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !selectedGroup) return;

    const newMessage = {
      id: (chatMessages[selectedGroup.id]?.length || 0) + 1,
      sender: user?.name || 'You',
      message: chatMessage,
      time: new Date().toISOString()
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedGroup.id]: [...(prev[selectedGroup.id] || []), newMessage]
    }));

    setChatMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateGroup = () => {
    if (!newGroup.name || !newGroup.description || !newGroup.nextSession) {
      alert('Please fill in all required fields');
      return;
    }

    const group = {
      id: studyGroups.length + 1,
      name: newGroup.name,
      description: newGroup.description,
      subject: newGroup.subject,
      members: 1,
      maxMembers: parseInt(newGroup.maxMembers),
      nextSession: newGroup.nextSession,
      location: newGroup.location,
      frequency: newGroup.frequency,
      difficulty: newGroup.difficulty,
      tags: newGroup.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      organizer: user?.name || 'You',
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isJoined: true,
      lastActivity: 'Just now'
    };

    setStudyGroups([group, ...studyGroups]);
    
    // Initialize chat for new group
    setChatMessages(prev => ({
      ...prev,
      [group.id]: [
        { id: 1, sender: 'System', message: `Welcome to ${group.name}!`, time: new Date().toISOString() }
      ]
    }));

    setShowCreateModal(false);
    setNewGroup({
      name: '',
      description: '',
      subject: 'Programming',
      maxMembers: 15,
      location: 'Online',
      frequency: 'Weekly',
      difficulty: 'Beginner',
      tags: '',
      nextSession: ''
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const formatMessageTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const StudyGroupCard = ({ group }) => {
    const nextSession = formatDateTime(group.nextSession);
    const isNearCapacity = group.members >= group.maxMembers * 0.8;
    const isFull = group.members >= group.maxMembers;
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={group.avatar}
              alt={group.organizer}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
              <p className="text-sm text-gray-600">by {group.organizer}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {group.isJoined && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Joined
              </span>
            )}
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              {group.difficulty}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{group.description}</p>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {group.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span>{group.members}/{group.maxMembers} members</span>
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${isNearCapacity ? 'bg-yellow-500' : 'bg-indigo-500'}`}
                style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Next: {nextSession.day} at {nextSession.time}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{group.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{group.frequency} sessions</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={() => handleOpenChat(group)}
            className={`p-2 rounded-lg transition-colors ${
              group.isJoined
                ? 'text-indigo-600 hover:bg-indigo-50'
                : 'text-gray-400 cursor-not-allowed'
            }`}
            disabled={!group.isJoined}
            title={group.isJoined ? 'Open chat' : 'Join group to chat'}
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            {group.isJoined ? (
              <button
                onClick={() => handleJoinLeaveGroup(group.id)}
                className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
              >
                Leave Group
              </button>
            ) : (
              <button 
                onClick={() => handleJoinLeaveGroup(group.id)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  isFull
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
                disabled={isFull}
              >
                {isFull ? 'Full' : 'Join Group'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading study groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Study Groups</h1>
              <p className="text-gray-600 mt-1">Join collaborative learning communities</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Group
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search study groups..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              {filters.map(filter => (
                <option key={filter} value={filter}>
                  {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{studyGroups.length}</p>
                <p className="text-sm text-gray-600">Active Groups</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {studyGroups.filter(g => g.isJoined).length}
                </p>
                <p className="text-sm text-gray-600">Joined Groups</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {studyGroups.filter(g => g.location === 'Online').length}
                </p>
                <p className="text-sm text-gray-600">Online Groups</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {studyGroups.filter(g => g.location !== 'Online').length}
                </p>
                <p className="text-sm text-gray-600">In-Person Groups</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredGroups.length} of {studyGroups.length} study groups
          </p>
        </div>

        {/* Study Groups Grid */}
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGroups.map((group) => (
              <StudyGroupCard key={group.id} group={group} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No study groups found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Create New Study Group</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newGroup.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Python Study Circle"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={newGroup.description}
                  onChange={handleInputChange}
                  placeholder="Describe what your study group is about..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={newGroup.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Business">Business</option>
                    <option value="Philosophy">Philosophy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    name="difficulty"
                    value={newGroup.difficulty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={newGroup.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Online or Room 204"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency *
                  </label>
                  <select
                    name="frequency"
                    value={newGroup.frequency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Members *
                  </label>
                  <input
                    type="number"
                    name="maxMembers"
                    value={newGroup.maxMembers}
                    onChange={handleInputChange}
                    min="2"
                    max="50"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Next Session *
                  </label>
                  <input
                    type="datetime-local"
                    name="nextSession"
                    value={newGroup.nextSession}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={newGroup.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., Python, Beginner, Coding"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You will be automatically added as the organizer and first member of this group.
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCreateGroup}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Create Group
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <img
                  src={selectedGroup.avatar}
                  alt={selectedGroup.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{selectedGroup.name}</h3>
                  <p className="text-xs text-gray-500">{selectedGroup.members} members</p>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {(chatMessages[selectedGroup.id] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'System' ? 'justify-center' : msg.sender === (user?.name || 'You') ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'System' ? (
                    <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs">
                      {msg.message}
                    </div>
                  ) : (
                    <div
                      className={`max-w-[70%] ${
                        msg.sender === (user?.name || 'You')
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      } rounded-lg px-4 py-2`}
                    >
                      {msg.sender !== (user?.name || 'You') && (
                        <p className="text-xs font-semibold mb-1 opacity-70">{msg.sender}</p>
                      )}
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === (user?.name || 'You')
                            ? 'text-indigo-200'
                            : 'text-gray-500'
                        }`}
                      >
                        {formatMessageTime(msg.time)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyGroupsPage;