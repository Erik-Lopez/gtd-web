function hideWindow(e)
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

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".window__close-button").forEach(button => {
		button.onclick = hideWindow;
	});
});
