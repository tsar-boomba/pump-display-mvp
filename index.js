const DEFAULT = {
	flow: 1,
	level: 5,
	pumps: [{ status: 1 }],
};

/**
 * Clone default data as to not mutate DEFAULT by accident
 * @type {typeof DEFAULT}
 */
let data = JSON.parse(JSON.stringify(DEFAULT));

// Get references to the elements to display data
const height = document.getElementById('height');
const flow = document.getElementById('flow');
const pipes = document.getElementById('pipes');
const pumps = document.getElementById('pumps');
const water = document.getElementById('water');
const error = document.getElementById('error');
/**
 * @type {HTMLTextAreaElement}
 */
const input = document.getElementById('json');

input.value = JSON.stringify(data);

/**
 * @param {1 | 2 | 3} status
 * @returns {'green' | 'yellow' | 'red'}
 */
const status = (status) => {
	if (status === 1) return 'green';
	else if (status === 2) return 'yellow';
	else return 'red';
};

/**
 * Creates the html element for a pump
 * @param {typeof DEFAULT['pumps'][number]} pumpInfo
 * @param {number} i
 * @returns {Element}
 */
const pump = (pumpInfo, i) => {
	const pumpStatus = status(pumpInfo.status);
	const node = document.createElement('div');
	node.className = 'pump-container';

	const pipe = document.createElement('div');
	pipe.className = 'pump-pipe';

	const pipeHorizontal = document.createElement('div');
	pipeHorizontal.className = 'pipe-horizontal';

	const pump = document.createElement('div');
	pump.className = 'pump';
	pump.style.borderColor = pumpStatus;

	const name = document.createElement('h2');
	name.innerText = `Pump ${i + 1}: ${pumpStatus}`;
	name.style.width = 'fit-content';
	name.style.backgroundColor = pumpStatus;

	node.appendChild(pipeHorizontal);
	node.appendChild(pipe);
	node.appendChild(pump);
	node.appendChild(name);
	return node;
};

// Max height the water can reach in the cistern
const MAX_HEIGHT = 20;

// Call this to update the UI
const update = () => {
	input.value = JSON.stringify(data);
	height.innerText = `${data.level.toFixed(1)}ft`;
	flow.innerText = `${data.flow.toFixed(1)}gpm`;
	const pumpElements = data.pumps.map(pump);
	pumps.replaceChildren(...pumpElements.reverse());

	const heightPercent = data.level / MAX_HEIGHT;
	const waterParentHeight = water.parentElement.offsetHeight;

	// If this is 0, it means the css hasn't loaded and we can't calculate the water element height
	if (!waterParentHeight) return;

	const waterTop = (1 - heightPercent) * waterParentHeight;
	water.style.top = `${waterTop}px`;
};

const updateJson = () => {
	try {
		const newData = JSON.parse(input.value);

		if (newData.level > 20) throw 'Level must be less than or equal to 20.';

		data = newData;
		error.innerText = '';
		update();
	} catch (e) {
		error.innerText = e.toString();
	}
};

const addPump = () => {
	if (data.pumps.length > 2) return;
	data.pumps.push({ status: 1 });
	update();
}

const removePump = () => {
	if (data.pumps.length < 2) return;
	data.pumps.splice(data.pumps.length - 1, 1);
	update();
}

// Initial update to get correct values on screen
update();

// Delay a second update so that water can correctly calculate its height
setTimeout(update, 10);
