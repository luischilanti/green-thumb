/*     SHOW RESULTS FOR PICKS / PICKS FOR YOU     */
const waterId = document.getElementById("water");
const chewId = document.getElementById("chew");
const sunlightId = document.getElementById("sunlight");
const noResultsYet = document.getElementById("no-results-yet");
const picksForYou = document.getElementById("picks-for-you");

waterId.addEventListener("change", picks, false);
chewId.addEventListener("change", picks, false);
sunlightId.addEventListener("change", picks, false);

let sunlightGlobal, waterGlobal, chewGlobal;
let j = 0;

function picks() {
	const sunlightSelect = sunlightId.value;
	const waterSelect = waterId.value;
	const chewSelect = chewId.value;

	sunlightGlobal = sunlightSelect;
	waterGlobal = waterSelect;
	chewGlobal = chewSelect;

	if (sunlightSelect !== "0" && waterSelect !== "0" && chewSelect !== "0") {
		if (j !== 0) {
			let clonedBoxes = document.querySelectorAll(".box-clone");
			for (let i = 0; i < clonedBoxes.length; i++) {
				clonedBoxes[i].parentNode.removeChild(clonedBoxes[i]);
			}
		}
		j++;

		noResultsYet.style.opacity = "0";
		setTimeout(function () {
			picksForYou.style.opacity = "1";
			noResultsYet.style.display = "none";
			picksForYou.scrollIntoView();
		}, 800);

		picksForYou.style.display = "block";
		error.style.display = "none";

		callAPI();
	}
}

/*     API     */
const error = document.getElementById("error");

function callAPI() {
	fetch("https://front-br-challenges.web.app/api/v2/green-thumb/?sun="+sunlightGlobal+"&water="+waterGlobal+"&pets="+chewGlobal)
		.then((response) => response.json())
		.then((data) => {
			data.forEach((plant) => {
				const boxes = document.getElementById("boxes");

				if (plant.staff_favorite === false) {
					/*     PICKS FOR YOU     */

					const pet = document.getElementById("pet");
					const sun = document.getElementById("sun");
					const drop = document.getElementById("drop");
					const box = document.querySelector("#box");
					const boxClone = box.cloneNode(true);

					boxes.appendChild(boxClone);
					box.style.display = "flex";
					box.classList.add("box-clone");

					document.getElementById("name-plant").innerHTML = plant.name;
					document.getElementById("price-plant").innerHTML = "$" + plant.price;
					document.getElementById("image-plant").src = plant.url;

					if (plant.toxicity === false) {
						pet.src = "images/icons/png/pet.png";
						pet.title = "non toxic";
					} else {
						pet.src = "images/icons/png/toxic.png";
						pet.title = "toxic";
					}

					if (plant.sun === "high") {
						sun.src = "images/icons/png/high-sun.png";
						sun.title = "high sun";
					} else if (plant.sun === "low") {
						sun.src = "images/icons/png/low-sun.png";
						sun.title = "low sun";
					} else {
						sun.src = "images/icons/png/no-sun.png";
						sun.title = "no sun";
					}

					if (plant.water === "regularly") {
						drop.src = "images/icons/png/3-drops.png";
						drop.title = "regularly";
					} else if (plant.water === "daily") {
						drop.src = "images/icons/png/2-drops.png";
						drop.title = "daily";
					} else {
						drop.src = "images/icons/png/1-drop.png";
						drop.title = "rarely";
					}
				} else {
					/*     STAFF FAVORITE     */

					const petStaff = document.getElementById("pet-staff");
					const sunStaff = document.getElementById("sun-staff");
					const dropStaff = document.getElementById("drop-staff");
					const boxStaff = document.querySelector("#box-staff");
					const boxCloneStaff = boxStaff.cloneNode(true);

					boxes.appendChild(boxCloneStaff);
					boxStaff.style.display = "flex";
					boxStaff.classList.add("box");
					boxStaff.classList.add("box-clone");

					document.getElementById("name-plant-staff").innerHTML = plant.name;
					document.getElementById("price-plant-staff").innerHTML = "$" + plant.price;
					document.getElementById("image-plant-staff").src = plant.url;

					if (plant.toxicity === false) {
						petStaff.src = "images/icons/png/pet.png";
						petStaff.title = "non toxic";
					} else {
						petStaff.src = "images/icons/png/toxic.png";
						petStaff.title = "toxic";
					}

					if (plant.sun === "high") {
						sunStaff.src = "images/icons/png/high-sun.png";
						sunStaff.title = "high sun";
					} else if (plant.sun === "low") {
						sunStaff.src = "images/icons/png/low-sun.png";
						sunStaff.title = "low sun";
					} else {
						sunStaff.src = "images/icons/png/no-sun.png";
						sunStaff.title = "no sun";
					}

					if (plant.water === "regularly") {
						dropStaff.src = "images/icons/png/3-drops.png";
						dropStaff.title = "regularly";
					} else if (plant.water === "daily") {
						dropStaff.src = "images/icons/png/2-drops.png";
						dropStaff.title = "daily";
					} else {
						dropStaff.src = "images/icons/png/1-drop.png";
						dropStaff.title = "rarely";
					}
				}
			});
		})
		.catch((err) => {
			picksForYou.style.display = "none";
			noResultsYet.style.display = "none";
			error.style.display = "block";
		});
}

/*     BTN TOP     */
document.getElementById("btn-top").addEventListener("click", toTheTop, false);
function toTheTop() {
	window.scrollTo(0, 0);
}

/*     CAROUSEL     */
document.getElementById("btn-next").addEventListener("click", nextBox, false);
document.getElementById("btn-prev").addEventListener("click", prevBox, false);
const boxes = document.getElementById("boxes");

function nextBox() {
	boxes.scrollBy({top: 0, left: 300, behavior : "smooth" });
}

function prevBox() {
	boxes.scrollBy({top: 0, left: -300, behavior : "smooth"});
}