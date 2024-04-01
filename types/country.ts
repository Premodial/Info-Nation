interface CountrySummary {
    name: string;
    code: string;
    flag: string;
  }
  
  interface Currency {
    code: string;
    name: string;
    symbol: string;
    lat: string;
    long: string;
  }
  
  interface CapitalInfo {
    latlng: [number, number];
  }
  
  interface CountryDetail extends CountrySummary {
    officialName: string;
    capital: string;
    capitalInfo: CapitalInfo;
    currencies: Currency[];
    startOfWeek: string;
    flags: {
      svg: string;
      png: string;
    };
    continents: string[];
    car: {
      signs: string[];
      side: string;
    };
    maps: {
      googleMaps: string;
      openStreetMaps: string;
    };
  }
  