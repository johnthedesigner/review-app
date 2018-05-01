// Action types
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOG_OUT = "LOG_OUT";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const RECEIVE_MY_REVIEWS = "RECEIVE_MY_REVIEWS";
export const RECEIVE_THING = "RECEIVE_THING";
export const RECEIVE_THINGS = "RECEIVE_THINGS";
export const RECEIVE_FEED = "RECEIVE_FEED";
export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const RECEIVE_USER = "RECEIVE_USER";
export const TEST_ACTION = "TEST_ACTION";

// Thing categories
export const thingCategories = {
  events: {
    name: "Events",
    subcategories: {
      concerts_performances: { name: "Concerts & Performances" },
      plays_musicals: { name: "Plays & Musicals" }
    }
  },
  internet_communication: {
    name: "Internet & Communication",
    subcategories: {
      apps: { name: "Apps & Software" },
      websites: { name: "Websites & Blogs" }
    }
  },
  media: {
    name: "Media",
    subcategories: {
      books: { name: "Books" },
      movies: { name: "Movies" },
      music: { name: "Music" },
      television: { name: "Television" },
      videogames: { name: "Videogames" }
    }
  },
  organizations: {
    name: "Organizations",
    subcategories: {
      company: { name: "Companies" },
      education: { name: "Schools & Education" },
      government: { name: "Governments & Agencies" },
      nonprofit: { name: "Non-Profit Organizations" },
      sports: { name: "Sports Teams & Leagues" }
    }
  },
  people: {
    name: "People",
    banned: true
  },
  places_to_go: {
    name: "Places to Go",
    subcategories: {
      bars_restaurants: { name: "Bars & Restaurants" },
      parks_reserves: { name: "Parks & Reserves" },
      stadiums_arenas: { name: "Stadiums & Arenas" },
      theaters: { name: "Theaters" }
    }
  },
  products: {
    name: "Products",
    subcategories: {
      automotive_industrial: { name: "Automotive & Industrial" },
      clothes_shoes: { name: "Clothes & Shoes" },
      electronics_tech: { name: "Electronics & Tech" },
      home_garden: { name: "Home & Garden" },
      sports_outdoors: { name: "Sports & Outdoors" },
      toys_games: { name: "Toys & Games" }
    }
  },
  science_nature: {
    name: "Science & Nature",
    subcategories: {
      biology: { name: "Biology" },
      chemistry: { name: "Chemistry" },
      math: { name: "Math" },
      physics: { name: "Physics" },
      space_astronomy: { name: "Space & Astronomy" }
    }
  }
};
