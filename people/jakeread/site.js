document.body.onload = startPage;

var relpath = '/classes/863.17/CBA/people/jakeread/'

var xSidebarRequest = new XMLHttpRequest() 
xSidebarRequest.open('GET', relpath + 'sidebar.html', true) 
xSidebarRequest.onreadystatechange = function(){
	if(this.readyState!==4) return
	if(this.status!==200) return
	document.getElementById('sidebar').innerHTML = this.responseText 
};

/*
var xFooterRequest = new XMLHttpRequest() 
xFooterRequest.open('GET', relpath + 'footer.html', true) 
xFooterRequest.onreadystatechange = function(){
	if(this.readyState!==4) return
	if(this.status!==200) return
	document.getElementById('footer').innerHTML = this.responseText 
};
*/

var xProjectRequest = new XMLHttpRequest()
xProjectRequest.onreadystatechange = function(){
	if(this.readyState!==4) return
	if(this.status!==200) return 
	document.getElementById('project').innerHTML = this.responseText
};

function startPage(){
	var sideDiv = document.createElement('div')
	sideDiv.setAttribute('id', 'sidebar')
	sideDiv.innerHTML = '...'
	document.body.appendChild(sideDiv) 

/*
	var footDiv = document.createElement('div')
	footDiv.setAttribute('id', 'footer')
	footDiv.innerHTML = '...'
	document.body.appendChild(footDiv) 
*/

	var projDiv = document.createElement('div')
	projDiv.setAttribute('id', 'project')
	projDiv.innerHTML = '...'
	document.body.appendChild(projDiv)

	xSidebarRequest.send();
	getProject('00/00.html');
}

function getProject(path){
	xProjectRequest.open('GET', relpath + path, true)
	xProjectRequest.send();
}