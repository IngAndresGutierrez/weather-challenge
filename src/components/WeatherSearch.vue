<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols="12" md="6" offset-md="3">
        <h1>Weather Information</h1>
        <div class="search-weather-container">
          <v-text-field
            v-model="city"
            class="search-weather"
            dense
            label="Enter a city"
            outlined
            prepend-inner-icon="mdi-city"
            @keyup.enter="getWeatherFunction"
          />
        </div>
        <v-btn color="primary" @click="getWeatherFunction">Get Weather</v-btn>
      </v-col>
    </v-row>

    <WeatherCard :weatherData="weatherData" />
  </v-container>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'

  import { IWeatherData } from '../types/weather'
  import { getWeatherService } from '../services/weather'

  const city = ref('Madrid')
  const searchedCities = ref<string[]>([])
  const weatherData = ref<IWeatherData | null>()

  onMounted(() => {
    getWeatherFunction()
  })

  const getWeatherFunction = async () => {
    try {
      const response = await getWeatherService(city.value)

      weatherData.value = response?.data

      saveHistory()
    } catch (error:any) {
      console.error(error)
      alert(error?.response?.data?.message)
    }
  }

  const saveHistory = () => {
    if (!searchedCities.value.includes(city.value)) {
      searchedCities.value.push(city.value)
      localStorage.setItem('searchedCitiesStorage', JSON.stringify(searchedCities.value))
      city.value = ''
    }
  }

</script>

<style scoped>
.search-weather-container {
    display: flex;
    justify-content: center;
}
.search-weather {
    max-width: 600px;
}
</style>
