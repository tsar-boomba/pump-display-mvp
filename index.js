const DEFAULT = {
	flow: 1,
	level: 1,
	pumps: [{ status: 1 }],
};

// Clone default data as to not mutate DEFAULT by accident
let data = JSON.parse(JSON.stringify(DEFAULT));

// Get references to the elements to display data
const height = document.getElementById('height');

// Call this to update the UI
const update = () => {};
