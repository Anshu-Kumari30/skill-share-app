import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Users, Calendar, MapPin, Clock, MessageCircle } from 'lucide-react';

const StudyGroupsPage = () => {
  const [studyGroups, setStudyGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);

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
    },
    {
      id: 4,
      name: 'Digital Marketing Bootcamp',
      description: 'Learn and practice digital marketing strategies with real-world case studies.',
      subject: 'Marketing',
      members: 10,
      maxMembers: 15,
      nextSession: '2025-06-29T19:00:00',
      location: 'Online',
      frequency: 'Weekly',
      difficulty: 'Intermediate',
      tags: ['Digital Marketing', 'SEO', 'Social Media'],
      organizer: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isJoined: true,
      lastActivity: '5 hours ago'
    },
    {
      id: 5,
      name: 'AI Ethics Discussion',
      description: 'Weekly discussions on ethical implications of artificial intelligence and technology.',
      subject: 'Philosophy',
      members: 6,
      maxMembers: 10,
      nextSession: '2025-07-02T17:00:00',
      location: 'Philosophy Department Lounge',
      frequency: 'Weekly',
      difficulty: 'Advanced',
      tags: ['AI Ethics', 'Philosophy', 'Technology'],
      organizer: 'Prof. Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
      isJoined: false,
      lastActivity: '1 hour ago'
    }
  ];

  const filters = ['all', 'joined', 'available', 'online', 'in-person'];
  const subjects = ['all', 'Programming', 'Data Science', 'Design', 'Marketing', 'Philosophy'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudyGroups(mockStudyGroups);
      setLoading(false);
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

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const StudyGroupCard = ({ group }) => {
    const nextSession = formatDateTime(group.nextSession);
    const isNearCapacity = group.members >= group.maxMembers * 0.8;
    
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

        <div className="flex items-center gap-2 mb-4">
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
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MessageCircle className="w-4 h-4" />
            <span>Active {group.lastActivity}</span>
          </div>
          
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              View Details
            </button>
            {group.isJoined ? (
              <button className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm">
                Leave Group
              </button>
            ) : (
              <button 
                className={`px-3 py-1 rounded-lg transition-colors text-sm ${
                  group.members >= group.maxMembers
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
                disabled={group.members >= group.maxMembers}
              >
                {group.members >= group.maxMembers ? 'Full' : 'Join Group'}
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
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
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
    </div>
  );
};

export default StudyGroupsPage;