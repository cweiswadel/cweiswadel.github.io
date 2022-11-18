function getRndInteger(min, max) {
  output = Math.floor(Math.random() * (max - min)) + min;
  return output;
  //returns a random number between min (included) and max (excluded)
}

const days = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};

let daysEnt = Object.entries(days); //using Object.entries method to return list of key value pairs

let randInt = getRndInteger(0,7);
let today = daysEnt[randInt][0];

console.log(`Today is: ${today}`);
