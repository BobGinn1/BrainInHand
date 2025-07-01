<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { extractId, goBack } from '@/commonCode/helpers';
import Review from '@/components/Review.vue';

const route = useRoute();
const character = ref<any>(null);

const homeworldName = ref<string>('');
const vehicleNames = ref<string[]>([]);
const starshipNames = ref<string[]>([]);

const showReviewModal = ref(false);

class PlanetServiceWrapper {
  async getPlanet(id: string) {
    const { getPlanet } = await import('@/services/PlanetService');
    return await getPlanet(id);
  }
}
class CharacterServiceWrapper {
  async getCharacter(id: string) {
    const { getCharacter } = await import('@/services/CharacterService');
    return await getCharacter(id);
  }
}
class VehicleServiceWrapper {
  async getVehicle(id: string) {
    const { getVehicle } = await import('@/services/VehicleService');
    return await getVehicle(id);
  }
}

class StarshipServiceWrapper {
  async getStarship(id: string) {
    const { getStarship } = await import('@/services/StarshipService');
    return await getStarship(id);
  }
}

const _characterService = new CharacterServiceWrapper();
const _planetService = new PlanetServiceWrapper();
const _vehicleService = new VehicleServiceWrapper();
const _starshipService = new StarshipServiceWrapper();

async function getData(id: string) {
  character.value= await _characterService.getCharacter(id);

  if (character.value.fields.homeworld) {
    const planetId = extractId(character.value.fields.homeworld);
    const planet = await _planetService.getPlanet(planetId);
    homeworldName.value = planet.fields.name;
  }

  const vehiclesUrls = character.value.fields.vehicles ?? [];
  vehicleNames.value = vehiclesUrls.length > 0
    ? await Promise.all(
        vehiclesUrls.map(async (url: string) => {
          const vehicleId = extractId(url);
          const vehicle = await _vehicleService.getVehicle(vehicleId);
          return vehicle.fields.name;
        })
      )
    : ['N/A'];

  const starshipsUrls = character.value.fields.starships ?? [];
  starshipNames.value = starshipsUrls.length > 0
    ? await Promise.all(
        starshipsUrls.map(async (url: string) => {
          const starshipId = extractId(url);
          const starship = await _starshipService.getStarship(starshipId);
          return starship.fields.starship_class;
        })
      )
    : ['N/A'];
}

function onReviewClick() {
  showReviewModal.value = true;
}

function closeReviewModal() {
  showReviewModal.value = false;
}

onMounted(() => {
  const id = route.params.id as string;
  getData(id);
});
</script>

<template>
  <div class="center-container">
    <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
      <button class="character-card" @click="goBack">Back</button>
      <button class="character-card" @click="onReviewClick">Review</button>
    </div>

    <div v-if="character" class="character-details">
      <h2>{{ character.name }}</h2>
      <p><strong>Gender:</strong> {{ character.fields.gender }}</p>
      <p><strong>Birth Year:</strong> {{ character.fields.birth_year }}</p>
      <p><strong>Height:</strong> {{ character.fields.height }} cm</p>
      <p><strong>Mass:</strong> {{ character.fields.mass }} kg</p>
      <p><strong>Hair Color:</strong> {{ character.fields.hair_color }}</p>
      <p><strong>Eye Color:</strong> {{ character.fields.eye_color }}</p>
      <p><strong>Skin Color:</strong> {{ character.fields.skin_color }}</p>
      <p><strong>Homeworld:</strong> {{ homeworldName || character.fields.homeworld }}</p>
      <p><strong>Vehicles:</strong> {{ vehicleNames.length ? vehicleNames.join(', ') : character.fields.vehicles.join(', ') }}</p>
      <p><strong>Starships:</strong> {{ starshipNames.length ? starshipNames.join(', ') : character.fields.starships.join(', ') }}</p>
    </div>

    <Review v-model:visible="showReviewModal">
    </Review>
  </div>
</template>
