function generatePage() {
	const windowNames = ["Inbox", "Calendario", "Incubadora", "Actionable"];
	const iconNames = ["envelope", "calendar", "apple", "wrench"];
	const length = 4;
	let pageHTMLContent = ``;

	for (let i = 0; i < length; i++) {
		pageHTMLContent += `
		<div class="window">
			<div class="window__titlebar">
				<button class="window__close-button" id="close">${getIcon(iconNames[i])}</button>
				<h1 class="window__title">${windowNames[i]}</h1>
				<!-- Placeholder for flexbox. -->
				<div class="window__placeholder"></div>
			</div>

			<div class="window__panel">
				<button class="window__entry-create">+</button>
			</div>
		</div>`;
	};
	return createHTML(pageHTMLContent);
}

document.addEventListener("DOMContentLoaded", () => {
	let page = generatePage();
	document.body.appendChild(page);
	document.querySelectorAll(".window__close-button").forEach(button => {
		button.onclick = toggleWindowVisibility;
	});
	document.querySelectorAll(".window__entry-create").forEach(button => {
		button.onclick = showEntryAdditionBox;
	});

});

function toggleWindowVisibility(e)
{
	let panel = e.target.parentNode.parentNode.querySelector("div[class='window__panel']");

	switch (panel.style.display) {
		case "none":
			panel.style.display = "flex";
			break;
		case "flex":
			panel.style.display = "none";
			break;
		case "":
			panel.style.display = "none";
			break;
	}
}

function showEntryAdditionBox(e) {
	let button = e.target;
	let panel = button.parentNode;

	// TODO: ¿Quitar esto? No permitirá múltiples ediciones simultáneas.
	if (isAlreadyWriting(panel))
		return;

	let entry = entryCreate("", true);

	panel.insertBefore(entry, button);
	panel.scrollTo(0, panel.scrollHeight);

	panel.querySelector(".window__input").focus();
}

function hideEntryAdditionBox(e) {
	let entryBox = e.target.parentNode;
	entryBox.remove();
}

function entryAdd(e) {
	let entryBox = e.target.parentNode;
	let panel = entryBox.parentNode;
	let content = entryBox.querySelector('.window__input').value;
	let entry = entryCreate(content, false);

	panel.insertBefore(entry, entryBox.nextSibling);
	entryBox.remove();
}

function entryDelete(e) {
	let entryBox = e.target.parentNode.parentNode;
	entryBox.remove();
}

function entryEditForButton(e) {
	let entryBox = e.target.parentNode.parentNode;
	entryEdit(entryBox);
}
function entryEditForTextBox(e) {
	let entryBox = e.target.parentNode;
	entryEdit(entryBox);
}

function entryEdit(entryBox) {
	let panel = entryBox.parentNode;
	let entryAdditionButton = panel.querySelector(".window__entry-create");
	let content = entryBox.querySelector(".window__entry-content").innerHTML;

	let editableEntryBox = entryCreate(content, true);
	panel.insertBefore(editableEntryBox, entryAdditionButton);
	entryBox.remove();
}

function createHTML(htmlStr) {
	let frag = document.createDocumentFragment();
	let temp = document.createElement('div');
	temp.innerHTML = htmlStr;

	while (temp.firstChild)
		frag.appendChild(temp.firstChild);

	return frag;
}

function isAlreadyWriting(panel) {
	return panel.outerHTML.includes("window__input");
}

function entryCreate(innerHTML, editable=false) {
	let content = `<div class="window__entry">`
	if (editable) {
		content += `
				<textarea class='window__input'>${innerHTML}</textarea>
				<button class='window__accept'>${getIcon("checkmark")}</button>
				<button class='window__decline'>${getIcon("cross")}</button>`;
	} else {
		content += `
				<p class="window__entry-content">${innerHTML}</p>
				<div class="window__entry-buttons">
					<button class="window__entry-edit">${getIcon("pencil")}</button>
					<button class="window__entry-delete">${getIcon("trashbin")}</button>
				</div>`;
	}

	content += `</div>`

	let entry = createHTML(content);

	if (editable) {
		entry.querySelector(".window__accept").onclick = entryAdd;
		entry.querySelector(".window__decline").onclick = hideEntryAdditionBox;
	} else {
		entry.querySelector(".window__entry-content").onclick = entryEditForTextBox;
		entry.querySelector(".window__entry-edit").onclick = entryEditForButton;
		entry.querySelector(".window__entry-delete").onclick = entryDelete;
	}
	
	return entry;
}

