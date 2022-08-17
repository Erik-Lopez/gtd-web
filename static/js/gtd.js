document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".window__close-button").forEach(button => {
		button.onclick = toggleWindowVisibility;
	});
	document.querySelectorAll(".window__entry-create").forEach(button => {
		button.onclick = showAddEntryBox;
	});
});

function toggleWindowVisibility(e)
{
	let button = e.target;
	let panel = button.parentNode.parentNode.querySelector("div[class='window__panel']");

	if (panel.style.display == "none")
		panel.style.display = "flex";
	else if (panel.style.display == "flex")
		panel.style.display = "none";
	else if (panel.style.display == "")
		panel.style.display = "none";
}

function showAddEntryBox(e) {
	let button = e.target;
	let panel = button.parentNode;

	if (isAlreadyWriting(panel)) {
		return;
	}

	let entry = createEntry(`
		<textarea class='window__input'></textarea>
		<button class='window__accept'></button>
		<button class='window__decline'></button>
	`)

	panel.insertBefore(entry, button);
	panel.scrollTo(0, panel.scrollHeight);

	panel.querySelector(".window__input").focus();
	panel.querySelector(".window__accept").onclick = addEntry;
	panel.querySelector(".window__decline").onclick = declineEntry;
}

function declineEntry(e) { hideAddEntryBox(e); }

function hideAddEntryBox(e) {
	let entryBox = e.target.parentNode;
	entryBox.remove();
}

function addEntry(e) {
	let entryBox = e.target.parentNode;
	console.log(e)
	let panel = entryBox.parentNode;

	let content = entryBox.querySelector('.window__input').value;
	let entry = createEntry(content)

	panel.insertBefore(entry, entryBox.nextSibling);
	entryBox.remove();
}

function createEntry(innerHTML) {
	return createHTML(`
	<div class='window__entry'>
		${innerHTML}
	</div>
	`);
}

function createHTML(htmlStr) {
	let frag = document.createDocumentFragment(),
		temp = document.createElement('div');

	temp.innerHTML = htmlStr;
	while (temp.firstChild) {
		frag.appendChild(temp.firstChild);
    	}
	return frag;
}

function isAlreadyWriting(panel) {
	return panel.outerHTML.includes("window__input");
}
