
interface Note {
  title: string;
  description: string;
  content: string;
}

const addform = document.querySelector('.add-note-form') as HTMLFormElement;
const tableBody = document.querySelector('.main-output tbody') as HTMLTableSectionElement;
// listener
addform.addEventListener('submit', async (event) => {
  event.preventDefault();

  const ntitle = document.getElementById('ntitle') as HTMLInputElement;
  const ndescr = document.getElementById('ndescr') as HTMLInputElement;
  const ncontent = document.getElementById('ncontent') as HTMLTextAreaElement;

  const noteTitle = ntitle.value;
  const noteDescription = ndescr.value;
  const noteContent = ncontent.value;

  if (noteTitle.trim() !== '' && noteDescription.trim() !== '' && noteContent.trim() !== '') {
    try {
      const response = await fetch('http://localhost:4000/note/create', {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          "title": noteTitle,
          "description": noteDescription,
          "content": noteContent
        })
      });

      const data = await response.json();

      if (data.error) {
        alert("Error occurred");
      } else {
        location.href = "index.html"
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
});

const getAllNotes = async () => {
  try {
    const response = await fetch('http://localhost:4000/note/getAllnote', {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      method: 'GET',
    });

    const data = await response.json();

    const no_data_tr = `<tr class="no-data-row">
      <td colspan="3">No Notes</td>
    </tr>
    `;

    if (data.notes === "No Notes") {
      tableBody.innerHTML = "";
      tableBody.innerHTML = no_data_tr;
    } else {
      let tableHTML = '';
      data.forEach((element: any, index: number) => {
        tableHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${element.title}</td>
            <td>${element.description}</td>
            <td>${element.content}</td>
            <td>${element.created_at}</td>
            <td>
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
            </td>
          </tr>
        `;
      });

      tableBody.innerHTML = tableHTML;
    }
  } catch (error) {
    console.error(error);

  }
};

getAllNotes();
