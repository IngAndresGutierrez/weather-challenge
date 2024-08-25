<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols="12" md="6" offset-md="3">
        <h1>Weather History</h1>
        <div class="load-weather-container">
          <v-select
            v-model="selectedCity"
            class="load-weather"
            :items="citiesSearched"
            label="Load city weather"
          />
        </div>
        <v-btn color="primary" :disabled="!selectedCity" @click="getWeatherFunction">Get Weather</v-btn>
      </v-col>
    </v-row>

    <WeatherCard :weatherData="weatherData" />
  </v-container>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'

  import { IWeatherData } from '../types/weather'
  import { getWeatherService } from '../services/weather'

  const citiesSearched = ref([])
  const selectedCity = ref(citiesSearched.value[0] || '')
  const weatherData = ref<IWeatherData | null>(null)

  onMounted(() => {
    loadHistory()
  })

  const loadHistory = () => {
    citiesSearched.value = JSON.parse(localStorage.getItem('searchedCitiesStorage') || '') || []
  }

  const getWeatherFunction = async () => {
    try {
      const response = await getWeatherService(selectedCity.value)

      weatherData.value = response?.data
    } catch (error:any) {
      console.error(error)
      alert(error?.response?.data?.message)
    }
  }

</script>

<style scoped>
.load-weather-container {
    display: flex;
    justify-content: center;
}

.load-weather {
    max-width: 600px;
}
</style>
