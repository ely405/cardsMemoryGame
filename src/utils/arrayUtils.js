const randomArray = (array) => {
	let counter = array.length;
	while (counter > 0) {
		const index = Math.floor(Math.random() * counter);
		counter -= 1;
		const temp = array[counter];
		array.splice(counter, 1, array[index]);
		array.splice(index, 1, temp);
	}
	return array;
};

const filterArrayNonRepeatElements = (array, elementsToFilter) => {
	const filteredArray = [];
	const selectedNumbers = [];

	while (filteredArray.length < elementsToFilter) {
		const random = Math.floor(Math.random() * array.length);
		const exist = selectedNumbers.some(num => num === random);
		selectedNumbers.push(random);
		if (!exist) {
			filteredArray.push(array[random]);
		}
	}
	return filteredArray;
};

export { randomArray, filterArrayNonRepeatElements };