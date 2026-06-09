// Frontend API client for the MERN Express + MongoDB backend
// All functions now call the separate Node.js/Express backend

const BACKEND_URL = 
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export type SubmitResult = 
  | { success: true; message: string }
  | { success: false; message: string; errors?: Record<string, string> };

export type SubmitReviewResult =
  | { success: true; message: string }
  | { success: false; message: string; errors?: Record<string, string> };

export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

// ====================== CONTACT ======================
export async function submitContactMessage(formData: FormData): Promise<SubmitResult> {
  try {
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      company: formData.get('company') || '',
    };

    const res = await fetch(`${BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Something went wrong.',
      };
    }

    return {
      success: data.success,
      message: data.message,
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again or email me directly.',
    };
  }
}

// ====================== REVIEWS ======================
export async function submitReview(formData: FormData): Promise<SubmitReviewResult> {
  try {
    const payload = {
      name: formData.get('name'),
      position: formData.get('position'),
      rating: formData.get('rating'),
      review: formData.get('review'),
      email: formData.get('email') || '',
      website: formData.get('website') || '',
    };

    const res = await fetch(`${BACKEND_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Failed to submit review.',
        errors: data.errors,
      };
    }

    return {
      success: data.success,
      message: data.message,
    };
  } catch (error) {
    console.error('Review submission error:', error);
    return {
      success: false,
      message: 'Failed to submit review. Please try again.',
    };
  }
}

// Get approved reviews (used in Testimonials)
export async function getApprovedReviews() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/reviews/approved`, {
      cache: 'no-store', // always fresh for testimonials
    });

    if (!res.ok) throw new Error('Failed to fetch reviews');

    return await res.json();
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    return []; // graceful fallback
  }
}

// ====================== ADMIN ACTIONS ======================
// These are used by the admin page. They require the token.

export async function setReviewStatus(id: string, status: ReviewStatus, token: string) {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/admin/reviews/${id}?token=${token}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      }
    );

    const data = await res.json();
    return { success: res.ok && data.success };
  } catch (error) {
    console.error('setReviewStatus error:', error);
    return { success: false };
  }
}

export async function deleteReview(id: string, token: string) {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/admin/reviews/${id}?token=${token}`,
      {
        method: 'DELETE',
      }
    );
    const data = await res.json();
    return { success: res.ok && data.success };
  } catch (error) {
    console.error('deleteReview error:', error);
    return { success: false };
  }
}
