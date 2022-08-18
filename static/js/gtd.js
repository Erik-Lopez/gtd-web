document.addEventListener("DOMContentLoaded", () => {
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
				<div class="window__spacing">
					<button class="window__entry-edit"></button>
					<button class="window__entry-delete"></button>
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
	}
}
