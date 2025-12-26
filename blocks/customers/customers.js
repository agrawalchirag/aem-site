export default async function decorate(block) {
  const baseUrl = block.dataset.url || '/test.json';
  const pageSize = 20;
  let currentPage = 0;
  let total = 0;

  function render(data, page) {
    currentPage = page;
    const totalPages = Math.ceil(total / pageSize);

    const ul = document.createElement('ul');
    ul.className = 'customers';

    data.forEach(customer => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${customer['First Name']} ${customer['Last Name']}</h3>
        <p><strong>Company:</strong> ${customer.Company}</p>
        <p><strong>Email:</strong> ${customer.Email}</p>
        <p><strong>Phone:</strong> ${customer['Phone 1']}</p>
        <p><strong>City:</strong> ${customer.City}, ${customer.Country}</p>
      `;
      ul.appendChild(li);
    });

    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    pagination.innerHTML = `
      <button id="prev" ${currentPage === 0 ? 'disabled' : ''}>Previous</button>
      <span>Page ${currentPage + 1} of ${totalPages}</span>
      <button id="next" ${currentPage === totalPages - 1 ? 'disabled' : ''}>Next</button>
    `;

    pagination.querySelector('#prev').addEventListener('click', () => {
      if (currentPage > 0) {
        loadData(currentPage - 1);
      }
    });

    pagination.querySelector('#next').addEventListener('click', () => {
      if (currentPage < totalPages - 1) {
        loadData(currentPage + 1);
      }
    });

    block.innerHTML = '';
    block.appendChild(ul);
    block.appendChild(pagination);
  }

  async function loadData(page = 0) {
    const url = `${baseUrl}?limit=${pageSize}&offset=${page * pageSize}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data');
      const json = await response.json();
      total = json.total;
      render(json.data, page);
    } catch (error) {
      block.innerHTML = '<p>Error loading customer data. Please try again later.</p>';
    }
  }

  loadData();
}
