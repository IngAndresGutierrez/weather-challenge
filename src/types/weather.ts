export interface IWeatherData {
    name: string;
    sys: {
      country: string;
    };
    weather: Array<{
      icon: string;
      description: string;
    }>;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    visibility: number;
  }

export interface IError {
    error : {
      response :{
        data : {
          message : string
        }
      }
  }
}