function getIcon(name, width, height) {
	switch (name) {
		case "checkmark":
			return `<svg class="window__accept-icon" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z" fill="#fff"/></svg>`
		case "cross":
			return `<svg class="window__decline-icon" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" fill="#fff"/></svg>`;
		case "pencil":
			return `<svg class="window__entry-edit-icon" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z" fill="#fff"/></svg>`;
		case "trashbin":
			return `<svg class="window__entry-delete-icon" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M704 736v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm128 724v-948h-896v948q0 22 7 40.5t14.5 27 10.5 8.5h832q3 0 10.5-8.5t14.5-27 7-40.5zm-672-1076h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z" fill="#fff"/></svg>`;
		case "envelope":
			return `<svg class="window__close-button-icon" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 1504v-768q-32 36-69 66-268 206-426 338-51 43-83 67t-86.5 48.5-102.5 24.5h-2q-48 0-102.5-24.5t-86.5-48.5-83-67q-158-132-426-338-37-30-69-66v768q0 13 9.5 22.5t22.5 9.5h1472q13 0 22.5-9.5t9.5-22.5zm0-1051v-24.5l-.5-13-3-12.5-5.5-9-9-7.5-14-2.5h-1472q-13 0-22.5 9.5t-9.5 22.5q0 168 147 284 193 152 401 317 6 5 35 29.5t46 37.5 44.5 31.5 50.5 27.5 43 9h2q20 0 43-9t50.5-27.5 44.5-31.5 46-37.5 35-29.5q208-165 401-317 54-43 100.5-115.5t46.5-131.5zm128-37v1088q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1472q66 0 113 47t47 113z" fill="#fff"/></svg>`;
		case "calendar":
			return `<svg class="window__close-button-icon" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M192 1664h288v-288h-288v288zm352 0h320v-288h-320v288zm-352-352h288v-320h-288v320zm352 0h320v-320h-320v320zm-352-384h288v-288h-288v288zm736 736h320v-288h-320v288zm-384-736h320v-288h-320v288zm768 736h288v-288h-288v288zm-384-352h320v-320h-320v320zm-352-864v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm736 864h288v-320h-288v320zm-384-384h320v-288h-320v288zm384 0h288v-288h-288v288zm32-480v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm384-64v1280q0 52-38 90t-90 38h-1408q-52 0-90-38t-38-90v-1280q0-52 38-90t90-38h128v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z" fill="#fff"/></svg>`;
		case "apple":
			return `<svg class="window__close-button-icon" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1585 1215q-39 125-123 250-129 196-257 196-49 0-140-32-86-32-151-32-61 0-142 33-81 34-132 34-152 0-301-259-147-261-147-503 0-228 113-374 113-144 284-144 72 0 177 30 104 30 138 30 45 0 143-34 102-34 173-34 119 0 213 65 52 36 104 100-79 67-114 118-65 94-65 207 0 124 69 223t158 126zm-376-1173q0 61-29 136-30 75-93 138-54 54-108 72-37 11-104 17 3-149 78-257 74-107 250-148 1 3 2.5 11t2.5 11q0 4 .5 10t.5 10z" fill="#fff"/></svg>`;
		case "wrench":
			return `<svg class="window__close-button-icon" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M448 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm644-420l-682 682q-37 37-90 37-52 0-91-37l-106-108q-38-36-38-90 0-53 38-91l681-681q39 98 114.5 173.5t173.5 114.5zm634-435q0 39-23 106-47 134-164.5 217.5t-258.5 83.5q-185 0-316.5-131.5t-131.5-316.5 131.5-316.5 316.5-131.5q58 0 121.5 16.5t107.5 46.5q16 11 16 28t-16 28l-293 169v224l193 107q5-3 79-48.5t135.5-81 70.5-35.5q15 0 23.5 10t8.5 25z" fill="#fff"/></svg>`;
	}
}
