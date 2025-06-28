import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthProvider';

const Reviews = ({ vehId, theme }) => {
  const { user, token } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/cars/${vehId}/reviews`);
        setReviews(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]);
        toast.error('Error fetching reviews');
      }
    };

    fetchReviews();
  }, [vehId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      toast.error('Please provide a rating and a comment.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `http://localhost:4001/cars/${vehId}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviews((prev) => [...prev, res.data.data]);
      setRating(0);
      setComment('');
      toast.success('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Error adding review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/cars/${vehId}/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews((prev) => prev.filter((review) => review._id !== id));
      toast.success('Review deleted successfully!');
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Error deleting review');
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}  p-6 font-inter`}>
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {user ? (
        <form onSubmit={handleSubmit} className={`mb-6 p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="mb-4">
            <label className="block text-l font-medium">Rating:</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-3xl ${star <= rating ? 'text-yellow-500' : 'text-gray-500'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className={`w-full border p-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
            rows="3"
          />
          <button
            type="submit"
            className={`mt-4 ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-400 hover:bg-blue-300'} text-white py-2 px-4 rounded`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-400">Please log in to leave a review.</p>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <div key={review._id} className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="flex items-center mb-2">
                <img
                  src={review.profileImage || 'default-profile.png'}
                  alt={review.username}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-bold text-lg">{review.username}</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-3xl ${star <= review.rating ? 'text-yellow-500' : 'text-gray-500'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{review.comment}</p>
              <br />
              {review.user === user?._id && (
                <Button variant="contained" color="error" onClick={() => handleDelete(review._id)}>
                  Delete
                </Button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No reviews yet. Be the first to leave one!</p>
      )}
    </div>
  );
};

export default Reviews;
