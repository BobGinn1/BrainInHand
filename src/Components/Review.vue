<script setup lang="ts">
import type { Review } from '@/models/Review';
import { reactive, computed, ref } from 'vue';
import { defineEmits, defineProps } from 'vue';

// Service wrapper class
class ReviewServiceWrapper {
  constructor() {
    // Add any initialization if needed here
  }

  async submitReview(review: Review): Promise<any> {
    // Import the actual service function inside the class method
    const { submitReview } = await import('@/services/ReviewService');
    return await submitReview(review);
  }
}

const _reviewService = new ReviewServiceWrapper();

const errorVisible = ref(false);
const errorMessage = ref('');
const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(['update:visible', 'submit-review']);

const review = reactive<Review>({
  username: '',
  date: new Date(),
  body: '',
  rating: 3,
});

// Format the date for the input[type="date"] which expects yyyy-mm-dd
const formattedDate = computed({
  get() {
    return review.date.toISOString().substring(0, 10);
  },
  set(value: string) {
    review.date = new Date(value);
  }
});

function close() {
  emit('update:visible', false);
}

async function submitReviewHandler() {
  try {
    console.log('Calling submitReview service...');
    const result = await _reviewService.submitReview({ ...review });
    if (result) {
      emit('submit-review', result);
    } else {
      close();
      return;
    }
  } catch (error: any) {
    alert(error.message || 'Unknown error occurred');
  } finally {
    close();
  }
}
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="modal-close" @click="close">✖</button>
      <form @submit.prevent="submitReviewHandler" class="review-form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            id="username"
            v-model="review.username"
            type="text"
            required
            autocomplete="off"
          />
        </div>

        <div class="form-group">
          <label for="date">Date:</label>
          <input
            id="date"
            v-model="formattedDate"
            type="date"
            required
          />
        </div>

        <div class="form-group">
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="review.rating" required>
            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="body">Review:</label>
          <textarea
            id="body"
            v-model="review.body"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" class="submit-button">Submit Review</button>
      </form>
      <div v-if="errorVisible" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>
