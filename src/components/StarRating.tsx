import { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { CUSTOM_ROUTES } from '@/custom-routes';

interface StarRatingProps {
  serviceId: string;
  serviceName: string;
  villageId?: string;
}

const StarRating = ({ serviceId, serviceName, villageId }: StarRatingProps) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id || null);
    });

    // Get or create session ID for viewing
    let sid = localStorage.getItem('session_id');
    if (!sid) {
      sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('session_id', sid);
    }
    setSessionId(sid);

    // Load ratings
    loadRatings(sid);
  }, [serviceId]);

  const loadRatings = async (sid: string) => {
    try {
      // Get all ratings for this service
      const { data: allRatings, error: allError } = await supabase
        .from('service_ratings')
        .select('rating')
        .eq('service_id', serviceId);

      if (allError) throw allError;

      if (allRatings && allRatings.length > 0) {
        const avg = allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;
        setAverageRating(Number(avg.toFixed(1)));
        setTotalRatings(allRatings.length);
      }

      // Get user's rating
      const { data: userRating, error: userError } = await supabase
        .from('service_ratings')
        .select('rating')
        .eq('service_id', serviceId)
        .eq('session_id', sid)
        .maybeSingle();

      if (userError && userError.code !== 'PGRST116') throw userError;

      if (userRating) {
        setRating(userRating.rating);
      }
    } catch (error) {
      console.error('Error loading ratings:', error);
    }
  };

  const handleRating = async (newRating: number) => {
    if (!userId) {
      toast({
        title: "Authentication Required",
        description: "Please log in to rate this service",
        variant: "destructive",
      });
      navigate(CUSTOM_ROUTES.AUTH);
      return;
    }

    try {
      // Check if user already rated
      const { data: existing } = await supabase
        .from('service_ratings')
        .select('id')
        .eq('service_id', serviceId)
        .eq('session_id', sessionId)
        .maybeSingle();

      if (existing) {
        // Update existing rating
        const { error } = await supabase
          .from('service_ratings')
          .update({ rating: newRating, updated_at: new Date().toISOString() })
          .eq('id', existing.id);

        if (error) throw error;

        toast({
          title: "Rating Updated",
          description: `Your rating for ${serviceName} has been updated to ${newRating} stars.`,
        });
      } else {
        // Insert new rating
        const { error } = await supabase
          .from('service_ratings')
          .insert({
            service_id: serviceId,
            session_id: sessionId,
            rating: newRating,
            village_id: villageId,
          });

        if (error) throw error;

        toast({
          title: "Rating Submitted",
          description: `You rated ${serviceName} ${newRating} stars.`,
        });
      }

      setRating(newRating);
      loadRatings(sessionId);
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                star <= (hoverRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground'
              }`}
            />
          </button>
        ))}
      </div>
      {totalRatings > 0 && (
        <div className="text-sm text-muted-foreground">
          {averageRating} / 5 ({totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'})
        </div>
      )}
      {rating > 0 && (
        <div className="text-xs text-primary">
          You rated: {rating} stars
        </div>
      )}
    </div>
  );
};

export default memo(StarRating);
