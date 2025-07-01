<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Character } from '@/models/Character';
import { useRouter } from "vue-router";
import { extractId, goBack  } from "@/commonCode/helpers";

class CharacterServiceWrapper {

  async getCharacters(): Promise<Character[]> {
    const { getCharacters } = await import('@/services/CharacterService');
    return await getCharacters();
  }
}

const _characterService = new CharacterServiceWrapper();

const characters = ref<Character[]>([]);
const router = useRouter();

async function fetchCharacters() {
  const data = await _characterService.getCharacters();

  characters.value = data.map((char) => ({
    ...char,
    liked: char.liked ?? false,
  }));
}

function toggleLike(character: Character) {
  character.liked = !character.liked;
}

function goToDetails(character: Character) {
  router.push(`/characters/${extractId(character.fields.url)}`);
}

const sortedCharacters = computed(() =>
  [...characters.value].sort((a, b) => {
    if (a.liked === b.liked) return 0;
    return a.liked ? -1 : 1;
  })
);

onMounted(() => {
  fetchCharacters();
});
</script>

<template>
  <div class="characters-container">
    <button class="character-card" @click="goBack">Back</button>

    <h2>Star Wars Characters</h2>

    <div
      v-for="character in sortedCharacters"
      :key="character.fields.url"
      class="character-card"
      @click="goToDetails(character)"
    >
      <p>{{ character.fields.name }}</p>
      <button @click.stop="toggleLike(character)" class="like-button">
        <span :class="{ liked: character.liked }">
          {{ character.liked ? '❤️' : '🤍' }}
        </span>
      </button>
    </div>
  </div>
</template>
