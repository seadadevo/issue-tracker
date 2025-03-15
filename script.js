const issueForm = document.getElementById('issue-form');
const issueTitle = document.getElementById('issue-title');
const issueDescription = document.getElementById('issue-description');
const issueSolution = document.getElementById('issue-solution');
const issueList = document.getElementById('issue-list');
const clearAllBtn = document.getElementById('clear-all');

// Function to load issues from localStorage
function loadIssues() {
    let issues = JSON.parse(localStorage.getItem('issues')) || [];
    issueList.innerHTML = '';
    issues.forEach(issue => {
        createIssueElement(issue);
    });
}


// Function to save issues to localStorage
function saveIssues(issues) {
    localStorage.setItem('issues', JSON.stringify(issues));
}

// Function to create an issue element in the list
function createIssueElement(issue) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div>
            <h3>${issue.title}</h3>
            <p>${issue.description}</p>
            <p><strong>Suggested Solution:</strong> ${issue.solution}</p>
            <p class="issue-date"><em>Created on: ${issue.date}</em></p>
        </div>
        <div>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;

    // Add delete functionality
    const deleteButton = li.querySelector('.delete');
    deleteButton.addEventListener('click', function() {
        deleteIssue(issue.id);
    });

    // Add edit functionality
    const editButton = li.querySelector('.edit');
    editButton.addEventListener('click', function() {
        editIssue(issue.id);
    });

    issueList.appendChild(li);
}

// Function to add a new issue
issueForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const issue = {
        id: Date.now(),
        title: issueTitle.value,
        description: issueDescription.value,
        solution: issueSolution.value,
        date: new Date().toLocaleString()
    };

    let issues = JSON.parse(localStorage.getItem('issues')) || [];
    issues.push(issue);

    saveIssues(issues);
    loadIssues();

    issueTitle.value = '';
    issueDescription.value = '';
    issueSolution.value = '';
});

// Function to delete an issue
function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues')) || [];
    issues = issues.filter(issue => issue.id !== id);
    saveIssues(issues);
    loadIssues();
}

// Function to edit an issue
function editIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues')) || [];
    const issue = issues.find(issue => issue.id === id);
    issueTitle.value = issue.title;
    issueDescription.value = issue.description;
    issueSolution.value = issue.solution;

    // Remove the issue from the list so the user can update it
    issues = issues.filter(issue => issue.id !== id);
    saveIssues(issues);
    loadIssues();
}

// Clear all issues
clearAllBtn.addEventListener('click', function() {
    localStorage.removeItem('issues');
    loadIssues();
});

// Load the issues on page load
loadIssues();
