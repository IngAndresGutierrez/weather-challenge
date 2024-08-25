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

    <v-row v-if="weatherData">
      <v-col cols="12" md="6" offset-md="3">
        <v-card class="mx-auto" max-width="600" outlined>
          <v-card-title class="d-flex justify-start align-center">
            <v-icon color="deep-purple lighten-2" large>mdi-city</v-icon>
            <span class="headline ml-3">{{ weatherData.name }}, {{ weatherData.sys.country }}</span>
          </v-card-title>

          <v-card-title class="text-center">
            <v-row>
              <v-col class="d-flex justify-center align-center" cols="12" sm="12">
                <v-icon class="text-h2" color="amber darken-3" x-large>{{ mappedIcon }}</v-icon>
                <strong class="text-h2">{{ weatherData.main.temp }}°C</strong>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text class="text-center mb-4">
            <v-row>
              <v-col cols="12" sm="12">
                <v-icon color="red darken-1">mdi-thermometer-chevron-up</v-icon>
                <strong>{{ weatherData.main.temp_max }}°C</strong>
                <v-icon class="ml-2" color="blue lighten-1">mdi-thermometer-chevron-down</v-icon>
                <strong>{{ weatherData.main.temp_min }}°C</strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12">
                <v-icon color="light-blue darken-3" left>mdi-weather-windy</v-icon> Wind Speed:
                <strong>{{ weatherData.wind.speed }} m/s</strong>
              </v-col>
              <v-col cols="12" sm="12">
                <v-icon color="indigo lighten-1" left>mdi-gauge</v-icon> Pressure:
                <strong>{{ weatherData.main.pressure }} hPa</strong>
              </v-col>
              <v-col cols="12" sm="12">
                <v-icon color="cyan darken-2" left>mdi-water</v-icon> Humidity:
                <strong>{{ weatherData.main.humidity }}%</strong>
              </v-col>
              <v-col cols="12" sm="12">
                <v-icon color="green darken-2" left>mdi-eye</v-icon> Visibility:
                <strong>{{ weatherData.visibility }} meters</strong>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'

  import { weatherIconMap } from '../utils/icons'
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

  const mappedIcon = computed(() => {
    if (weatherData?.value && weatherData?.value?.weather?.length > 0) {
      return weatherIconMap[weatherData?.value?.weather[0]?.icon] || 'mdi-alert'
    }
    return 'mdi-alert'
  })

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
