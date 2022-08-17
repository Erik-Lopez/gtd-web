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

function entryEdit(e) {
	let entryBox = e.target.parentNode.parentNode;
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
				<button class='window__accept'></button>
				<button class='window__decline'></button>`;
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
		entry.querySelector(".window__entry-edit").onclick = entryEdit;
		entry.querySelector(".window__entry-delete").onclick = entryDelete;
	}
	
	return entry;
}
