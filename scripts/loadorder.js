var superBlinders = [ ["Firestorm", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000] ];
var lighthouseRock = {
  gateClosed: true,
  weaponBulbs: superBlinders,
  capacity: 30,
  secretPassageTo: "Underwater Outpost",
  numRangers: 0
};

function addRanger(location, ranger) {
  location.numRangers++;
  location["ranger"+location.numRangers] = ranger;
}

addRanger(lighthouseRock, {name: "Nick Walsh", skillz: "magnification burn", station: 2});
addRanger(lighthouseRock, {name: "Drew Barontini", skillz: "uppercut launch", station: 3});
addRanger(lighthouseRock, {name: "Christine Wong", skillz: "bomb defusing", station: 1});