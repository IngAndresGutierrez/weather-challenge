<template>
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
</template>

<script lang="ts" setup>
  import { weatherIconMap } from '../utils/icons'

  const props = defineProps(['weatherData'])

  const mappedIcon = computed(() => {
    if (props.weatherData?.value && props.weatherData?.value?.weather?.length > 0) {
      return weatherIconMap[props.weatherData?.value?.weather[0]?.icon] || 'mdi-alert'
    }
    return 'mdi-alert'
  })

</script>
