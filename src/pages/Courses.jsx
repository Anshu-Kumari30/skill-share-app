import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, BookOpen, Users, Clock, Star, X, Upload, Image as ImageIcon, Video, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CoursesPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: 'Programming',
    duration: '',
    difficulty: 'Beginner',
    tags: '',
    thumbnail: null,
    thumbnailPreview: '',
    videos: []
  });

  // Mock data for courses
  const mockCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      description: 'Master advanced React concepts including hooks, context, and performance optimization.',
      category: 'Programming',
      instructor: 'Sarah Johnson',
      students: 156,
      duration: '8 weeks',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
      tags: ['React', 'JavaScript', 'Frontend'],
      difficulty: 'Advanced',
      price: 'Free'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Learn the basics of data science, statistics, and machine learning with Python.',
      category: 'Data Science',
      instructor: 'Dr. Michael Chen',
      students: 243,
      duration: '12 weeks',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      tags: ['Python', 'Statistics', 'ML'],
      difficulty: 'Beginner',
      price: 'Free'
    },
    {
      id: 3,
      title: 'UX/UI Design Principles',
      description: 'Comprehensive guide to user experience and interface design principles.',
      category: 'Design',
      instructor: 'Emma Rodriguez',
      students: 89,
      duration: '6 weeks',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
      tags: ['UX', 'UI', 'Design'],
      difficulty: 'Intermediate',
      price: 'Free'
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      description: 'Learn modern digital marketing techniques and social media strategies.',
      category: 'Marketing',
      instructor: 'James Wilson',
      students: 198,
      duration: '10 weeks',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      tags: ['Marketing', 'Social Media', 'Strategy'],
      difficulty: 'Beginner',
      price: 'Free'
    }
  ];

  const categories = ['all', 'Programming', 'Data Science', 'Design', 'Marketing', 'Business'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEnrollCourse = (courseId) => {
    if (enrolledCourses.includes(courseId)) {
      setEnrolledCourses(enrolledCourses.filter(id => id !== courseId));
      // Update student count
      setCourses(courses.map(course => 
        course.id === courseId 
          ? { ...course, students: course.students - 1 }
          : course
      ));
    } else {
      setEnrolledCourses([...enrolledCourses, courseId]);
      // Update student count
      setCourses(courses.map(course => 
        course.id === courseId 
          ? { ...course, students: course.students + 1 }
          : course
      ));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Thumbnail size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCourse(prev => ({
          ...prev,
          thumbnail: file,
          thumbnailPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    const validVideos = [];
    
    for (let file of files) {
      // Check file size (20 minutes ~= 200MB for decent quality)
      if (file.size > 200 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 200MB (approximately 20 minutes)`);
        continue;
      }
      
      // Check file type
      if (!file.type.startsWith('video/')) {
        alert(`${file.name} is not a video file`);
        continue;
      }
      
      validVideos.push({
        file: file,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      });
    }
    
    setNewCourse(prev => ({
      ...prev,
      videos: [...prev.videos, ...validVideos]
    }));
  };

  const removeVideo = (index) => {
    setNewCourse(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const handleCreateCourse = () => {
    if (!newCourse.title || !newCourse.description || !newCourse.duration) {
      alert('Please fill in all required fields');
      return;
    }

    const course = {
      id: courses.length + 1,
      title: newCourse.title,
      description: newCourse.description,
      category: newCourse.category,
      instructor: user?.name || 'You',
      students: 0,
      duration: newCourse.duration,
      rating: 0,
      image: newCourse.thumbnailPreview || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      tags: newCourse.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      difficulty: newCourse.difficulty,
      price: 'Free',
      videoCount: newCourse.videos.length
    };

    setCourses([course, ...courses]);
    setShowCreateModal(false);
    setNewCourse({
      title: '',
      description: '',
      category: 'Programming',
      duration: '',
      difficulty: 'Beginner',
      tags: '',
      thumbnail: null,
      thumbnailPreview: '',
      videos: []
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const CourseCard = ({ course }) => {
    const isEnrolled = enrolledCourses.includes(course.id);
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
              {course.difficulty}
            </span>
          </div>
          {course.videoCount && (
            <div className="absolute bottom-4 left-4">
              <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <Video className="w-3 h-3" />
                {course.videoCount} videos
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-indigo-600 font-medium">{course.category}</span>
            <span className="text-sm text-green-600 font-medium">{course.price}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
          
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {course.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{course.students} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
            </div>
            {course.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{course.rating}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">by {course.instructor}</span>
            <button
              onClick={() => handleEnrollCourse(course.id)}
              className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                isEnrolled
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isEnrolled ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Enrolled
                </>
              ) : (
                'Enroll Now'
              )}
            </button>
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
          <p className="mt-4 text-gray-600">Loading courses...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
              <p className="text-gray-600 mt-1">Discover and learn new skills</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Course
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
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                <p className="text-sm text-gray-600">Total Courses</p>
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
                  {courses.reduce((sum, course) => sum + course.students, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Students</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
                <p className="text-sm text-gray-600">Enrolled Courses</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.length > 0 ? Math.round(courses.reduce((sum, course) => sum + parseInt(course.duration), 0) / courses.length) : 0}
                </p>
                <p className="text-sm text-gray-600">Avg Duration (weeks)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Create New Course</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Thumbnail
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-500 transition-colors">
                  {newCourse.thumbnailPreview ? (
                    <div className="relative">
                      <img
                        src={newCourse.thumbnailPreview}
                        alt="Thumbnail preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => setNewCourse(prev => ({ ...prev, thumbnail: null, thumbnailPreview: '' }))}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Click to upload thumbnail</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={newCourse.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Introduction to Python Programming"
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
                  value={newCourse.description}
                  onChange={handleInputChange}
                  placeholder="Describe what students will learn in this course..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={newCourse.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    name="difficulty"
                    value={newCourse.difficulty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={newCourse.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 8 weeks"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={newCourse.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., Python, Beginner, Coding"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Videos (Max 20 min each, 200MB)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                  <label className="cursor-pointer block text-center">
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload videos</p>
                    <p className="text-xs text-gray-500">MP4, AVI, MOV up to 200MB each (~20 minutes)</p>
                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {/* Video List */}
                {newCourse.videos.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded Videos ({newCourse.videos.length}):</p>
                    {newCourse.videos.map((video, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-indigo-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{video.name}</p>
                            <p className="text-xs text-gray-500">{video.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeVideo(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Your course will be created with you ({user?.name}) as the instructor. 
                  Students can enroll once you publish it.
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCreateCourse}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Create Course
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
    </div>
  );
};

export default CoursesPage;